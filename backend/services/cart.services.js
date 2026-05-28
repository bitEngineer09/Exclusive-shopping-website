import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

export const addToCartService = async (userId, productId, quantity, sizes, price) => {

    console.log("USER ID:", userId);

    const user = await User.findById(userId);

    console.log("FOUND USER:", user);

    if (!user) {
        throw new Error("User not found");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    const isExists = user.cart.find(item => item.productId.equals(productId));

    if (isExists) {
        isExists.quantity += quantity;

        isExists.sizes = Array.from(
            new Set([
                ...(isExists.sizes || []),
                ...(sizes || [])
            ])
        );
    } else {
        user.cart.push({ productId, quantity, sizes, price });
    }

    await user.save();
    await user.populate("cart.productId");

    return user.cart;
}

export const deleteCartItemService = async (productId, userId) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }

    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const itemIndex = user.cart.findIndex(item => item.productId.equals(product._id));

    if (itemIndex === -1) {
        throw new Error("Product not in cart");
    }

    if (user.cart[itemIndex].quantity > 1) {
        user.cart[itemIndex].quantity -= 1;
    } else {
        user.cart.splice(itemIndex, 1);
    }

    await user.save();
    await user.populate("cart.productId");

    return user.cart;

}

export const clearParticularItemService = async (userId, productId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("User not found");
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new Error("Product not found");
    }
    const itemIndex = user.cart.findIndex(item => item.productId.equals(product._id));
    if (itemIndex === -1) {
        throw new Error("Product not in cart");
    }

    user.cart.splice(itemIndex, 1);

    await user.save();
    await user.populate("cart.productId");

    return user.cart;
}