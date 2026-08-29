import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../api/axios.js";

const Checkout = () => {
    const navigate = useNavigate();

    const [cart, setCart] = useState({ items: [] });
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");

    useEffect(() => {
        const loadCheckout = async () => {
            if (!userId) {
                navigate("/login");
                return;
            }

            try {
                const cartResponse = await api.get(`/cart/${userId}`);
                const addressResponse = await api.get(`/address/${userId}`);

                console.log("Cart Response:", cartResponse.data);
                console.log("Address Response:", addressResponse.data);

                setCart(cartResponse.data?.cart || { items: [] });

                const addressData =
                    addressResponse.data?.address ||
                    addressResponse.data?.addresses?.[0] ||
                    null;

                setAddress(addressData);
            } catch (error) {
                console.log("Checkout Error:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCheckout();
    }, [userId, navigate]);

    const items = cart?.items || [];

    const totalItems = items.reduce(
        (total, item) => {
            return total + Number(item?.quantity || 0);
        },
        0
    );

    const totalPrice = items.reduce(
        (total, item) => {
            const price = Number(item?.productId?.price || 0);
            const quantity = Number(item?.quantity || 0);

            return total + price * quantity;
        },
        0
    );
    const placeOrder = async () => {
        if (!address) {
            alert("Please add delivery address first");
            return;
        }

        if (items.length === 0) {
            alert("Your cart is empty");
            return;
        }

        try {
            const response = await api.post("/orders/create", {
                userId,
                address
            });

            console.log("Order Response:", response.data);

            if (response.data.success) {
                navigate(`/order-success/${response.data.order._id}`);
            }
        } catch (error) {
            console.log("Place Order Error:", error);
            console.log("Server Error:", error.response?.data);

            alert(
                error.response?.data?.message ||
                "Order place nahi hua"
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-xl">Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">

            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6">

                <div className="bg-white p-6 rounded-xl shadow">

                    <h2 className="text-2xl font-bold mb-4">
                        Delivery Address
                    </h2>

                    {address ? (
                        <div className="border p-4 rounded-lg">

                            <p className="font-semibold">
                                {address.fullName}
                            </p>

                            <p>
                                {address.phone}
                            </p>

                            <p>
                                {address.address}
                            </p>

                            <p>
                                {address.city}, {address.postalCode}
                            </p>

                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/checkout/address")}
                            className="bg-black text-white px-5 py-3 rounded-lg"
                        >
                            Add Address
                        </button>
                    )}

                    <h2 className="text-2xl font-bold mt-8 mb-4">
                        Order Items
                    </h2>

                    {items.length === 0 ? (
                        <p className="text-gray-500">
                            Your cart is empty.
                        </p>
                    ) : (
                        items.map((item, index) => {

                            const price = Number(
                                item?.productId?.price || 0
                            );

                            const quantity = Number(
                                item?.quantity || 0
                            );

                            return (
                                <div
                                    key={item?.productId?._id || index}
                                    className="flex justify-between border-b py-3"
                                >

                                    <div>

                                        <p className="font-semibold">
                                            {item?.productId?.title || "Product"}
                                        </p>

                                        <p className="text-gray-500">
                                            Quantity: {quantity}
                                        </p>

                                    </div>

                                    <p className="font-semibold">
                                        Rs. {price * quantity}
                                    </p>

                                </div>
                            );
                        })
                    )}

                </div>

                <div className="bg-white p-6 rounded-xl shadow h-fit">

                    <h2 className="text-2xl font-bold mb-6">
                        Order Summary
                    </h2>

                    <div className="flex justify-between mb-3">
                        <span>Total Items</span>
                        <span>{totalItems}</span>
                    </div>

                    <div className="flex justify-between mb-3">
                        <span>Subtotal</span>
                        <span>Rs. {totalPrice}</span>
                    </div>

                    <div className="flex justify-between mb-3">
                        <span>Delivery</span>

                        <span className="text-green-600">
                            Free
                        </span>
                    </div>

                    <hr className="my-4" />

                    <div className="flex justify-between text-xl font-bold">
                        <span>Total</span>

                        <span>
                            Rs. {totalPrice}
                        </span>
                    </div>

                    <button
                        onClick={placeOrder}
                        disabled={items.length === 0}
                        className="w-full mt-6 bg-black text-white py-3 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        Place Order
                    </button>

                </div>

            </div>

        </div>
    );
};

export default Checkout;