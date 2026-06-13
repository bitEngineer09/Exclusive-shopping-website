import express from 'express';
import { getAllOrder, getAllOrderAdmin, placeOrder, placeOrderRazorpay, updateStatus, verifyPayment, cancelOrder, getCompletedOrders } from '../controllers/order.controller.js';
import { isAuth } from '../middlewares/isAuth.js';

const orderRouter = express.Router();

// FOR USER
orderRouter.post("/placeorder", isAuth, placeOrder);
orderRouter.get("/getAllOrder", isAuth, getAllOrder);
orderRouter.post("/razorpay", isAuth, placeOrderRazorpay);
orderRouter.post("/verify", isAuth, verifyPayment);
orderRouter.delete("/cancelOrder", isAuth, cancelOrder);


// FOR ADMIN
orderRouter.get("/getAdminOrder", getAllOrderAdmin);
orderRouter.post("/orderStatus", updateStatus);
orderRouter.get("/getCompletedOrders", getCompletedOrders);

export default orderRouter;