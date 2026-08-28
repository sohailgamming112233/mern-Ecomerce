import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gray-950 text-gray-300 mt-12">

            <div className="max-w-7xl mx-auto px-6 py-12">

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

                    <div>
                        <h2 className="text-2xl font-bold text-white">
                            SohailStore
                        </h2>

                        <p className="mt-4 text-sm text-gray-400 leading-6">
                            Your trusted online store for mobiles,
                            tablets and the latest technology.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Quick Links
                        </h3>

                        <div className="flex flex-col gap-3 text-sm">
                            <a href="/" className="hover:text-white transition">
                                Home
                            </a>

                            <a href="/cart" className="hover:text-white transition">
                                Cart
                            </a>

                            <a href="/login" className="hover:text-white transition">
                                Login
                            </a>

                            <a href="/signup" className="hover:text-white transition">
                                Signup
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Customer Service
                        </h3>

                        <div className="flex flex-col gap-3 text-sm">
                            <p>Contact Us</p>
                            <p>Shipping Information</p>
                            <p>Return Policy</p>
                            <p>Privacy Policy</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            Contact Us
                        </h3>

                        <div className="flex flex-col gap-3 text-sm text-gray-400">
                            <p> Pakistan</p>
                            <p> +92 300 1234567</p>
                            <p> support@sohailstore.com</p>
                        </div>
                    </div>

                </div>

                <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">

                    <p className="text-sm text-gray-500">
                        © 2026 SohailStore. All rights reserved.
                    </p>

                    <div className="flex gap-5 text-sm">
                        <a
                            href="#"
                            className="hover:text-white transition"
                        >
                            Facebook
                        </a>

                        <a
                            href="#"
                            className="hover:text-white transition"
                        >
                            Instagram
                        </a>

                        <a
                            href="#"
                            className="hover:text-white transition"
                        >
                            YouTube
                        </a>
                    </div>

                </div>

            </div>

        </footer>
    );
};

export default Footer;