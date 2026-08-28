import express from "express";

import {
    updateProduct,
    deleteProduct,
    getProduct,
    getSingleProduct,
    createProduct
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", createProduct);

router.get("/", getProduct);

router.get("/:id", getSingleProduct);

router.put("/update/:id", updateProduct);

router.delete("/:id", deleteProduct);

export default router;