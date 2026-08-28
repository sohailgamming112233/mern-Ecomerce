import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios";

const CheckoutAddress = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        address: "",
        city: "",
        postalCode: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");

        if (!userId) {
            navigate("/login");
            return;
        }

        try {
            setLoading(true);

            const response = await api.post("/address/add", {
                userId,
                ...formData
            });

            console.log("Address saved:", response.data);

            navigate("/checkout");

        } catch (error) {
            console.error(
                "Address Error:",
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                "Failed to save address"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">

            <div className="max-w-2xl mx-auto">

                <button
                    type="button"
                    onClick={() => navigate("/cart")}
                    className="mb-6 text-blue-600 hover:text-blue-700 font-semibold"
                >
                    ← Back to Cart
                </button>

                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

                    <div className="bg-blue-600 px-6 sm:px-8 py-7">

                        <h1 className="text-3xl font-bold text-white">
                            Delivery Address
                        </h1>

                        <p className="text-blue-100 mt-2">
                            Enter your delivery information
                        </p>

                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className="p-6 sm:p-8 space-y-5"
                    >

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Full Name
                            </label>

                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Phone Number
                            </label>

                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="03001234567"
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Complete Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                placeholder="House number, street, area"
                                rows={4}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none resize-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    City
                                </label>

                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Karachi"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Postal Code
                                </label>

                                <input
                                    type="text"
                                    name="postalCode"
                                    value={formData.postalCode}
                                    onChange={handleChange}
                                    placeholder="74000"
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                />
                            </div>

                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3.5 rounded-xl font-semibold transition"
                        >
                            {loading
                                ? "Saving Address..."
                                : "Continue to Checkout"}
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
};

export default CheckoutAddress;