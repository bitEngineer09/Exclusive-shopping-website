import axios from "axios"
import { serverURL } from "../config/serverURL"

// GET ALL PRODUCTS
export const getAllProducts = async () => {
    try {
        const response = await axios.get(serverURL + "/api/product/getAll", { withCredentials: true });
        return response;
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}

// GET PRODUCT DATA BY ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(serverURL + `/api/product/${id}`, { withCredentials: true });
        return response;
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}

// ADD TO WISHLIST
export const addToWishList = async (productId) => {
    try {
        const response = await axios.post(serverURL + "/api/product/addToWishList",
            { productId },
            { withCredentials: true }
        );

        return response;

    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}


// GET WISHLIST DATA
export const getWishListData = async () => {
    try {
        const response = await axios.get(serverURL + "/api/product/getWishListData",
            { withCredentials: true }
        );
        return response;

    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}



// ADD REVIEW
export const addReview = async (rating, comment, productId) => {
    try {
        const response = await axios.post(serverURL + `/api/product/${productId}/review`,
            {rating, comment},
            {withCredentials: true},
        );

        return response.data;
    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}
