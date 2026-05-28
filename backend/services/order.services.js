import { Order } from "../models/order.model.js";
import { User } from "../models/user.model.js";
import Razorpay from "razorpay";
import crypto from "crypto";

// Razorpay instance
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// ---------------- COD ORDER ----------------
export const placeOrderService = async (
    userId,
    items,
    amount,
    address
) => {

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

    // return whole new order object to controller for response
    return newOrder;
};


// ---------------- RAZORPAY ORDER ----------------
export const placeOrderRazorpayService = async (
    userId,
    items,
    amount,
    address
) => {

    const options = {
        amount: Math.round(amount * 100),
        currency: "INR",
        receipt: "order_rcptid_" + Date.now(),
    };

    // this is razorpay order object, not our order model object
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

    return { order, newOrder };
};


// ---------------- VERIFY RAZORPAY PAYMENT ----------------
export const verifyPaymentService = async (
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId
) => {

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        throw new Error("Payment verification failed");
    }

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
    await User.findByIdAndUpdate(updatedOrder.userId, {
        cart: []
    });

    return updatedOrder;
};


// ---------------- FETCH USER ORDERS ----------------
export const getAllOrderService = async (userId) => {

    const orders = await Order.find({ userId })
        .populate("items.productId");

    if (!orders) {
        throw new Error("No order found");
    }

    return orders;
};


// ---------------- ADMIN ORDERS ----------------
export const getAllOrderAdminService = async () => {

    const adminOrders = await Order.find({})
        .populate("items.productId");

    if (!adminOrders) {
        throw new Error("Internal server error");
    }

    return adminOrders;
};


// ---------------- UPDATE ORDER STATUS ----------------
export const updateStatusService = async (
    orderId,
    status
) => {

    await Order.findByIdAndUpdate(orderId, {
        status
    });

    return;
};