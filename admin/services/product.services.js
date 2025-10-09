import { serverURL } from "../src/config/server";
import axios from 'axios';

// ADD PRODUCT SERVICE
export const addProduct = async (formData) => {
    try {
        const response = await axios.post(serverURL + "/api/product/addProduct",
            formData,
            { withCredentials: true });
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


// GET ALL PRODUCTS
export const getAllProducts = async () => {
    try {
        const response = await axios.get(serverURL + "/api/product/getAll", {withCredentials: true});
        return response;
    } catch (error) {
        return {
            success: false, 
            message: error,
        }
    }
}


// DELETE PRODUCT BY ID
export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(serverURL + `/api/product/delete/${id}`, {}, {withCredentials: true});
        return response;
    } catch (error) {
        return {
            success: false, 
            message: error,
        }        
    }
}



