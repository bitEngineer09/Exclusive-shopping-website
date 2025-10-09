import React, { useContext, useEffect, useState } from 'react';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { PiShoppingCartSimpleBold } from "react-icons/pi";
import { GoHeartFill } from "react-icons/go";
import { FaHeart } from "react-icons/fa6";
import RatingStars from '../RatingStars';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../../store/AuthContext';

const ItemDetails = ({
    item,
    features,
    counter,
    handleDecrement,
    handleIncrement,
    addItemsToCart,
    selectedSize, setSelectedSize,
    handleAddWishList, handleWishListData,
    averageRating
}) => {

    // USE STATES
    const [wishListProductIds, setWishlistProductIds] = useState([]);

    // CONTEXT DATA
    const { loggedinUserData } = useContext(authDataContext);


    useEffect(() => {
        const fetchAllWishListData = async () => {
            try {
                const response = await handleWishListData();
                setWishlistProductIds(response?.wishListData?.map((item) => {
                    return item.productId._id
                }))
                // console.log(response?.wishListData);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllWishListData();
    }, [])


    const navigate = useNavigate();

    return (
        <div className='flex gap-4'>
            <div className='
                    w-full
                    px-3 sm:px-6 md:px-0
                    text-(--text-secondary) 
                    space-y-4 md:space-y-5 lg:space-y-6
                    '>

                {/* ITEM NAME */}
                <h1 className='
                        text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl
                        tracking-wide
                '>
                    {item.name}
                </h1>

                {/* REVIEWS */}
                <div className='flex items-center gap-2 flex-wrap'>
                    <RatingStars rating={Math.round(averageRating)} />
                    <div className="reviews text-sm md:text-base">
                        ({item?.reviews?.length || 0} reviews) | <span className='text-emerald-400'>In Stock</span>
                    </div>
                </div>

                {/* PRICE */}
                <div className="
                        price 
                        flex items-center gap-4
                        text-2xl md:text-3xl lg:text-4xl
                        font-bold
                        ">
                    <div className='flex items-center'>
                        <MdOutlineCurrencyRupee />
                        {item.price}
                    </div>
                    <GoHeartFill
                        onClick={() => {
                            if (loggedinUserData) {
                                handleAddWishList(item._id);
                            } else {
                                navigate('/auth')
                            }
                        }}
                        className={`
                    ${wishListProductIds?.includes(item._id) ? "text-rose-700" : "text-white"}
                    text-2xl md:text-3xl lg:text-4xl 
                    cursor-pointer 
                    hover:scale-110 
                    transition-transform duration-200
                `}
                    />
                </div>

                {/* DESCRIPTION */}
                <p className="
                        itemDescription
                        text-sm md:text-base lg:text-lg
                        text-zinc-300
                        leading-relaxed
                ">
                    {item.description}
                </p>

                <div className='w-full border-t-2 border-rose-800'></div>

                {/* SIZE */}
                <div className="
                        size
                        flex items-center justify-between
                        flex-wrap
                        text-sm md:text-base
                ">
                    <div className='flex items-center gap-3 md:gap-4'>
                        <span className='font-medium'>Available Sizes:</span>
                        <div className='flex items-center gap-2 md:gap-3'>
                            {
                                item?.sizes?.map((size, index) => {
                                    return (
                                        <div
                                            onClick={() => {
                                                if (selectedSize.includes(size)) {
                                                    setSelectedSize(selectedSize.filter((prev) => prev !== size));
                                                } else {
                                                    setSelectedSize([...selectedSize, size])
                                                }
                                            }}
                                            key={index}
                                            className={`
                                                flex items-center justify-center
                                                w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14
                                                rounded-full 
                                                cursor-pointer
                                                hover:bg-rose-900 
                                                hover:scale-105
                                                transition-all duration-200
                                                text-sm md:text-base
                                                font-medium
                                                ${selectedSize.includes(size) ? "bg-rose-900 ring-2 ring-rose-600" : "bg-zinc-700"}
                                            `}>
                                            {size}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                </div>

                {/* FEATURES SECTION */}
                <div className="
            features
            w-full
            hidden xl:flex 
            justify-between
            gap-4
            border-2 border-zinc-700 
            rounded-xl
            p-6 lg:p-8
        ">
                    {
                        features.map((feature, index) => {
                            return (
                                <div
                                    key={index}
                                    className='
                                flex flex-col 
                                items-center justify-center
                                gap-2
                                text-center
                            '
                                >
                                    <div className='text-2xl lg:text-3xl'>
                                        {feature.icon}
                                    </div>
                                    <p className='
                                tracking-wide 
                                text-xs lg:text-sm
                                text-zinc-300
                            '>
                                        {feature.content}
                                    </p>
                                </div>
                            )
                        })
                    }
                </div>

                {/* BUY NOW AND ADD TO CART */}
                <div className='
                        flex items-center justify-between
                        gap-3 md:gap-4 lg:gap-6
                        flex-wrap
                '>

                    {/* COUNTER */}
                    <div className='flex items-center gap-4'>
                        <div className="
                    counter
                    flex items-center
                    rounded-lg
                    overflow-hidden
                    h-10
                    w-40
                ">
                            <button
                                onClick={handleDecrement}
                                className='
                            h-full
                            flex justify-center items-center
                            bg-pink-700
                            hover:bg-pink-600
                            transition-colors duration-200
                            cursor-pointer
                            px-4 md:px-5
                        '>
                                <FaMinus className='text-sm md:text-base' />
                            </button>
                            <div className='
                                    h-full
                                    font-semibold
                                    flex justify-center items-center
                                    bg-zinc-100 
                                    text-rose-600 
                                    text-base md:text-lg
                                    select-none
                                    flex-1
                                    min-w-[50px]
                                    '>
                                {counter}
                            </div>
                            <button
                                onClick={handleIncrement}
                                className='
                                    h-full
                                    flex justify-center items-center 
                                    bg-pink-700
                                    hover:bg-pink-600
                                    transition-colors duration-200
                                    cursor-pointer
                                    px-4 md:px-5
                                    '>
                                <FaPlus className='text-sm md:text-base' />
                            </button>
                        </div>
                    </div>

                    {/* ADD TO CART */}
                    <div className='flex items-center gap-3'>
                        <button
                            onClick={() => {
                                if (loggedinUserData) {
                                    // console.log(selectedSize);
                                    addItemsToCart(item._id, counter, selectedSize, item.price);
                                    navigate('/cart');
                                } else {
                                    navigate('/auth')
                                }
                            }}
                            className="
                                addToCart
                                px-6 md:px-8
                                h-10 md:h-12
                                flex items-center justify-center 
                                gap-2
                                text-sm md:text-base
                                font-medium
                                bg-zinc-600 
                                hover:bg-emerald-600 
                                rounded-lg
                                cursor-pointer 
                                transition-colors duration-200
                                whitespace-nowrap
                            ">
                            Add to Cart
                            <PiShoppingCartSimpleBold className='text-base md:text-lg' />
                        </button>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default ItemDetails