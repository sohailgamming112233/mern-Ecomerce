import express from "express";

import {
    createOrder,
    getOrder,
    getUserOrders
} from "../controllers/orderController.js";

const router = express.Router();

router.post("/create", createOrder);

router.get("/user/:userId", getUserOrders);

router.get("/:id", getOrder);

export default router;