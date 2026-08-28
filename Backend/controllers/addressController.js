import mongoose from "mongoose";
import Address from "../models/address.js";

export const addAddress = async (req, res) => {
    try {
        const {
            userId,
            fullName,
            phone,
            address,
            city,
            postalCode
        } = req.body;

        if (
            !userId ||
            !fullName ||
            !phone ||
            !address ||
            !city ||
            !postalCode
        ) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId"
            });
        }

        const newAddress = await Address.create({
            userId,
            fullName,
            phone,
            address,
            city,
            postalCode
        });

        res.status(201).json({
            success: true,
            message: "Address added successfully",
            address: newAddress
        });

    } catch (error) {
        console.error("Add Address Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};


export const getAddresses = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid userId"
            });
        }

        const addresses = await Address.find({ userId })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            addresses
        });

    } catch (error) {
        console.error("Get Address Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};


export const updateAddress = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            fullName,
            phone,
            address,
            city,
            postalCode
        } = req.body;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id"
            });
        }

        const updatedAddress = await Address.findByIdAndUpdate(
            id,
            {
                fullName,
                phone,
                address,
                city,
                postalCode
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Address updated successfully",
            address: updatedAddress
        });

    } catch (error) {
        console.error("Update Address Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};


export const deleteAddress = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid address id"
            });
        }

        const deletedAddress = await Address.findByIdAndDelete(id);

        if (!deletedAddress) {
            return res.status(404).json({
                success: false,
                message: "Address not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Address deleted successfully"
        });

    } catch (error) {
        console.error("Delete Address Error:", error);

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message
        });
    }
};