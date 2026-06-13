import axios from "axios";
import { serverURL } from "../config/server";

// FETCH ALL ACTIVE ORDERS (excludes delivered)
export const getAllOrdersAdmin = async () => {
    try {
        const response = await axios.get(serverURL + "/api/order/getAdminOrder", { withCredentials: true });
        return response;
    } catch (error) {
        console.log(error);
        return { success: false, message: error };
    }
}

// FETCH COMPLETED (DELIVERED) ORDERS
export const getAllCompletedOrders = async () => {
    try {
        const response = await axios.get(serverURL + "/api/order/getCompletedOrders", { withCredentials: true });
        return response;
    } catch (error) {
        console.log(error);
        return { success: false, message: error };
    }
}


// STATUS UPDATE
export const statusChange = async (newStatus, orderId) => {
    try {
        const response = await axios.post(serverURL + "/api/order/orderStatus", { orderId, status: newStatus }, { withCredentials: true });
        if (response.data.success) {
            console.log("Status updated successfully");
        } else {
            console.log("Failed to update status");
        }
        return response;
    } catch (error) {
        console.log(error.message);
    }
}