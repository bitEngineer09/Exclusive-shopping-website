import { serverURL } from "../config/serverURL";
import axios from 'axios';


// PLACE ORDER
export const placeOrder = async (orderData) => {
    try {
        const response = await axios.post(
            serverURL + '/api/order/placeorder',
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
        const response = await axios.post(serverURL +
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
            serverURL + "/api/order/getAllOrder",
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

// CANCEL ORDER
export const cancelOrderService = async (orderId) => {
    try {
        const response = await axios.delete(
            serverURL + "/api/order/cancelOrder",
            { data: { orderId }, withCredentials: true }
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