import axios from 'axios';
import { serverUrl } from '../config/serverUrl';


// LOGIN SERVICES
export const loginService = async (email, password) => {
    try {
        const result = await axios.post(serverUrl + "/api/auth/login",
            { email, password },
            { withCredentials: true }
        );
        return result;

    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}


// SIGNUP SERVICES
export const signupService = async (firstName, lastName, email, phone, dob, gender, password) => {
    try {
        const response = await axios.post(serverUrl + "/api/auth/register", {
            firstName,
            lastName,
            email,
            phone,
            dob,
            gender,
            password,
        }, { withCredentials: true });

        return response;

    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}



// LOGOUT SERVICES
export const logoutService = async () => {
    try {
        const response = await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true });
        return response;

    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}


// GET CURRENT LOGGED IN USER DATA
export const getCurrentLoggedInUserData = async () => {
    try {
        const response = await axios.get(serverUrl + "/api/auth/getUserData", { withCredentials: true });
        return response;

    } catch (error) {
        return {
            success: false,
            message: error,
        }
    }
}

// EDIT USER SERVICES
export const editUser = async (firstName, lastName, phone, dob, gender) => {
    try {
        const response = await axios.patch(serverUrl + "/api/auth/edit",
            {
                firstName,
                lastName,
                phone,
                dob,
                gender
            },
            {withCredentials: true}
        );
        return response;
    } catch (error) {
        console.error(error.message);
        return {
            success: false,
            error: error.message
        }
    }
}


