import axios from "axios"
import { serverUrl } from "../config/serverUrl"

// GET PRODUCT DATA BY ID
export const getProductById = async (id) => {
    try {
        const response = await axios.get(serverUrl + `/api/product/${id}`, { withCredentials: true });
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
        const response = await axios.post(serverUrl + "/api/product/addToWishList",
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
        const response = await axios.get(serverUrl + "/api/product/getWishListData",
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
        const response = await axios.post(serverUrl + `/api/product/${productId}/review`,
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
