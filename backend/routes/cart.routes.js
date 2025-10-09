import express from 'express';
import { addToCart, clearParticularItem, deleteCartItem, getCartItems } from '../controllers/cart.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const cartRouter = express.Router();

cartRouter.get("/get", isAuth, getCartItems);

cartRouter.post("/add", isAuth, addToCart);

cartRouter.post("/delete", isAuth, deleteCartItem);

cartRouter.post("/clearItem", isAuth, clearParticularItem);

export default cartRouter;