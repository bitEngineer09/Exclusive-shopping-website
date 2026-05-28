import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { addToCartService, clearParticularItemService, deleteCartItemService } from "../services/cart.services.js";

// ADD ITEMS TO CART
export const addToCart = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "User not found" });

        console.log("req", req.user.id);
        console.log("body", req.user);

        const { productId, quantity = 1, sizes, price } = req.body;
        // console.log(sizes);
        // console.log(price);

        const cart = await addToCartService(req.user.id, productId, quantity, sizes, price);

        return res.status(200).json({ success: true, cart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


// DELETE ITEMS FROM CART
export const deleteCartItem = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const { productId } = req.body;

        const cart = await deleteCartItemService(productId, req.user.id,);

        return res.status(200).json({ success: true, cart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: error.message });
    }
}

// CLEAR PARTICULAR CART ITEM
export const clearParticularItem = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const { productId } = req.body;

        const cart = await clearParticularItemService(req.user.id, productId);

        return res.status(200).json(
            {
                success: true,
                message: "Product removed from cart",
                cart,
                cartLenght: cart.length,
            })

    } catch (error) {
        return res.status(400).json({ success: false, message: error });
    }
}


// GET CART ITEMS
export const getCartItems = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const user = await User.findById(req.user.id).populate("cart.productId");
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, cart: user.cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
}