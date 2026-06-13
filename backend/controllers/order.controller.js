import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import AppError from "../utils/AppError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ---------------- COD ORDER ----------------
export const placeOrder = asyncHandler(async (req, res) => {
    const userId = req?.user?.id;
    if (!userId) throw new AppError("You are not authenticated", 401);

    const { items, amount, address } = req.body;

    const newOrder = await Order.create({
        userId,
        items,
        amount,
        address,
        paymentMethod: "COD",
        payment: false,
        date: Date.now(),
    });

    // Cart clear
    await User.findByIdAndUpdate(userId, { cart: [] });

    return res.status(200).json({ success: true, message: "Order placed", order: newOrder });
})

// ---------------- RAZORPAY ORDER ----------------
export const placeOrderRazorpay = asyncHandler(async (req, res) => {
    const { items, amount, address } = req.body;
    const userId = req?.user?.id;
    if (!userId) throw new AppError("You are not authenticated", 401);

    const options = {
        amount: Math.round(amount * 100), // paise me
        currency: "INR",
        receipt: "order_rcptid_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    const newOrder = await Order.create({
        userId,
        items,
        amount,
        address,
        paymentMethod: "Razorpay",
        payment: false,
        razorpayOrderId: order.id,
    });

    res.status(200).json({ success: true, order, dbOrderId: newOrder._id });
})

// ---------------- VERIFY RAZORPAY PAYMENT ----------------
export const verifyPayment = asyncHandler(async (req, res) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, orderId } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature === razorpay_signature) {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            {
                payment: true,
                razorpayPaymentId: razorpay_payment_id,
                razorpaySignature: razorpay_signature,
                status: "processing",
            },
            { new: true }
        );

        // Cart clear after successful payment
        await User.findByIdAndUpdate(updatedOrder.userId, { cart: [] });

        res.status(200).json({ success: true, message: "Payment verified successfully", order: updatedOrder });
    } else {
        throw new AppError("Payment verification failed", 400);
    }
})

// ---------------- FETCH USER ORDERS ----------------
export const getAllOrder = asyncHandler(async (req, res) => {
    if (!req.user) throw new AppError("You are not authenticated", 401);

    const { userId } = req.query;
    const orders = await Order.find({ userId }).populate("items.productId");
    if (!orders) throw new AppError("No order found", 400);

    return res.status(200).json({ success: true, message: orders });
})

// ---------------- ADMIN ORDERS ----------------
export const getAllOrderAdmin = asyncHandler(async (req, res) => {
    const adminOrders = await Order.find({ status: { $ne: "delivered" } }).populate("items.productId");
    if (!adminOrders) throw new AppError("Internal server error", 400);

    return res.status(200).json({ success: true, orders: adminOrders });
})

// ---------------- UPDATE ORDER STATUS ----------------
export const updateStatus = asyncHandler(async (req, res) => {
    const { orderId, status } = req.body;
    await Order.findByIdAndUpdate(orderId, { status });
    return res.status(200).json({ success: true, message: "Status updated" });
})

// ---------------- CANCEL ORDER (USER) ----------------
export const cancelOrder = asyncHandler(async (req, res) => {
    const userId = req?.user?.id;
    if (!userId) throw new AppError("You are not authenticated", 401);

    const { orderId } = req.body;
    const order = await Order.findOne({ _id: orderId, userId });

    if (!order) throw new AppError("Order not found", 404);

    // Cannot cancel if already shipped or delivered
    if (order.status === "shipped" || order.status === "delivered") {
        throw new AppError("Order cannot be cancelled after it has been shipped", 400);
    }

    await Order.findByIdAndDelete(orderId);
    return res.status(200).json({ success: true, message: "Order cancelled and removed" });
})

// ---------------- COMPLETED ORDERS (ADMIN) ----------------
export const getCompletedOrders = asyncHandler(async (req, res) => {
    const completedOrders = await Order.find({ status: "delivered" }).populate("items.productId");
    return res.status(200).json({ success: true, orders: completedOrders });
})