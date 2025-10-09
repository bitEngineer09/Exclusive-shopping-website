import mongoose from "mongoose";
import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

// ADD PRODUCT
export const addProduct = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            subCategory,
            sizes,
            bestSeller
        } = req.body;

        const image1 = req.files.image1 ? await uploadOnCloudinary(req.files.image1[0]) : null;
        const image2 = req.files.image2 ? await uploadOnCloudinary(req.files.image2[0]) : null;
        const image3 = req.files.image3 ? await uploadOnCloudinary(req.files.image3[0]) : null;
        const image4 = req.files.image4 ? await uploadOnCloudinary(req.files.image4[0]) : null;

        const productData = {
            name,
            description,
            price: Number(price),
            category,
            subCategory,
            sizes: JSON.parse(sizes),
            bestSeller: bestSeller === "true" ? true : false,
            date: new Date(),
            image1,
            image2,
            image3,
            image4
        }

        const product = await Product.create(productData);
        if (!product) return res.
            status(400)
            .json({
                success: false,
                message: "Internal server error"
            });

        return res.status(201).json({ success: true, product: product });

    } catch (error) {
        console.log("Add product error", error);
        return res.status(400).json({ success: false, message: error });
    }
}


// GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        if (!products) return res.status(400).json({ success: false, message: "Internal Server Error" });

        return res.status(200).json({ success: true, products });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error,
        })
    }
}


// DELETE A PRODUCT
export const deleteProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) return res.status(400).json({ success: false, message: "Id not found" });

        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) return res.status(400).json({ success: false, message: "Internal Server Error" });

        return res.status(200).json({
            success: true,
            deletedProduct
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error,
        });
    }
}


// GET PRODUCT BY ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const findSingleProduct = await Product.findById(id);
        if (!findSingleProduct) return res.status(400).json({ success: false, message: "Product not found" });

        return res.status(200).json({ success: true, product: findSingleProduct });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error,
        })
    }
}


// ADD PRODUCT TO WISHLIST
export const addProductToWishList = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const { productId } = req.body;
        const user = await User.findById(req.user.id);
        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        const product = await Product.findById(productId);
        if (!product) return res.status(400).json({ success: false, message: "Product not found" });


        const itemIndex = user.wishList.findIndex(
            item => item.productId && item.productId.toString() === productId
        );

        if (itemIndex === -1) {
            user.wishList.push({ productId });
        } else {
            user.wishList.splice(itemIndex, 1);
        }

        await user.save();
        await user.populate("wishList.productId");

        return res.status(200).json({ success: true, wishList: user.wishList });

    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error.message });
    }
}


// GET WIHSLIST DATA
export const getWishListData = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });
        // console.log("User ID:", req.user?.id);
        const user = await User.findById(req.user.id).populate("wishList.productId");
        if (!user) return res.status(400).json({ success: false, message: "User not found" });

        return res.status(200).json({ success: true, wishListData: user.wishList });

    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ success: false, message: "Internal Server error" });
    }
}


// REVIEW ADD BACKEND ROUTE
export const addReview = async (req, res) => {
    try {
        const { rating, comment } = req.body;

        const {id} = req.params;
        console.log(id);

        const product = await Product.findById(id);
        if (!product) return res.status(400).json({ success: false, message: "Product not found" });

        const review = {
            user: req.user.id,
            rating: Number(rating),
            comment
        }

        product.reviews.push(review);

        // average rating calculator
        product.averageRating = product.reviews.reduce((acc, item) => item.rating + 0, 0) / product.reviews.length;

        await product.save();

        return res.status(201).json({ success: true, message: "Review added" });

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: error,
        })
    }
}
