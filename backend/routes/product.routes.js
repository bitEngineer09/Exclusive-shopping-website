import express from 'express';
import { addProduct, addProductToWishList, addReview, deleteProductById, getAllProducts, getProductById, getWishListData } from '../controllers/product.controller.js';
import { upload } from '../middlewares/multer.js';
import { isAuth } from '../middlewares/isAuth.js';
import { isAdmin } from '../middlewares/isAdmin.js';

export const productRouter = express.Router();

productRouter.post('/addProduct', isAuth, isAdmin, upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
]),
    addProduct);


productRouter.get("/getAll", getAllProducts);

productRouter.get("/getWishListData", isAuth, getWishListData);

productRouter.post("/addToWishList", isAuth, addProductToWishList);

productRouter.post("/:id/review", isAuth, addReview);

productRouter.delete("/delete/:id", isAuth, isAdmin, deleteProductById);

productRouter.get("/:id", getProductById);
