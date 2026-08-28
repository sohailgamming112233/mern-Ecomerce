import mongoose from "mongoose";
import Cart from "../models/cart.js";

export const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "userId and productId are required"
            });
        }

        if (
            !mongoose.Types.ObjectId.isValid(userId) ||
            !mongoose.Types.ObjectId.isValid(productId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId or productId"
            });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            cart = new Cart({
                userId,
                items: [
                    {
                        productId,
                        quantity: 1
                    }
                ]
            });
        } else {
            const item = cart.items.find(
                (item) =>
                    item.productId.toString() === productId.toString()
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({
                    productId,
                    quantity: 1
                });
            }
        }

        await cart.save();

        const updatedCart = await Cart.findById(cart._id)
            .populate("items.productId");

        return res.status(200).json({
            success: true,
            message: "Item added to cart",
            cart: updatedCart
        });

    } catch (error) {
        console.error("Add To Cart Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export const removeItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "userId and productId are required"
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        cart.items = cart.items.filter(
            (item) =>
                item.productId.toString() !== productId.toString()
        );

        await cart.save();

        const updatedCart = await Cart.findById(cart._id)
            .populate("items.productId");

        return res.status(200).json({
            success: true,
            message: "Item removed from cart",
            cart: updatedCart
        });

    } catch (error) {
        console.error("Remove Cart Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        if (!userId || !productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "userId, productId and quantity are required"
            });
        }

        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const item = cart.items.find(
            (item) =>
                item.productId.toString() === productId.toString()
        );

        if (!item) {
            return res.status(404).json({
                success: false,
                message: "Item not found in cart"
            });
        }

        if (Number(quantity) <= 0) {
            cart.items = cart.items.filter(
                (item) =>
                    item.productId.toString() !== productId.toString()
            );
        } else {
            item.quantity = Number(quantity);
        }

        await cart.save();

        const updatedCart = await Cart.findById(cart._id)
            .populate("items.productId");

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cart: updatedCart
        });

    } catch (error) {
        console.error("Update Cart Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};

export const getCart = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "userId is required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId"
            });
        }

        const cart = await Cart.findOne({ userId })
            .populate("items.productId");

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: {
                    userId,
                    items: []
                }
            });
        }

        return res.status(200).json({
            success: true,
            cart
        });

    } catch (error) {
        console.error("Get Cart Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};