import { serverUrl } from "../config/serverUrl";
import axios from 'axios';


// PLACE ORDER
export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(
            serverUrl + '/api/order/placeorder',
            orderData,
            { withCredentials: true }
        )

        return response;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error,
        }
    }
}

// PLACE ORDER WITH RAZORPAY
export const placeOrderRazorpay = async (orderData) => {
    try {
        const response = await axios.post(serverUrl +
                "/api/order/placeOrderRazorpay",
                orderData,
                {withCredentials: true}
            );
            return response;
    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error,
        }
    }
}


// GET ALL ORDERS
export const getOrders = async (userId) => {
    try {
        const response = await axios.get(
            serverUrl + "/api/order/getAllOrder",
            { params: { userId }, withCredentials: true });
        return response;

    } catch (error) {
        console.log(error);
        return {
            success: false,
            message: error,
        }
    }
}