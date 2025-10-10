import React, { useContext, useEffect, useState } from 'react';
import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import FilterSideBar from '../components/FilterSidebar/FilterSideBar';
import { productDataContext } from '../store/ProductContext';
import { MdVerified } from "react-icons/md";
import { IoStarSharp } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';
import { cartDataContext } from '../store/CartContext';
import { GiClothes } from "react-icons/gi";
import { authDataContext } from '../store/AuthContext';
import { Ring2 } from 'ldrs/react'
import 'ldrs/react/Ring2.css'



const Collections = () => {

  // USE STATES
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilterdProducts] = useState([]);
  const [sortBy, setSortBy] = useState("relevant");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [wishListProductIds, setWishListProductIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // USE NAVIGATE
  const navigate = useNavigate();

  // CONTEXT DATA
  const { getAllProductsData, handleAddWishList, handleWishListData } = useContext(productDataContext);
  const { addItemsToCart } = useContext(cartDataContext);
  const { loggedinUserData } = useContext(authDataContext);


  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        setLoading(true);
        const result = await getAllProductsData();
        setProducts(result?.products);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllProducts();
  }, []);


  useEffect(() => {
    const fetchWishListData = async () => {
      try {
        const response = await handleWishListData();
        setWishListProductIds(response?.wishListData?.map((item) => item.productId._id));
      } catch (error) {
        console.log(error);
      }
    }
    fetchWishListData();
  }, [wishListProductIds])



  useEffect(() => {
    let filtered = products
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((product) => selectedCategories.includes(product.category));
    }

    if (selectedSubCategories.length > 0) {
      filtered = filtered.filter((product) => selectedSubCategories.includes(product.subCategory));
    }

    if (sortBy === "lowToHigh") {
      filtered = [...filtered].sort((a, b) => a.price - b.price);

    } else if (sortBy == "highToLow") {
      filtered = [...filtered].sort((a, b) => b.price - a.price);
    }

    if (selectedSize.length > 0) {
      filtered = filtered.filter((product) =>
        product.sizes?.some(size => selectedSize.includes(size))
      );
    }

    setFilterdProducts(filtered);
  }, [selectedCategories, selectedSubCategories, sortBy, selectedSize, products]);


  return (

    <div className='w-full bg-zinc-950'>
      {/* NAV BAR */}
      <PrimaryNavbar />
      {
        loading
          ? (
            <div className='fixed inset-0 z-50 flex items-center justify-center '>
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
            <div className='flex flex-col items-stretch xl:flex-row min-h-full'>
              <FilterSideBar
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories}
                selectedSubCategories={selectedSubCategories}
                setSelectedSubCategories={setSelectedSubCategories}
                sortBy={sortBy} setSortBy={setSortBy}
                selectedSize={selectedSize} setSelectedSize={setSelectedSize}
              />

              {/* RIGHT CONTENT */}
              <div className="rightContent px-3 md:px-6 xl:px-8 2xl:px-12 flex-1 min-h-screen">
                <div className="header flex flex-col justify-center items-center">

                  {/* HEADING */}
                  <h1
                    className='
                text-white
                my-3 sm:my-5 xl:my-8
                flex items-center
                gap-2 md:gap-4
                text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold
                '>
                    All Collections
                    <GiClothes className='text-rose-700' />
                  </h1>

                  {/* PRODUCTS GRID */}
                  <div className='
                collections
                w-full
                grid 
                grid-cols-2 
                md:grid-cols-3 
                lg:grid-cols-4 
                xl:grid-cols-3 
                2xl:grid-cols-4
                gap-3 md:gap-4 lg:gap-5 xl:gap-6
            '>
                    {
                      filteredProducts?.map((product, index) => {
                        return (
                          <div
                            key={product._id || index}
                            className='
                        bg-stone-900
                        flex flex-col
                        p-2 md:p-3 lg:p-4
                        text-(--text-secondary)
                        rounded-lg
                        hover:shadow-lg hover:shadow-stone-800/50
                        transition-all duration-300
                      '
                          >

                            {/* PRODUCT IMAGE */}
                            <div className='relative w-full aspect-[3/4] overflow-hidden rounded-lg mb-3'>
                              <img
                                onClick={() => navigate(`/collections/${product._id}`)}
                                src={product.image1}
                                alt="productImage"
                                className="
                            w-full h-full
                            object-cover
                            cursor-pointer
                            hover:scale-105
                            transition-transform duration-300
                          "
                              />
                            </div>

                            {/* PRODUCT DETAILS */}
                            <div className='flex flex-col flex-grow'>
                              {/* PRODUCT NAME */}
                              <h3
                                onClick={() => navigate(`/collections/${product._id}`)}
                                className='
                            text-zinc-100
                            text-xs sm:text-sm md:text-base
                            font-medium
                            line-clamp-2
                            h-10 md:h-12
                            mb-2
                            hover:text-rose-400
                            transition-colors duration-200
                            cursor-pointer
                          '
                              >
                                {product.name}
                              </h3>

                              {/* PRODUCT DESCRIPTION */}
                              <p className='
                            text-zinc-500
                            text-xs md:text-sm
                            line-clamp-2
                            h-8 md:h-10
                            mb-3
                          '>
                                {product.description}
                              </p>

                              {/* CATEGORY & RATING */}
                              <div className='flex items-center justify-between mb-3'>
                                <p className='
                              text-zinc-400
                              text-xs md:text-sm
                              capitalize
                            '>
                                  {product.category}
                                </p>
                                <div className='flex gap-0.5'>
                                  {[...Array(5)].map((_, i) => (
                                    <IoStarSharp
                                      key={i}
                                      className='text-yellow-400 text-xs md:text-sm'
                                    />
                                  ))}
                                </div>
                              </div>

                              {/* BEST SELLER BADGE */}
                              {product.bestSeller && (
                                <div className='
                              text-xs md:text-sm
                              bg-zinc-700
                              text-zinc-100
                              py-1.5 px-2
                              mb-3
                              rounded
                              flex items-center justify-center
                              gap-2
                            '>
                                  Best Seller
                                  <MdVerified className='text-emerald-500' />
                                </div>
                              )}

                              {/* PRICE */}
                              <div className='flex items-baseline gap-2 mb-4'>
                                <div className='flex items-start'>
                                  <span className='text-xs md:text-sm mt-0.5'>₹</span>
                                  <p className='text-lg md:text-xl lg:text-2xl font-semibold tracking-wide'>
                                    {product.price.toLocaleString()}
                                  </p>
                                </div>
                                <div className='text-xs md:text-sm text-zinc-500'>
                                  <span>M.R.P </span>
                                  <span className='line-through'>
                                    ₹{(product.price * 1.1).toFixed(0)}
                                  </span>
                                </div>
                              </div>

                              {/* ADD TO CART & WISHLIST */}
                              <div className="flex items-center justify-between gap-3 mt-auto">
                                <button
                                  onClick={() => {
                                    if (loggedinUserData) {
                                      addItemsToCart(product._id, 1, ["M"], product.price);
                                      navigate('/cart')
                                    } else {
                                      navigate('/auth')
                                    }
                                  }}
                                  className='
                              text-xs sm:text-sm
                              py-2 md:py-2.5
                              px-1 md:px-4
                              bg-rose-800
                              hover:bg-rose-700
                              text-white
                              font-medium 
                              tracking-wide
                              flex-1
                              rounded-md
                              transition-colors duration-200
                              cursor-pointer
                              text-nowrap
                            '>
                                  Add to Cart
                                </button>

                                <GoHeartFill
                                  onClick={() => {
                                    if (loggedinUserData) {
                                      handleAddWishList(product._id);
                                    } else {
                                      navigate('/auth')
                                    }
                                  }}
                                  className={`
                              w-6 h-6 md:w-9 md:h-9
                              flex-shrink-0
                              hover:scale-110
                              transition-all duration-200
                              cursor-pointer
                              ${wishListProductIds?.includes(product._id)
                                      ? "text-rose-700"
                                      : "text-zinc-400 hover:text-rose-600"
                                    }
                            `}
                                />
                              </div>
                            </div>

                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            </div>
          )
      }
    </div>
  )
}

export default Collections