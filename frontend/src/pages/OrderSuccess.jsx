import React from "react";
import { useNavigate, useParams } from "react-router";

const OrderSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
            <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">

                <div className="w-20 h-20 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl font-bold">
                    ✓
                </div>

                <h1 className="text-3xl font-bold mt-6">
                    Order Successfully Placed!
                </h1>

                <p className="text-lg font-semibold mt-3">
                    Order ID: {id}
                </p>

                <p className="text-gray-500 mt-3">
                    Thank you for your order. Your order has been placed successfully.
                </p>

                <button
                    onClick={goHome}
                    className="mt-6 w-full bg-black text-white py-3 rounded-lg"
                >
                    Continue Shopping
                </button>

            </div>
        </div>
    );
};

export default OrderSuccess;
