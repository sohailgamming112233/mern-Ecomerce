import mongoose from "mongoose";
import Order from "../models/order.js";
import Cart from "../models/cart.js";

export const createOrder = async (req, res) => {
    try {
        const { userId, address } = req.body;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId"
            });
        }

        if (!address) {
            return res.status(400).json({
                success: false,
                message: "Delivery address is required"
            });
        }

        const cart = await Cart.findOne({ userId })
            .populate("items.productId");

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const validItems = cart.items.filter(
            (item) => item.productId
        );

        if (validItems.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No valid products found in cart"
            });
        }

        const items = validItems.map((item) => ({
            productId: item.productId._id,
            title: item.productId.title,
            image: item.productId.image,
            price: Number(item.productId.price),
            quantity: Number(item.quantity)
        }));

        const totalItems = items.reduce(
            (total, item) => total + item.quantity,
            0
        );

        const totalPrice = items.reduce(
            (total, item) =>
                total + item.price * item.quantity,
            0
        );

        const order = await Order.create({
            userId,
            items,
            totalItems,
            totalPrice,
            address: {
                fullName: address.fullName,
                phone: address.phone,
                address: address.address,
                city: address.city,
                postalCode: address.postalCode
            },
            paymentMethod: "Cash on Delivery"
        });

        cart.items = [];
        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error("Create Order Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId"
            });
        }

        const orders = await Order.find({ userId })
            .populate("items.productId")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error("Get Orders Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order id"
            });
        }

        const order = await Order.findById(id)
            .populate("userId", "name email")
            .populate("items.productId");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Get Order Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};