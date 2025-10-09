import React from 'react';
import { createContext } from 'react';
import { getAllOrdersAdmin, statusChange } from '../services/order.services';
import { useEffect } from 'react';
import { useState } from 'react';

export const orderDataContext = createContext();

const OrderContext = ({ children }) => {

    const [orderData, setOrderData] = useState([]);
    const [finalData, setFinalData] = useState([]);

    useEffect(() => {
        const handleAdminOrders = async () => {
            try {
                const response = await getAllOrdersAdmin();
                // console.log(response.data.orders);
                setOrderData(response?.data?.orders);

                return response?.data?.orders;

            } catch (error) {
                console.log(error.message);
                return {
                    success: false,
                    message: error.message,
                }
            }
        }
        handleAdminOrders();
    }, []);


    // GET FINAL ORDER DATA
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
            // console.log(allItems);
        }
    }, [orderData]);

    console.log(finalData);
    // console.log(orderData);


    const handleStatusChange = async (orderId, status) => {
        try {
            console.log(status, orderId);
            const response = await statusChange(status, orderId);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
            return {
                success: false,
                message: error,
            }
        }
    }


    const value = {
        finalData, handleStatusChange
    };

    return (
        <orderDataContext.Provider value={value}>
            {children}
        </orderDataContext.Provider>
    )
}

export default OrderContext;