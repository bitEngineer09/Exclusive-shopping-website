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
export const placeOrder = async (req, res) => {
    try {
        const userId = req?.user?.id;
        if (!userId) return res.status(400).json({ success: false, message: "You are not authenticated" });

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
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: "Order placing error", error });
    }
};

// ---------------- RAZORPAY ORDER ----------------
export const placeOrderRazorpay = async (req, res) => {
    try {
        const { items, amount, address } = req.body;
        const userId = req?.user?.id;

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
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Failed to place Razorpay order" });
    }
};

// ---------------- VERIFY RAZORPAY PAYMENT ----------------
export const verifyPayment = async (req, res) => {
    try {
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
            res.status(400).json({ success: false, message: "Payment verification failed" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Error verifying payment" });
    }
};

// ---------------- FETCH USER ORDERS ----------------
export const getAllOrder = async (req, res) => {
    try {
        if (!req.user) return res.status(400).json({ success: false, message: "You are not authenticated" });

        const { userId } = req.query;
        const orders = await Order.find({ userId }).populate("items.productId");
        if (!orders) return res.status(400).json({ success: false, message: "No order found" });

        return res.status(200).json({ success: true, message: orders });
    } catch (error) {
        console.log(error);
        return res.status(400).json({ success: false, message: error });
    }
};

// ---------------- ADMIN ORDERS ----------------
export const getAllOrderAdmin = async (req, res) => {
    try {
        const adminOrders = await Order.find({}).populate("items.productId");
        if (!adminOrders) return res.status(400).json({ success: false, message: "Internal server error" });

        return res.status(200).json({ success: true, orders: adminOrders });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ success: false, message: error.message });
    }
};

// ---------------- UPDATE ORDER STATUS ----------------
export const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        await Order.findByIdAndUpdate(orderId, { status });
        return res.status(200).json({ success: true, message: "Status updated" });
    } catch (error) {
        console.log(error.message);
        return res.status(400).json({ success: false, message: error.message });
    }
};
