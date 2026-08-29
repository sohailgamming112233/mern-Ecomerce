import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../api/axios";

const Navbar = () => {
    const [cartCount, setCartCount] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

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

        window.addEventListener("cartUpdated", loadCart);

        return () => {
            window.removeEventListener("cartUpdated", loadCart);
        };
    }, [userId]);

    const logout = () => {
        localStorage.clear();
        setCartCount(0);
        window.location.href = "/login";
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <nav className="bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="text-2xl font-bold text-blue-600"
                    >
                        SohailStore
                    </Link>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-700 text-2xl focus:outline-none"
                    >
                        {menuOpen ? "✕" : "☰"}
                    </button>

                    <div className="hidden md:flex items-center gap-6">

                        <Link
                            to="/"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Home
                        </Link>

                        <Link
                            to="/admin/products"
                            className="text-gray-700 hover:text-blue-600 font-medium transition"
                        >
                            Admin
                        </Link>

                        {!userId ? (
                            <>
                                <Link
                                    to="/login"
                                    className="text-gray-700 hover:text-blue-600 font-medium transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/signup"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
                                >
                                    Signup
                                </Link>
                            </>
                        ) : (
                            <button
                                onClick={logout}
                                className="text-red-600 hover:text-red-700 font-medium"
                            >
                                Logout
                            </button>
                        )}

                        <Link
                            to="/cart"
                            className="relative text-gray-700 hover:text-blue-600 font-medium"
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

                {menuOpen && (
                    <div className="md:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col gap-4">

                            <Link
                                to="/"
                                onClick={closeMenu}
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Home
                            </Link>

                            <Link
                                to="/admin/products"
                                onClick={closeMenu}
                                className="text-gray-700 hover:text-blue-600 font-medium"
                            >
                                Admin
                            </Link>

                            {!userId ? (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={closeMenu}
                                        className="text-gray-700 hover:text-blue-600 font-medium"
                                    >
                                        Login
                                    </Link>

                                    <Link
                                        to="/signup"
                                        onClick={closeMenu}
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold text-center"
                                    >
                                        Signup
                                    </Link>
                                </>
                            ) : (
                                <button
                                    onClick={() => {
                                        logout();
                                        closeMenu();
                                    }}
                                    className="text-red-600 hover:text-red-700 font-medium text-left"
                                >
                                    Logout
                                </button>
                            )}

                            <Link
                                to="/cart"
                                onClick={closeMenu}
                                className="relative text-gray-700 hover:text-blue-600 font-medium w-fit"
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
                )}

            </div>
        </nav>
    );
};

export default Navbar;