import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api/axios";

export default function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [msg, setMsg] = useState("");

    const loadProducts = async () => {
        try {
            setLoading(true);
            setMsg("");

            const response = await api.get("/products");

            console.log("PRODUCT RESPONSE:", response.data);

            const productData = Array.isArray(response.data)
                ? response.data
                : response.data.products || [];

            setProducts(productData);
        } catch (error) {
            console.error("GET PRODUCTS ERROR:", error);

            setMsg(
                error.response?.data?.message ||
                "Failed to load products"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadProducts();
    }, []);

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            setDeleteLoading(id);
            setMsg("");

            console.log("Deleting product:", id);

            const response = await api.delete(`/products/${id}`);

            console.log("DELETE RESPONSE:", response.data);

            setProducts((prevProducts) =>
                prevProducts.filter(
                    (product) => product._id !== id
                )
            );

            setMsg(
                response.data?.message ||
                "Product deleted successfully"
            );
        } catch (error) {
            console.error("DELETE PRODUCT ERROR:", error);

            setMsg(
                error.response?.data?.message ||
                "Failed to delete product"
            );
        } finally {
            setDeleteLoading(null);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-10">
            <div className="mx-auto max-w-5xl">

                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Product List
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage your store products
                        </p>
                    </div>

                    <Link
                        to="/admin/products/add"
                        className="rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                    >
                        + Add New Product
                    </Link>
                </div>

                {msg && (
                    <div className="mb-6 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-600">
                        {msg}
                    </div>
                )}

                {loading ? (
                    <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
                        <p className="text-gray-500">
                            Loading products...
                        </p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white py-16 text-center shadow-sm">
                        <h2 className="text-xl font-semibold text-gray-800">
                            No Products Found
                        </h2>

                        <p className="mt-2 text-sm text-gray-500">
                            Add your first product to the store.
                        </p>

                        <Link
                            to="/admin/products/add"
                            className="mt-5 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                        >
                            Add Product
                        </Link>
                    </div>
                ) : (
                    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">

                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="bg-gray-100">

                                        <th className="border-b border-gray-200 px-6 py-4 text-left text-sm font-semibold text-gray-800">
                                            Product
                                        </th>

                                        <th className="border-b border-gray-200 px-6 py-4 text-left text-sm font-semibold text-gray-800">
                                            Category
                                        </th>

                                        <th className="border-b border-gray-200 px-6 py-4 text-left text-sm font-semibold text-gray-800">
                                            Price
                                        </th>

                                        <th className="border-b border-gray-200 px-6 py-4 text-left text-sm font-semibold text-gray-800">
                                            Stock
                                        </th>

                                        <th className="border-b border-gray-200 px-6 py-4 text-center text-sm font-semibold text-gray-800">
                                            Actions
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {products.map((product) => (
                                        <tr
                                            key={product._id}
                                            className="transition hover:bg-gray-50"
                                        >

                                            <td className="border-b border-gray-200 px-6 py-4">
                                                <div className="flex items-center gap-4">
                                                    <div>
                                                        <p className="font-semibold text-gray-900">
                                                            {product.title}
                                                        </p>

                                                        <p className="mt-1 max-w-xs truncate text-xs text-gray-500">
                                                            {product.description}
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            <td className="border-b border-gray-200 px-6 py-4">
                                                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-600">
                                                    {product.category}
                                                </span>
                                            </td>

                                            <td className="border-b border-gray-200 px-6 py-4 font-semibold text-gray-900">
                                                ${product.price}
                                            </td>

                                            <td className="border-b border-gray-200 px-6 py-4">
                                                <span
                                                    className={
                                                        product.stock > 0
                                                            ? "rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-600"
                                                            : "rounded-full bg-red-50 px-3 py-1 text-xs font-medium text-red-600"
                                                    }
                                                >
                                                    {product.stock}
                                                </span>
                                            </td>

                                            <td className="border-b border-gray-200 px-6 py-4">
                                                <div className="flex items-center justify-center gap-4">

                                                    <Link
                                                        to={`/admin/products/edit/${product._id}`}
                                                        className="text-sm font-medium text-blue-600 hover:text-blue-800"
                                                    >
                                                        Edit
                                                    </Link>

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(product._id)
                                                        }
                                                        disabled={
                                                            deleteLoading ===
                                                            product._id
                                                        }
                                                        className="text-sm font-medium text-red-600 hover:text-red-800 disabled:cursor-not-allowed disabled:opacity-50"
                                                    >
                                                        {deleteLoading ===
                                                            product._id
                                                            ? "Deleting..."
                                                            : "Delete"}
                                                    </button>

                                                </div>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}