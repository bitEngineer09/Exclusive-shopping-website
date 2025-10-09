import React, { useEffect } from 'react'
import { createContext } from 'react'
import { adminLoginService, getAdminDataService, logoutService } from '../services/auth.services';
import { useState } from 'react';

export const authDataContext = createContext();

const AuthContext = ({ children }) => {

    const [admin, setAdmin] = useState(null);

    // LOGIN CONTEXT
    const handleAdminLogin = async (email, password) => {
        try {
            const result = await adminLoginService(email, password);
            console.log(result?.data?.user);
            setAdmin(result?.data?.user);
            return result?.data?.user;

        } catch (error) {
            console.log(error.message);
            return {
                success: false,
                message: error.message,
            }
        }
    }


    // GET ADMIN DATA
    const getAdminData = async () => {
        try {
            const result = await getAdminDataService();
            // console.log(result?.data);
            setAdmin(result?.data)
            return result;

        } catch (error) {

            console.log(error.message);
            return {
                success: false,
                message: error.message,
            }
        }
    }


    useEffect(() => {
        const fetchAdmin = async () => {
            try {
                const result = await getAdminData();
                setAdmin(result?.data?.user);
            } catch (error) {
                setAdmin(null);
                console.log("fetchAdmin error:", error)
            }
        }
        fetchAdmin();
    }, []);



    // HANDLE LOGOUT ADMIN
    const handleLogout = async () => {
        try {
            const result = await logoutService();
            setAdmin(null);
            console.log(result);
            return result;
        } catch (error) {
            console.log(error.message);
            return {
                success: false,
                message: error.message,
            }
        }
    }


    const value = {
        admin, setAdmin,
        handleAdminLogin, getAdminData, handleLogout
    }


    return (
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    )
}

export default AuthContext