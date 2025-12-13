import React, { createContext, useEffect, useState } from 'react'
import { addCartItem, deleteCartItem, getCartItems, removeParticularCartItem } from '../services/cart.services';

export const cartDataContext = createContext();

const CartContext = ({ children }) => {

    // USE STATES
    const [cartItems, setCartItems] = useState([]);
    const [isCartLoading, setIsCartLoading] = useState(true);

    // GET CART ITEMS
    const getAllCartItems = async () => {
        try {
            setIsCartLoading(true);
            const response = await getCartItems();
            if (response?.cart) {
                setCartItems(response?.cart);
            }
            // console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        } finally {
            setIsCartLoading(false);
        }
    }

    useEffect(() => {
        getAllCartItems()
    }, [])

    // ADD CART ITEMS
    const addItemsToCart = async (productId, quantity, sizes, price) => {
        try {
            // console.log(sizes);
            const response = await addCartItem(productId, quantity, sizes, price);
            // console.log(response.cart);
            if (response?.cart) {
                setCartItems(response.cart); 
            }
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    // DELETE ITEMS FROM CART
    const deleteItemsFromCart = async (productId, quantity = 1) => {
        try {
            const response = await deleteCartItem(productId, quantity);
             if (response?.cart) {
                setCartItems(response.cart); 
            }
            
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    // REMOVE WHOLE PARTICULAR ITEM FROM CART
    const removeItem = async (productId) => {
        try {
            const response = await removeParticularCartItem(productId);
            if (response?.cart) {
                setCartItems(response.cart)
            }
            // console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }


    const value = {
        cartItems, 
        setCartItems,
        isCartLoading,
        getAllCartItems, 
        addItemsToCart, 
        deleteItemsFromCart,
        removeItem
    }

    return (
        <cartDataContext.Provider value={value}>
            {children}
        </cartDataContext.Provider>
    )
}

export default CartContext