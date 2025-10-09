import { serverURL } from '../config/server.js';
import axios from 'axios';


// ADMIN LOGIN SERVICE
export const adminLoginService = async (email, password) => {
    try {
        const response = await axios.post(serverURL + "/api/auth/login",
            { email, password },
            { withCredentials: true }
        );
        // console.log(response)
        return response;

    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}


// GET ADMIN DATA SERVICE
export const getAdminDataService = async () => {
    try {
        const response = await axios.get(serverURL + "/api/auth/getUserData"
            , { withCredentials: true }
        )
        // console.log(response)
        return response;

    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}


// LOGOUT ADMIN
export const logoutService = async () => {
    try {
        const response = await axios.post(serverURL + "/api/auth/logout",
            {},
            { withCredentials: true }
        )

        return response;

    } catch (error) {
        return {
            success: false,
            message: error.message,
        }
    }
}