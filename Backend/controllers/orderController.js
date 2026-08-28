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

        const items = cart.items.map((item) => ({
            productId: item.productId._id,
            title: item.productId.title,
            image: item.productId.image,
            price: item.productId.price,
            quantity: item.quantity
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
            address,
            paymentMethod: "Cash on Delivery"
        });

        cart.items = [];
        await cart.save();

        res.status(201).json({
            success: true,
            message: "Order placed successfully",
            order
        });

    } catch (error) {
        console.error("Create Order Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const { userId } = req.params;

        const orders = await Order.find({ userId })
            .populate("items.productId")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders
        });

    } catch (error) {
        console.error("Get Orders Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getOrder = async (req, res) => {
    try {
        const { id } = req.params;

        const order = await Order.findById(id)
            .populate("userId", "name email")
            .populate("items.productId");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        console.error("Get Order Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};