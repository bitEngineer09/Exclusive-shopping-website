import React from 'react';
import { createContext } from 'react';
import { getAllOrdersAdmin, getAllCompletedOrders, statusChange } from '../services/order.services';
import { useEffect } from 'react';
import { useState } from 'react';

export const orderDataContext = createContext();

const OrderContext = ({ children }) => {

    const [orderData, setOrderData] = useState([]);
    const [finalData, setFinalData] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    // FETCH ACTIVE ORDERS
    const fetchActiveOrders = async () => {
        try {
            const response = await getAllOrdersAdmin();
            setOrderData(response?.data?.orders || []);
        } catch (error) {
            console.log(error.message);
        }
    };

    // FETCH COMPLETED ORDERS
    const fetchCompletedOrders = async () => {
        try {
            const response = await getAllCompletedOrders();
            setCompletedOrders(response?.data?.orders || []);
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        fetchActiveOrders();
        fetchCompletedOrders();
    }, []);


    // GET FINAL ORDER DATA (active orders only)
    useEffect(() => {
        if (orderData && orderData.length > 0) {
            const allItems = orderData.flatMap(order => {
                return order.items.map((item) => {
                    return {
                        quantity: item.quantity,
                        price: item.price,
                        productDetails: item.productId,
                        sizes: item.productId.sizes,
                        orderId: order._id,
                        date: order.date,
                        paymentMode: order.paymentMethod,
                        status: order.status,
                        address: order.address
                    }
                });
            });
            setFinalData(allItems);
        } else {
            setFinalData([]);
        }
    }, [orderData]);


    const handleStatusChange = async (orderId, status) => {
        try {
            const response = await statusChange(status, orderId);
            // Refresh both lists after any status change
            await fetchActiveOrders();
            await fetchCompletedOrders();
            return response;
        } catch (error) {
            console.log(error);
            return { success: false, message: error };
        }
    }


    const value = {
        finalData, handleStatusChange, completedOrders
    };

    return (
        <orderDataContext.Provider value={value}>
            {children}
        </orderDataContext.Provider>
    )
}

export default OrderContext;