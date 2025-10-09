import axios from "axios";
import { serverUrl } from "../config/serverUrl";


// GET CART ITEMS
export const getCartItems = async () => {
    try {
        const response = await axios.get(serverUrl + "/api/cart/get", { withCredentials: true });
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}

// ADD ITEM TO CART
export const addCartItem = async (productId, quantity, sizes, price) => {
    try {
        const response = await axios.post(serverUrl + "/api/cart/add",
            { productId, quantity, sizes, price },
            { withCredentials: true }
        )
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}


// DELETE CART ITEM
export const deleteCartItem = async (productId, quantity) => {
    try {
        const response = await axios.post(serverUrl + "/api/cart/delete",
            { productId, quantity },
            { withCredentials: true }
        )
        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}

// REMOVE A WHOLE PARTICULAR ITEM
export const removeParticularCartItem = async (productId) => {
    try {
        const response = await axios.post(serverUrl + "/api/cart/clearItem"
            , { productId },
            { withCredentials: true }
        );
        return response.data;

    } catch (error) {
        return {
            success: false,
            error: error,
        }
    }
}