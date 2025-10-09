// src/pages/OrderSuccess.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import FooterSecondary from "../components/Footer/FooterSecondary";

const OrderSuccess = () => {
  const navigate = useNavigate();
  return (
    <div>
    <div className="w-full h-screen flex flex-col items-center justify-center text-white bg-(--bg-color) px-4 sm:px-6 lg:px-8">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-center">
        Order Placed Successfully!
      </h1>
      <p className="mb-4 sm:mb-6 text-sm sm:text-base md:text-lg text-center">
        Thank you for your order.
      </p>
      <button
        className="bg-rose-600 hover:bg-rose-700 cursor-pointer text-white font-medium px-6 sm:px-8 py-2 sm:py-3 rounded text-sm sm:text-base md:text-lg transition-colors duration-200 w-full sm:w-auto max-w-xs"
        onClick={() => navigate("/")}
      >
        Go to Home
      </button>

    </div>
      <FooterSecondary />
      </div>
  );
};

export default OrderSuccess;
