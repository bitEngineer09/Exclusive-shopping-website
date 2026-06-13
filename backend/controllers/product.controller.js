import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import AppError from "../utils/AppError.js";

// ADD PRODUCT
export const addProduct = asyncHandler(async (req, res) => {
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
    if (!product) throw new AppError("Internal Server Error", 500);

    return res.status(201).json({ success: true, product });
})


// GET ALL PRODUCTS
export const getAllProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({});
    if (!products) throw new AppError("Internal Server Error", 500);

    return res.status(200).json({ success: true, products });
})


// DELETE A PRODUCT
export const deleteProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) throw new AppError("Id not found", 400);

    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) throw new AppError("Internal Server Error", 500);

    return res.status(200).json({
        success: true,
        deletedProduct
    });
})


// GET PRODUCT BY ID
export const getProductById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const findSingleProduct = await Product.findById(id);
    if (!findSingleProduct) throw new AppError("Product not found", 404);

    return res.status(200).json({ success: true, product: findSingleProduct });

})


// ADD PRODUCT TO WISHLIST
export const addProductToWishList = asyncHandler(async (req, res) => {
    if (!req.user) throw new AppError("You are not authenticated", 401);

    const { productId } = req.body;
    const user = await User.findById(req.user.id);
    if (!user) throw new AppError("User not found", 404);
    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found", 404);

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
})


// GET WIHSLIST DATA
export const getWishListData = asyncHandler(async (req, res) => {
    if (!req.user) throw new AppError("You are not authenticated", 401);
    // console.log("User ID:", req.user?.id);
    const user = await User.findById(req.user.id).populate("wishList.productId");
    if (!user) throw new AppError("User not found", 404);
    return res.status(200).json({ success: true, wishListData: user.wishList });
})


// REVIEW ADD BACKEND ROUTE
export const addReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;

    const { id } = req.params;

    const product = await Product.findById(id);
    if (!product) throw new AppError("Product not found", 404);

    const review = {
        user: req.user.id,
        rating: Number(rating),
        comment
    }

    product.reviews.push(review);

    // average rating calculator
    product.averageRating = product.reviews.reduce((acc, item) => acc + item.rating, 0) / product.reviews.length;

    await product.save();

    return res.status(201).json({ success: true, message: "Review added" });
})
