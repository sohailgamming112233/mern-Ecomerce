import Product from "../models/product.js";

export const createProduct = async (req, res) => {
    try {
        const product = await Product.create(req.body);

        res.status(201).json({
            message: "Product created successfully",
            product,
        });

    } catch (error) {
        console.error("Create Product Error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            product
        });

    } catch (error) {
        console.error("Get Single Product Error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get All Products
export const getProduct = async (req, res) => {
    try {
        const { search, category } = req.query;

        let filter = {};

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        if (category) {
            filter.category = {
                $regex: `^${category}$`,
                $options: "i"
            };
        }

        const products = await Product.find(filter).sort({
            createdAt: -1
        });

        res.json(products);

    } catch (error) {
        console.error("Get Products Error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};
// Update Product

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        if (!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json({
            message: "Product updated successfully",
            product,
        });

    } catch (error) {
        console.error("Update Product Error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};


// Delete Product

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findByIdAndDelete(id);

        res.json({
            message: "Product deleted successfully",
            product,
        });

    } catch (error) {
        console.error("Delete Product Error:", error);

        res.status(500).json({
            message: "Server Error",
            error: error.message,
        });
    }
};