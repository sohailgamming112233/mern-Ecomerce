import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api/axios";

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);

    const userId = localStorage.getItem("userId");

    const loadCart = async () => {
        if (!userId) {
            setCartCount(0);
            return;
        }

        try {
            const res = await api.get(`/cart/${userId}`);

            const items = res.data.cart?.items || [];

            const total = items.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            setCartCount(total);

        } catch (error) {
            console.error(
                "Navbar Cart Error:",
                error.response?.data || error.message
            );

            setCartCount(0);
        }
    };

    useEffect(() => {
        loadCart();

        window.addEventListener(
            "cartUpdated",
            loadCart
        );

        return () => {
            window.removeEventListener(
                "cartUpdated",
                loadCart
            );
        };
    }, [userId]);

    const logout = () => {
        localStorage.clear();

        setCartCount(0);

        window.location.href = "/login";
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">

            <div className="max-w-7xl mx-auto px-4">

                <div className="h-16 flex items-center justify-between">

                    <Link
                        to="/"
                        className="text-2xl font-bold text-blue-600"
                    >
                        SohailStore
                    </Link>

                    <div className="flex items-center gap-6">

                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Home
                        </Link>
                        <Link
                            to="/admin/products"
                            className="text-gray-700 hover:text-blue-600 font-medium"
                        >
                            Admin
                        </Link>

                        {!userId ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600 font-medium"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold"
                                >
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={logout}
                                className="text-red-600 font-medium"
                            >
                                Logout
                            </button>
                        )}

                        <Link
                            to="/cart"
                            className="relative text-gray-700 font-medium"
                        >
                             Cart

                            {cartCount > 0 && (
                                <span className="absolute -top-3 -right-4 bg-red-500 text-white text-xs font-bold min-w-5 h-5 px-1 rounded-full flex items-center justify-center">
                                    {cartCount}
                                </span>
                            )}
                        </Link>

                    </div>

                </div>

            </div>

        </nav>
    );
};

export default Navbar;