import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api/axios";

const Cart = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const userId = localStorage.getItem("userId");

    const loadCart = async () => {
        try {
            if (!userId) {
                setCart({ items: [] });
                return;
            }

            const response = await api.get(`/cart/${userId}`);

            setCart(response.data.cart);
        } catch (error) {
            console.error(
                "Cart Error:",
                error.response?.data || error.message
            );

            setCart({ items: [] });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCart();
    }, []);

    const updateQuantity = async (productId, quantity) => {
        if (quantity < 1) {
            return;
        }

        try {
            const response = await api.put("/cart/update", {
                userId,
                productId,
                quantity
            });

            setCart(response.data.cart);

            window.dispatchEvent(
                new Event("cartUpdated")
            );
        } catch (error) {
            console.error(
                "Update Cart Error:",
                error.response?.data || error.message
            );
        }
    };

    const removeItem = async (productId) => {
        try {
            const response = await api.delete("/cart/remove", {
                data: {
                    userId,
                    productId
                }
            });

            setCart(response.data.cart);

            window.dispatchEvent(
                new Event("cartUpdated")
            );
        } catch (error) {
            console.error(
                "Remove Cart Error:",
                error.response?.data || error.message
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="text-center">

                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>

                    <p className="mt-4 text-gray-500 font-medium">
                        Loading cart...
                    </p>

                </div>
            </div>
        );
    }

    if (!userId) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

                <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-sm p-8 text-center">

                    <div className="w-20 h-20 mx-auto bg-blue-50 rounded-full flex items-center justify-center text-4xl">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJJJvwHwJQJSoQuqODTGpBKwsR9Xq-Pp4ihud9B-CW0w&s=10" alt="" />
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mt-5">
                        Please Login First
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Login to view your shopping cart.
                    </p>

                    <Link
                        to="/login"
                        className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition"
                    >
                        Login
                    </Link>

                </div>

            </div>
        );
    }

    if (!cart || !cart.items || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">

                <div className="bg-white w-full max-w-md rounded-2xl border border-gray-200 shadow-sm p-8 text-center">

                    <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center text-5xl">
                        🛒
                    </div>

                    <h1 className="text-2xl font-bold text-gray-800 mt-6">
                        Your Cart is Empty
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Looks like you haven't added anything to your cart yet.
                    </p>

                    <Link
                        to="/"
                        className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 text-white px-7 py-3 rounded-xl font-semibold transition"
                    >
                        Continue Shopping
                    </Link>

                </div>

            </div>
        );
    }

    const totalItems = cart.items.reduce(
        (total, item) => total + item.quantity,
        0
    );

    const totalPrice = cart.items.reduce(
        (total, item) =>
            total +
            item.productId.price * item.quantity,
        0
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8 sm:py-12 px-4">

            <div className="max-w-6xl mx-auto">

                <div className="mb-8">

                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                        Shopping Cart
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Review your items before checkout.
                    </p>

                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2 space-y-4">

                        {cart.items.map((item) => (

                            <div
                                key={item.productId._id}
                                className="bg-white rounded-2xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
                            >

                                <div className="flex flex-col sm:flex-row gap-5">

                                    <img
                                        src={item.productId.image}
                                        alt={item.productId.title}
                                        className="w-full sm:w-32 h-48 sm:h-32 object-cover rounded-xl bg-gray-100"
                                    />

                                    <div className="flex-1">

                                        <div className="flex justify-between gap-4">

                                            <div>

                                                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                                                    {item.productId.title}
                                                </h2>

                                                <p className="text-blue-600 font-bold text-lg mt-2">
                                                    Rs. {item.productId.price}
                                                </p>

                                            </div>

                                            <p className="text-lg font-bold text-gray-800 whitespace-nowrap">
                                                Rs.{" "}
                                                {item.productId.price *
                                                    item.quantity}
                                            </p>

                                        </div>

                                        <div className="flex items-center justify-between mt-6">

                                            <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.productId._id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    disabled={
                                                        item.quantity <= 1
                                                    }
                                                    className="w-10 h-10 bg-gray-50 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed font-bold text-lg transition"
                                                >
                                                    −
                                                </button>

                                                <span className="w-12 h-10 flex items-center justify-center font-bold text-gray-800 border-x border-gray-200">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.productId._id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="w-10 h-10 bg-gray-50 hover:bg-gray-100 font-bold text-lg transition"
                                                >
                                                    +
                                                </button>

                                            </div>

                                            <button
                                                onClick={() =>
                                                    removeItem(
                                                        item.productId._id
                                                    )
                                                }
                                                className="text-red-500 hover:text-red-600 text-sm font-semibold transition"
                                            >
                                                Remove
                                            </button>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                    <div className="lg:sticky lg:top-6 h-fit">

                        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                            <h2 className="text-xl font-bold text-gray-900">
                                Order Summary
                            </h2>

                            <div className="flex justify-between mt-6 text-gray-600">

                                <span>
                                    Total Items
                                </span>

                                <span className="font-semibold text-gray-900">
                                    {totalItems}
                                </span>

                            </div>

                            <div className="flex justify-between mt-4 text-gray-600">

                                <span>
                                    Subtotal
                                </span>

                                <span className="font-semibold text-gray-900">
                                    Rs. {totalPrice}
                                </span>

                            </div>

                            <div className="flex justify-between mt-4 text-gray-600">

                                <span>
                                    Delivery
                                </span>

                                <span className="font-semibold text-green-600">
                                    Free
                                </span>

                            </div>

                            <div className="border-t border-gray-200 my-6"></div>

                            <div className="flex justify-between items-center">

                                <span className="text-lg font-bold text-gray-900">
                                    Total
                                </span>

                                <span className="text-2xl font-bold text-blue-600">
                                    Rs. {totalPrice}
                                </span>

                            </div>

                            <Link
                                to="/checkout/address"
                                className="block w-full mt-6 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-3.5 rounded-xl font-semibold text-center transition"
                            >
                                Proceed to Checkout
                            </Link>

                            <Link
                                to="/"
                                className="block w-full mt-3 border border-gray-200 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-semibold text-center transition"
                            >
                                Continue Shopping
                            </Link>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Cart;