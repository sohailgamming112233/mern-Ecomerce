import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

const AddProduct = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        category: "",
        image: "",
        stock: "",
    });

    const [msg, setMsg] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMsg("");
        setLoading(true);

        try {
            const response = await api.post("/products/add", {
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                category: formData.category,
                image: formData.image,
                stock: Number(formData.stock),
            });

            setMsg(
                response.data.message ||
                "Product added successfully"
            );

            setFormData({
                title: "",
                description: "",
                price: "",
                category: "",
                image: "",
                stock: "",
            });

            setTimeout(() => {
                navigate("/admin/products");
            }, 1000);
        } catch (error) {
            console.error("ADD PRODUCT ERROR:", error);
            console.error("STATUS:", error.response?.status);
            console.error("SERVER:", error.response?.data);

            setMsg(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 px-4 py-10">
            <div className="mx-auto max-w-2xl rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">

                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Add Product
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Add a new product to your store
                    </p>
                </div>

                {msg && (
                    <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600">
                        {msg}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Title
                        </label>

                        <input
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter product title"
                            required
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Description
                        </label>

                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter product description"
                            rows="4"
                            required
                            className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Price
                            </label>

                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="Enter price"
                                min="0"
                                required
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-gray-700">
                                Stock
                            </label>

                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="Enter stock"
                                min="0"
                                required
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Category
                        </label>

                        <input
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            placeholder="Enter category"
                            required
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Image URL
                        </label>

                        <input
                            type="url"
                            name="image"
                            value={formData.image}
                            onChange={handleChange}
                            placeholder="Enter image URL"
                            required
                            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">

                        <button
                            type="button"
                            onClick={() => navigate("/admin/products")}
                            className="w-1/3 rounded-xl border border-gray-300 py-3.5 font-semibold text-gray-700 transition hover:bg-gray-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-2/3 rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {loading ? "Adding..." : "Add Product"}
                        </button>

                    </div>

                </form>
            </div>
        </div>
    );
};

export default AddProduct;