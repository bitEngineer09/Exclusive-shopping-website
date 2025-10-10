import React, { useContext, useEffect, useState } from 'react';
import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import { productDataContext } from '../store/ProductContext';
import { MdCurrencyRupee } from "react-icons/md";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { IoHeart } from "react-icons/io5";
import { useNavigate } from 'react-router-dom';
import { GoHeartFill } from "react-icons/go";
import Footer from '../components/Footer/Footer';
import { Ring2 } from 'ldrs/react';
import 'ldrs/react/Ring2.css';


const Wishlist = () => {

  // USE STATES
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(true);

  // USE NAVIGATE
  const navigate = useNavigate();

  // CONTEXT DATA
  const { handleWishListData } = useContext(productDataContext);

  useEffect(() => {
    const fetchWishListData = async () => {
      try {
        setLoading(true);
        const response = await handleWishListData();
        setWishList(response.wishListData);
        setLoading(false);
        return response;
      } catch (error) {
        console.log(error);
      }
    }
    fetchWishListData();
  }, []);

  return (
    <div className='w-full min-h-screen bg-(--bg-color)'>
      <PrimaryNavbar />

      {
        loading
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
              <div className='w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-40 mt-5 md:mt-8'>
                <p className='text-white text-sm sm:text-base'>
                  Home / <span className='text-(--color-primary)'>WishList</span>
                </p>
              </div>
              {
                wishList.length > 0 ?
                  <div className='mt-4 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-40'>
                    {/* PAGE HEADING */}
                    <h1 className='text-2xl sm:text-3xl lg:text-4xl xl:text-5xl  text-white font-semibold flex items-center justify-center gap-2 sm:gap-3 text-center'>
                      My WishList<span className='text-rose-700'><GoHeartFill /></span>
                    </h1>
                  </div>
                  : null
              }

              {/* WISHLIST ITEMS */}
              <div className='mt-6 md:mt-9 xl:mt-11 w-full flex items-center justify-center text-white px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-40 pb-12 md:pb-16'>
                {wishList.length > 0 ? (
                  <div className='w-full grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5 md:gap-6'>
                    {
                      wishList?.map((item, index) => {
                        return (
                          <div
                            key={index}
                            className='bg-stone-900 rounded-lg overflow-hidden hover:shadow-lg hover:shadow-stone-800/50 transition-all duration-300 hover:scale-[1.02] flex flex-col'>
                            {/* PRODUCT IMAGE */}
                            <div className='relative w-full aspect-[3/4] overflow-hidden'>
                              <img
                                onClick={() => navigate(`/collections/${item.productId._id}`)}
                                src={item.productId.image1}
                                alt={item.productId.name}
                                loading="lazy"
                                className='w-full h-full object-cover cursor-pointer hover:scale-110 transition-transform duration-500'
                              />
                            </div>

                            {/* PRODUCT DETAILS */}
                            <div className="flex flex-col p-3 sm:p-4 gap-2 sm:gap-3 flex-grow">
                              {/* PRODUCT NAME */}
                              <h3
                                onClick={() => navigate(`/collections/${item.productId._id}`)}
                                className='text-zinc-300 text-xs sm:text-sm md:text-base line-clamp-2 leading-relaxed hover:text-rose-400 transition-colors duration-200 cursor-pointer'>
                                {item.productId.name}
                              </h3>

                              {/* PRICE AND BADGE */}
                              <div className='flex flex-col gap-2 mt-auto'>
                                {/* PRICE */}
                                <p className='flex items-center text-white text-base sm:text-lg md:text-xl font-semibold'>
                                  <MdCurrencyRupee />
                                  {item.productId.price.toLocaleString()}
                                </p>

                                {/* LOVED BADGE */}
                                <div className='flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm text-white font-medium bg-rose-800 rounded-full'>
                                  <span>Loved Item</span>
                                  <IoHeart className='w-3 h-3 sm:w-4 sm:h-4' />
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                ) : (
                  // EMPTY WISHLIST STATE
                  <div className='w-full min-h-[60vh] sm:min-h-[70vh] flex flex-col items-center justify-center gap-4 sm:gap-6 py-12 sm:py-20 text-center px-4'>
                    <BsEmojiHeartEyes className='text-5xl sm:text-6xl md:text-8xl text-rose-700' />
                    <div>
                      <h2 className='text-xl sm:text-2xl md:text-3xl font-semibold mb-2'>
                        Your Wishlist is Empty
                      </h2>
                      <p className='text-zinc-400 text-sm sm:text-base md:text-lg'>
                        Start adding items you love!
                      </p>
                    </div>
                    <button
                      onClick={() => navigate('/collections')}
                      className='px-6 sm:px-8 py-2.5 sm:py-3 bg-rose-700 hover:bg-rose-600 text-white text-sm sm:text-base font-semibold rounded-full transition-colors duration-200 mt-2 sm:mt-4'>
                      Browse Products
                    </button>
                  </div>
                )}
              </div>
              <Footer />
            </div>
          )
      }
    </div>
  )
}

export default Wishlist