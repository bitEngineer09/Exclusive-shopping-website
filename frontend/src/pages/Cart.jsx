import React, { useContext, useEffect, useState } from 'react';
import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import { cartDataContext } from '../store/CartContext';
import Footer from '../components/Footer/Footer';
import { BsFillBagHeartFill } from "react-icons/bs";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import CartItemsCards from '../components/Cart/CartItemsCards';
import CartRecommendation from '../components/Cart/CartRecommendation';
import ProgressBar from '../components/Cart/ProgressBar';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../store/AuthContext';
import { Ring2 } from 'ldrs/react';
import 'ldrs/react/Ring2.css';

const Cart = () => {

  // USE STATES
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState("");

  const FREE_DELIVERY_THRESHOLD = 500;

  // NAVIGATION
  const navigate = useNavigate();

  // CONTEXT DATA
  const { cartItems, setCartItems, isCartLoading } = useContext(cartDataContext);
  const { loggedinUserData } = useContext(authDataContext);
  // console.log(loggedinUserData);


  // TOTAL PRICE
  useEffect(() => {
    if (cartItems.length > 0) {
      const total = cartItems.reduce((acc, item) => {
        return acc + item?.productId?.price * item?.quantity;
      }, 0);
      setTotalPrice(total);
    } else {
      setTotalPrice(0);
    }
  }, [cartItems]);



  // TOTAL QUANTITY
  useEffect(() => {
    if (cartItems.length > 0) {
      const totalItems = cartItems.reduce((acc, item) => {
        return acc + item.quantity;
      }, 0)
      setTotalQuantity(totalItems);
    } else {
      setTotalQuantity(0);
    }
  }, [cartItems])

  // console.log(cartItems)

  // UPDATE ITEM QUANTITY
  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.productId._id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  };


  return (
    <div className='w-full min-h-screen bg-zinc-950'>
      <PrimaryNavbar />

      {
        isCartLoading
          ? (
            <div className='fixed inset-0 z-50 flex items-center justify-center'>
              <Ring2
                size="45"
                stroke="5"
                strokeLength="0.25"
                bgOpacity="0.2"
                speed="0.8"
                color="red"
              />
            </div>
          )
          : (
            <div>
              {/* BREADCRUMB */}
              <div className='
              w-full
              px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-40
              mt-6 md:mt-8
              '>
                <p className='text-white text-sm md:text-base'>
                  Home / <span className='text-(--color-primary)'>Cart</span>
                </p>
              </div>

              {
                cartItems.length > 0
                  ? (
                    <div className="
                    flex flex-col lg:flex-row 
                    gap-4 md:gap-6 lg:gap-8
                    mt-6 md:mt-8
                    w-full
                    px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-40
                    pb-8 md:pb-12
                    ">

                      {/* LEFT CONTENT - Cart Items */}
                      <div className='flex-1 lg:sticky lg:top-8 lg:h-fit'>
                        <div className='
                              bg-zinc-900 
                              p-4 md:p-6 lg:p-8
                              rounded-xl
                              '>
                          <h2 className='
                              text-white 
                              text-2xl md:text-3xl lg:text-4xl
                              font-semibold
                              '>
                            Shopping Cart
                          </h2>

                          <div className='w-full border-t border-zinc-700 mt-4 md:mt-6'></div>

                          {/* CART ITEMS */}
                          <div className='
                                flex flex-col
                                gap-4 md:gap-6
                                mt-4 md:mt-6
                                '>
                            {
                              cartItems.map((item, index) => {
                                return (
                                  <CartItemsCards
                                    key={index}
                                    item={item}
                                    handleUpdateQuantity={handleUpdateQuantity}
                                  />
                                )
                              })
                            }
                          </div>

                          {/* SUBTOTAL */}
                          <div className='
                                flex items-center justify-end 
                                gap-2
                                py-4 md:py-6
                                mt-4 md:mt-6
                                text-lg md:text-xl lg:text-2xl
                                text-white
                                '>
                            <span>Subtotal ({totalQuantity} items):</span>
                            <span className='flex items-center font-semibold underline underline-offset-2'>
                              <MdOutlineCurrencyRupee />
                              {totalPrice.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </span>
                          </div>
                        </div>

                        {/* DISCLAIMER */}
                        <div className='
                              bg-rose-900 
                              mt-4 md:mt-6
                              p-4 md:p-6 lg:p-8
                              rounded-xl
                              text-zinc-100
                              text-xs md:text-sm
                              leading-relaxed
                              '>
                          <p>
                            The price and availability of items at exclusive are subject to change.
                            The shopping cart is a temporary place to store a list of your items and
                            reflects each item's most recent price. Do you have a promotional code?
                            We'll ask you to enter your claim code when it's time to pay.
                          </p>
                        </div>
                      </div>

                      {/* RIGHT CONTENT - Order Summary */}
                      <div className='
                            lg:w-96 xl:w-[28rem]
                            flex flex-col 
                            gap-4 md:gap-6
                            '>
                        {/* ORDER SUMMARY CARD */}
                        <div className='
                              p-4 md:p-6 lg:p-8
                              bg-zinc-900 
                              rounded-xl
                              text-white
                                                  '>
                          {/* PROGRESS BAR */}
                          <div className='w-full flex items-center gap-3'>
                            <div className='flex-1'>
                              <ProgressBar
                                value={totalPrice}
                                max={FREE_DELIVERY_THRESHOLD}
                              />
                            </div>
                            <p className='flex items-center text-base md:text-lg font-medium whitespace-nowrap'>
                              <MdOutlineCurrencyRupee />
                              {totalPrice.toLocaleString()}
                            </p>
                          </div>

                          {/* DELIVERY MESSAGE */}
                          <div className='
                                flex items-start
                                gap-2 mt-4
                                text-sm md:text-base
                                text-emerald-400
                                '>
                            <RiVerifiedBadgeFill className='mt-0.5 flex-shrink-0' />
                            <p>
                              {
                                totalPrice >= FREE_DELIVERY_THRESHOLD
                                  ? "Your order is eligible for FREE Delivery."
                                  : `Add more items worth ₹${(FREE_DELIVERY_THRESHOLD - totalPrice).toLocaleString()} to get free Delivery.`
                              }
                            </p>
                          </div>

                          {/* SUBTOTAL */}
                          <div className='
                                flex items-center justify-between 
                                mt-6 pt-6
                                border-t border-zinc-700
                                text-lg md:text-xl
                                '>
                            <span>Subtotal ({totalQuantity} items):</span>
                            <span className='flex items-center font-semibold'>
                              <MdOutlineCurrencyRupee />
                              {totalPrice.toLocaleString("en-IN", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </span>
                          </div>

                          {/* BUY BUTTON */}
                          <button
                            onClick={() => {
                              if (loggedinUserData) {
                                navigate('/order', {
                                  state: {
                                    cartItems: cartItems,
                                    totalPrice: totalPrice,
                                    totalQuantity: totalQuantity
                                  }
                                })
                              } else {
                                navigate('/auth')
                              }
                            }}
                            className='
                            w-full py-3 md:py-4
                            bg-indigo-600 hover:bg-indigo-700
                            text-white font-semibold
                            text-base md:text-lg
                            rounded-full mt-6 cursor-pointer
                            transition-colors duration-200
                            hover:shadow-lg
                            '>
                            Proceed to Buy
                          </button>
                        </div>

                        {/* CART RECOMMENDATIONS */}
                        <CartRecommendation />
                      </div>
                    </div>
                  )
                  : (
                    // EMPTY CART STATE
                    <div className='
                          w-full min-h-[70vh]
                          flex flex-col items-center 
                          justify-center gap-6 px-4
                          '>
                      <BsFillBagHeartFill className='text-rose-700 text-8xl' />

                      <p className='
                          text-white 
                          text-xl md:text-2xl lg:text-3xl
                          text-center font-medium
                          '>
                        Nothing to show in your cart...
                      </p>
                      <button
                        onClick={() => navigate('/collections')}
                        className='
                        px-8 py-3 bg-rose-700 hover:bg-rose-600
                        text-white font-semibold rounded-full
                        transition-colors duration-200
                        mt-4
                        '>
                        Start Shopping
                      </button>
                    </div>
                  )
              }
              <Footer />
            </div>
          )
      }
    </div>
  )
}

export default Cart