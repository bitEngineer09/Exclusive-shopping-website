import { User } from "../models/user.model.js";
import { addToCartService, clearParticularItemService, deleteCartItemService } from "../services/cart.services.js";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// ADD ITEMS TO CART
export const addToCart = asyncHandler(async (req, res) => {
    if (!req.user) throw new AppError("User not found", 404);
    // console.log("req", req.user.id);
    // console.log("body", req.user);

    const { productId, quantity = 1, sizes, price } = req.body;
    // console.log(sizes);
    // console.log(price);

    const cart = await addToCartService(req.user.id, productId, quantity, sizes, price);

    return res.status(200).json({ success: true, cart });
})


// DELETE ITEMS FROM CART
export const deleteCartItem = asyncHandler(async (req, res) => {
    if (!req.user) throw new AppError("You are not authenticated", 401);

    const { productId } = req.body;

    const cart = await deleteCartItemService(productId, req.user.id,);

    return res.status(200).json({ success: true, cart });
})

// CLEAR PARTICULAR CART ITEM
export const clearParticularItem = asyncHandler(async (req, res) => {
    if (!req.user) throw new AppError("You are not authenticated", 401);

    const { productId } = req.body;

    const cart = await clearParticularItemService(req.user.id, productId);

    return res.status(200).json(
        {
            success: true,
            message: "Product removed from cart",
            cart,
            cartLength: cart.length,
        })
})


// GET CART ITEMS
export const getCartItems = asyncHandler(async (req, res) => {
    if (!req.user) throw new AppError("You are not authenticated", 401);

    const user = await User.findById(req.user.id).populate("cart.productId");
    if (!user) {
        throw new AppError("User not found", 404);
    }

    return res.status(200).json({ success: true, cart: user.cart });
})