import React, { useContext, useState } from "react";
import PrimaryNavbar from "../components/nav/PrimaryNavbar";
import DeliveryInfo from "../components/OrderPage/DeliveryInfo";
import CartTotals from "../components/OrderPage/CartTotals";
import { useLocation, useNavigate } from "react-router-dom";
import { orderDataContext } from "../store/OrderContext";
import axios from "axios";
import { serverUrl } from "../config/serverUrl";
import FooterSecondary from '../components/Footer/FooterSecondary';

const Order = () => {
  const location = useLocation();
  const { cartItems, totalPrice, totalQuantity } = location.state || {};
  const navigate = useNavigate();
  console.log(cartItems)

  const [method, setMethod] = useState("");
  const [finalPrice, setFinalPrice] = useState(totalPrice + totalPrice * 0.02);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    phone: "",
  });

  const { order } = useContext(orderDataContext);

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!method) {
      alert("Please select a payment method!");
      return;
    }
    if (!cartItems || cartItems.length === 0) {
      alert("No items in cart!");
      return;
    }

    const itemsToSend = cartItems.map((item) => ({
      productId: item.productId._id || item.productId,
      quantity: item.quantity,
      sizes: item.sizes,
      price:
        item.price !== undefined
          ? item.price
          : item.productId && item.productId.price,
    }));

    if (method === "Razorpay") {
      try {
        // Create Razorpay order in backend
        const { data } = await axios.post(
          `${serverUrl}/api/order/razorpay`,
          {
            items: itemsToSend,
            amount: finalPrice,
            address: formData,
          },
          { withCredentials: true }
        );

        if (data.success) {
          const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: data.order.amount,
            currency: data.order.currency,
            name: "My Shop",
            description: "Payment for order",
            order_id: data.order.id,
            handler: async (response) => {
              try {
                // Send MongoDB order ID for verification
                await axios.post(
                  `${serverUrl}/api/order/verify`,
                  {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId: data.dbOrderId, // <--- important fix
                  },
                  { withCredentials: true }
                );
                alert("Payment successful!");
                navigate("/order-success");
              } catch (error) {
                console.error(error);
                alert("Payment verification failed");
              }
            },
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      } catch (error) {
        console.error(error);
        alert("Error while processing Razorpay payment");
      }
    } else {
      // COD flow
      try {
        const orderData = {
          address: formData,
          items: itemsToSend,
          amount: finalPrice,
          paymentMethod: "COD",
          payment: false,
          date: new Date().toISOString(),
        };

        const response = await order(orderData);
        if (response.success) {
          alert("Order placed successfully!");
          navigate("/order-success");
        } else {
          alert("Error placing order: " + response.message);
        }
      } catch (error) {
        console.error("Error placing COD order:", error);
        alert("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-[--bg-color]">
  <PrimaryNavbar />
  
  {/* Main Checkout Container */}
  <div className="w-full text-white max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-50 pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-16 mt-6">
    
    {/* Two Column Grid Layout */}
    <div className="grid grid-cols-1  gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-start">
      
      {/* Left Column - Delivery Information */}
      <div className="w-full order-2 lg:order-1">
        <DeliveryInfo
          onChangeHandler={onChangeHandler}
          firstName={formData.firstName}
          lastName={formData.lastName}
          email={formData.email}
          street={formData.street}
          city={formData.city}
          state={formData.state}
          pincode={formData.pincode}
          country={formData.country}
          phone={formData.phone}
        />
      </div>

      {/* Right Column - Cart Totals (Sticky on Desktop) */}
      <div className="w-full order-1 lg:order-2">
        <div className="lg:sticky lg:top-24 xl:top-28">
          <CartTotals
            method={method}
            setMethod={setMethod}
            onSubmitHandler={onSubmitHandler}
            cartItems={cartItems}
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            setFinalPrice={setFinalPrice}
          />
        </div>
      </div>
    </div>

  </div>
    <FooterSecondary />
</div>
  );
};

export default Order;
