import { uploadOnCloudinary } from "../config/cloudinary.js";
import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";


// ADD PRODUCT
export const addProductService = async (body, files) => {

    const {
        name,
        description,
        price,
        category,
        subCategory,
        sizes,
        bestSeller
    } = body;

    const image1 = files.image1
        ? await uploadOnCloudinary(files.image1[0])
        : null;

    const image2 = files.image2
        ? await uploadOnCloudinary(files.image2[0])
        : null;

    const image3 = files.image3
        ? await uploadOnCloudinary(files.image3[0])
        : null;

    const image4 = files.image4
        ? await uploadOnCloudinary(files.image4[0])
        : null;

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
    };

    const product = await Product.create(productData);

    if (!product) {
        throw new Error("Internal server error");
    }

    return product;
};


// GET ALL PRODUCTS
export const getAllProductsService = async () => {

    const products = await Product.find({});

    if (!products) {
        throw new Error("Internal Server Error");
    }

    return products;
};


// DELETE A PRODUCT
export const deleteProductByIdService = async (id) => {

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        throw new Error("Internal Server Error");
    }

    return deletedProduct;
};


// GET PRODUCT BY ID
export const getProductByIdService = async (id) => {

    const product = await Product.findById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};


// ADD PRODUCT TO WISHLIST
export const addProductToWishListService = async (
    userId,
    productId
) => {

    const user = await User.findById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    const itemIndex = user.wishList.findIndex(
        item =>
            item.productId &&
            item.productId.toString() === productId
    );

    if (itemIndex === -1) {
        user.wishList.push({ productId });
    } else {
        user.wishList.splice(itemIndex, 1);
    }

    await user.save();
    await user.populate("wishList.productId");

    return user.wishList;
};


// GET WIHSLIST DATA
export const getWishListDataService = async (userId) => {

    const user = await User.findById(userId)
        .populate("wishList.productId");

    if (!user) {
        throw new Error("User not found");
    }

    return user.wishList;
};


// REVIEW ADD BACKEND ROUTE
export const addReviewService = async (
    productId,
    userId,
    rating,
    comment
) => {

    const product = await Product.findById(productId);

    if (!product) {
        throw new Error("Product not found");
    }

    const review = {
        user: userId,
        rating: Number(rating),
        comment
    };

    product.reviews.push(review);

    // average rating calculator
    product.averageRating =
        product.reviews.reduce(
            (acc, item) => item.rating + 0,
            0
        ) / product.reviews.length;

    await product.save();

    return product;
};