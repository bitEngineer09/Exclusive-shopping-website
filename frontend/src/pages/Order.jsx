import React, { useContext, useState, useEffect } from "react";
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
  
  const [method, setMethod] = useState("");
  const [finalPrice, setFinalPrice] = useState(totalPrice + (totalPrice || 0) * 0.02);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Razorpay script load karein
  useEffect(() => {
    const loadRazorpay = () => {
      return new Promise((resolve) => {
        if (window.Razorpay) {
          setRazorpayLoaded(true);
          resolve(true);
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        script.onload = () => {
          setRazorpayLoaded(true);
          resolve(true);
        };
        script.onerror = () => {
          console.error('Razorpay script loading failed');
          resolve(false);
        };
        document.body.appendChild(script);
      });
    };

    loadRazorpay();
  }, []);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'street', 'city', 'state', 'pincode', 'country', 'phone'];
    
    for (let field of requiredFields) {
      if (!formData[field]?.trim()) {
        alert(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
        return false;
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return false;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      alert("Please enter a valid 10-digit phone number");
      return false;
    }

    return true;
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!method) {
      alert("Please select a payment method!");
      setLoading(false);
      return;
    }

    if (!cartItems || cartItems.length === 0) {
      alert("No items in cart!");
      setLoading(false);
      return;
    }

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    const itemsToSend = cartItems.map((item) => ({
      productId: item.productId._id || item.productId,
      quantity: item.quantity,
      sizes: item.sizes,
      price: item.price !== undefined ? item.price : (item.productId?.price || 0),
    }));

    try {
      if (method === "Razorpay") {
        if (!razorpayLoaded) {
          alert("Payment gateway is loading. Please wait...");
          setLoading(false);
          return;
        }

        // Environment variable se key lein
        const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

        const { data } = await axios.post(
          `${serverUrl}/api/order/razorpay`,
          {
            items: itemsToSend,
            amount: Math.round(finalPrice * 100), // Paise mein convert
            address: formData,
          },
          { withCredentials: true }
        );

        if (data.success) {
          const options = {
            key: razorpayKey,
            amount: data.order.amount,
            currency: data.order.currency || "INR",
            name: "Exclusive Store",
            description: "Thank you for your order",
            order_id: data.order.id,
            handler: async (response) => {
              try {
                await axios.post(
                  `${serverUrl}/api/order/verify`,
                  {
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                    orderId: data.dbOrderId,
                  },
                  { withCredentials: true }
                );
                alert("Payment successful!");
                navigate("/order-success", { 
                  state: { 
                    orderId: data.dbOrderId,
                    paymentId: response.razorpay_payment_id 
                  } 
                });
              } catch (error) {
                console.error("Payment verification failed:", error);
                alert("Payment verification failed. Please contact support.");
              }
            },
            prefill: {
              name: `${formData.firstName} ${formData.lastName}`,
              email: formData.email,
              contact: formData.phone,
            },
            theme: {
              color: "#EC407A"
            },
            modal: {
              ondismiss: function() {
                alert("Payment cancelled");
                setLoading(false);
              }
            }
          };

          const rzp = new window.Razorpay(options);
          rzp.open();
        }
      } else {
        // COD flow
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
          navigate("/order-success", { 
            state: { 
              orderId: response.orderId 
            } 
          });
        } else {
          alert("Error placing order: " + (response.message || "Unknown error"));
        }
      }
    } catch (error) {
      console.error("Order error:", error);
      alert(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[--bg-color]">
      <PrimaryNavbar />
      
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg flex items-center gap-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            <span className="text-gray-700">Processing your order...</span>
          </div>
        </div>
      )}

      <div className="w-full text-white max-w-[1920px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-50 pb-6 sm:pb-8 md:pb-10 lg:pb-12 xl:pb-16 mt-6">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:gap-10 lg:gap-12 xl:gap-16 items-start">
          
          <div className="w-full order-2 lg:order-1">
            <DeliveryInfo
              onChangeHandler={onChangeHandler}
              {...formData}
            />
          </div>

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
                loading={loading}
                razorpayLoaded={razorpayLoaded}
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