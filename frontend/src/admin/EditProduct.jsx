import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../api/axios";

const EditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: ""
    });

    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        const loadProduct = async () => {
            try {
                const response = await api.get(`/products/${id}`);

                const product = response.data.product || response.data;

                setFormData({
                    title: product.title || "",
                    description: product.description || "",
                    price: product.price ?? "",
                    category: product.category || "",
                    image: product.image || "",
                    stock: product.stock ?? ""
                });

            } catch (error) {
                console.error(error);

                setMsg(
                    error.response?.data?.message ||
                    "Failed to load product"
                );
            } finally {
                setLoading(false);
            }
        };

        loadProduct();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMsg("");
        setUpdating(true);

        try {
            const response = await api.put(
                `/products/update/${id}`,
                {
                    title: formData.title,
                    description: formData.description,
                    price: Number(formData.price),
                    category: formData.category,
                    image: formData.image,
                    stock: Number(formData.stock)
                }
            );

            setMsg(
                response.data.message ||
                "Product updated successfully"
            );

            setTimeout(() => {
                navigate("/admin/products");
            }, 1000);

        } catch (error) {
            console.error("UPDATE ERROR:", error);

            setMsg(
                error.response?.data?.message ||
                "Failed to update product"
            );
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">
                    Loading product...
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">

            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl border border-gray-100 p-8">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Edit Product
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Update your product information
                    </p>
                </div>

                {msg && (
                    <div className="mb-6 rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-blue-600 text-sm font-medium">
                        {msg}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Product Title
                        </label>

                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="4"
                            required
                            className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                required
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                min="0"
                                required
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category
                        </label>

                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Image URL
                        </label>

                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            required
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">

                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="w-1/3 rounded-xl border border-gray-300 py-3.5 font-semibold text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={updating}
                            className="w-2/3 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg hover:bg-blue-700 disabled:opacity-50"
                        >
                            {updating ? "Updating..." : "Update Product"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default EditProduct;