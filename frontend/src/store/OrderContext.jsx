import React, { createContext, useContext, useEffect, useState } from 'react'
import { getOrders, placeOrder, cancelOrderService } from '../services/order.services';
import { authDataContext } from './AuthContext';

export const orderDataContext = createContext();

const OrderContext = ({ children }) => {

    // USE STATES
    const [orderData, setOrderData] = useState([]);
    const [finalData, setFinalData] = useState([]);

    // CONTEXT DATA
    const { loggedinUserData } = useContext(authDataContext);
    const userId = loggedinUserData?.id;

    // FETCH ORDERS
    const fetchOrders = async (uid) => {
        try {
            const response = await getOrders(uid);
            setOrderData(response?.data?.message);
            return response;
        } catch (error) {
            console.log(error);
            return { success: false, message: error }
        }
    }

    // PLACE ORDER
    const order = async (orderData) => {
        try {
            const response = await placeOrder(orderData);
            if (response?.data?.success) {
                await fetchOrders(userId);
            }
            return response.data;
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error,
            }
        }
    }

    // CANCEL ORDER
    const cancelOrder = async (orderId) => {
        try {
            const response = await cancelOrderService(orderId);
            if (response?.data?.success) {
                // Refresh orders after cancellation
                await fetchOrders(userId);
            }
            return response?.data;
        } catch (error) {
            console.log(error);
            return { success: false, message: error }
        }
    }


    // GET ALL ORDERS
    useEffect(() => {
        if (userId) {
            fetchOrders(userId);
        } else {
            setOrderData([]);
        }
    }, [userId]);


    // GETTING FINAL DATA
    useEffect(() => {
        const processOrderData = () => {
            if (orderData && orderData.length > 0) {
                const allItems = orderData.flatMap(order => {
                    return order.items.map(item => ({
                        quantity: item.quantity,
                        price: item.price,
                        productDetails: item.productId,
                        orderId: order._id,
                        date: order.date,
                        status: order.status,
                    }));
                });

                setFinalData(allItems);
            } else {
                setFinalData([]);
            }
        };

        try {
            processOrderData();
        } catch (error) {
            console.log("Error processing order data:", error);
        }
    }, [orderData]);

    const value = {
        order, orderData, finalData, cancelOrder, fetchOrders
    }

    return (
        <orderDataContext.Provider value={value}>
            {children}
        </orderDataContext.Provider>
    )
}

export default OrderContext