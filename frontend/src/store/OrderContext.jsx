import React, { createContext, useContext, useEffect, useState } from 'react'
import { getOrders, placeOrder } from '../services/order.services';
import { authDataContext } from './AuthContext';

export const orderDataContext = createContext();

const OrderContext = ({ children }) => {

    // USE STATES
    const [orderData, setOrderData] = useState([]);
    const [finalData, setFinalData] = useState([]);

    // CONTEXT DATA
    const { loggedinUserData } = useContext(authDataContext);
    const userId = loggedinUserData?.id;
    // console.log(userId)

    // PLACE ORDER
    const order = async (orderData) => {
        try {
            console.log(orderData)
            const response = await placeOrder(orderData);
            // console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error,
            }
        }
    }


    // GET ALL ORDERS
    useEffect(() => {
        const fetchOrders = async (userId) => {
            try {
                const response = await getOrders(userId);
                // console.log(response?.data);
                setOrderData(response?.data?.message);
                return response;
            } catch (error) {
                console.log(error);
                return {
                    success: false,
                    message: error,
                }
            }
        }
        fetchOrders(userId);
    }, [userId]);

    // console.log(orderData)

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
            }
        };

        try {
            processOrderData();
        } catch (error) {
            console.log("Error processing order data:", error);
        }
    }, [orderData]);
    // console.log("FINAL DATA:", finalData);

    const value = {
        order, orderData, finalData
    }

    return (
        <orderDataContext.Provider value={value}>
            {children}
        </orderDataContext.Provider>
    )
}

export default OrderContext