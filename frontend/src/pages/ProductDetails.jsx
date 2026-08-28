import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api/axios";

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [adding, setAdding] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const res = await api.get("/products");

                const foundProduct = res.data.find(
                    (item) => item._id === id
                );

                setProduct(foundProduct);
            } catch (error) {
                console.error(
                    "Product Error:",
                    error.response?.data || error.message
                );
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleAddToCart = async () => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Please login first");
            navigate("/login");
            return;
        }

        if (!product) {
            return;
        }

        try {
            setAdding(true);

            const res = await api.post("/cart/add", {
                userId: userId,
                productId: product._id
            });

            console.log("Cart Response:", res.data);

            window.dispatchEvent(new Event("cartUpdated"));

            alert("Product added to cart");

        } catch (error) {
            console.error(
                "Add To Cart Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to add product to cart"
            );
        } finally {
            setAdding(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                    Loading...
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">
                    Product not found
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">

            <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden">

                <div className="grid grid-cols-1 md:grid-cols-2">

                    <div className="bg-gray-100 flex items-center justify-center p-8">
                        <img
                            src={product.image}
                            alt={product.title}
                            className="w-full max-w-md h-80 md:h-96 object-contain rounded-xl"
                        />
                    </div>

                    <div className="p-6 md:p-10">

                        <span className="inline-block bg-blue-100 text-blue-600 text-sm font-semibold px-4 py-1.5 rounded-full capitalize">
                            {product.category}
                        </span>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-4">
                            {product.title}
                        </h1>

                        <p className="text-3xl font-bold text-blue-600 mt-5">
                            Rs. {product.price}
                        </p>

                        <p className="text-gray-600 leading-7 mt-5">
                            {product.description}
                        </p>

                        <div className="grid grid-cols-2 gap-4 mt-6">

                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                <p className="text-sm text-gray-500">
                                    Category
                                </p>

                                <p className="font-semibold text-gray-800 capitalize mt-1">
                                    {product.category}
                                </p>
                            </div>

                            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                                <p className="text-sm text-gray-500">
                                    Stock
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {product.stock}
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={handleAddToCart}
                            disabled={adding || product.stock <= 0}
                            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition"
                        >
                            {adding
                                ? "Adding..."
                                : product.stock <= 0
                                    ? "Out of Stock"
                                    : "Add to Cart"}
                        </button>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ProductDetails;