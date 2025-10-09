import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

// ADD ITEMS TO CART
export const addToCart = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "User not found" });

        const { productId, quantity = 1, sizes, price } = req.body;
        // console.log(sizes);
        // console.log(price);
        const product = await Product.findById(productId);
        if (!product) return res.status(400).json({ success: false, message: "Product not found" });

        const user = await User.findById(req.user.id);

        // now check if added item is already present in cart or not
        // user ke cart me se fum find kar re hai
        //? equals() MongoDB ka method hai jo ObjectId compare karta hai (string comparison se alag).
        const isExists = user.cart.find(item => item.productId.equals(productId));

        if (isExists) {
            isExists.quantity += quantity;

            isExists.sizes = Array.from(new Set([...isExists.sizes, ...sizes]));
        } else {
            user.cart.push({ productId, quantity, sizes, price });
        }

        await user.save();
        await user.populate("cart.productId");

        return res.status(200).json({ cart: user.cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}


// DELETE ITEMS FROM CART
export const deleteCartItem = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const { productId, quantity = 1 } = req.body;

        const product = await Product.findById(productId);
        if (!product) return res.status(400).json({ success: false, message: "Product not found" });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        const itemIndex = user.cart.findIndex(item => item.productId.equals(product._id));

        if (itemIndex === -1) {
            return res.status(400).json({ success: false, message: "Product not in cart" });
        }

        if (user.cart[itemIndex].quantity > 1) {
            user.cart[itemIndex].quantity -= 1;
        } else {
            user.cart.splice(itemIndex, 1);
        }

        await user.save();
        await user.populate("cart.productId");

        return res.status(200).json({ success: true, cart: user.cart });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: error });
    }
}

// CLEAR PARTICULAR CART ITEM
export const clearParticularItem = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const { productId } = req.body;

        const user = await User.findById(req.user.id);
        if (!user) return res.status(400).json({ success: false, message: "User not found" })

        const product = await Product.findById(productId);
        if (!product) return res.status(400).json({ success: false, message: "Product not found" });

        const itemIndex = user.cart.findIndex(item => item.productId.equals(product._id));
        if (itemIndex === -1) return res.status(400).json({ success: false, message: "Product not in cart" });

        user.cart.splice(itemIndex, 1);

        await user.save();
        await user.populate("cart.productId");

        return res.status(200).json(
            {
                success: true,
                message: "Product removed from cart",
                cart: user.cart,
                cartLenght: user.cart.length,
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