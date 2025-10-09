import React, { useContext, useEffect, useState } from 'react';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { MdDeleteOutline } from "react-icons/md";
import { RiVerifiedBadgeFill } from "react-icons/ri";
import { MdOutlineCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { cartDataContext } from '../../store/CartContext';


const CartItemsCards = ({ item, handleUpdateQuantity }) => {

    const [counter, setCounter] = useState(item.quantity);
    const { addItemsToCart, deleteItemsFromCart, removeItem } = useContext(cartDataContext);

    const handleIncrement = async () => {
        await addItemsToCart(item.productId._id);
        setCounter((prev) => {
            const newQuantity = prev + 1;
            handleUpdateQuantity(item.productId._id, newQuantity); // esse real time pe updated values reflect hongi
            return newQuantity; // es value se counter update hoga
        })

    };

    const handleDecrement = async () => {
        if (counter > 1) {
            await deleteItemsFromCart(item.productId._id, 1);
            setCounter((prev) => {
                const newQuantity = prev - 1;
                handleUpdateQuantity(item.productId._id, newQuantity);
                return newQuantity;
            })
        }
    };


    // agar koi change parent ki vajah se ata hai to, vo bhi reflect ho jaaega
    useEffect(() => {
        setCounter(item.quantity);
    }, [item.quantity]);

    const navigate = useNavigate();

    return (
        <div className='
    relative
    w-full
    p-4 md:p-6
    grid 
    grid-cols-1
    sm:grid-cols-[auto_1fr_auto]
    gap-4 md:gap-6
    items-start
    border-b-2 border-zinc-700
'>
            {/* PRODUCT IMAGE */}
            <div className='
        w-full sm:w-32 md:w-36 lg:w-40
        justify-self-center sm:justify-self-start
    '>
                <img
                    onClick={() => navigate(`/collections/${item.productId._id}`)}
                    src={item.productId.image1}
                    alt={item.productId.name}
                    className='
                w-full
                aspect-[3/4]
                rounded-lg
                object-cover 
                cursor-pointer
                hover:opacity-80
                transition-opacity duration-200
            '
                />
            </div>

            {/* PRODUCT DETAILS */}
            <div className="details w-full flex flex-col gap-2 md:gap-3">
                {/* PRODUCT NAME */}
                <h3
                    onClick={() => navigate(`/collections/${item.productId._id}`)}
                    className='
                text-white
                text-sm md:text-base lg:text-lg
                font-medium
                hover:text-rose-500 
                transition-colors duration-200
                cursor-pointer
                line-clamp-2
            '>
                    {item.productId.name}
                </h3>

                {/* IN STOCK */}
                <p className='
            text-emerald-400
            text-xs md:text-sm
            font-medium
            flex items-center gap-1
        '>
                    <span className='w-2 h-2 bg-emerald-400 rounded-full'></span>
                    In Stock
                </p>

                {/* FREE SHIPPING */}
                <p className='
            text-zinc-300
            text-xs md:text-sm
        '>
                    Eligible for FREE Shipping
                </p>

                {/* EXCLUSIVELY FULFILLED */}
                <p className='
            text-zinc-300
            text-xs md:text-sm
            flex items-center gap-1.5
        '>
                    <RiVerifiedBadgeFill className='text-(--color-primary) flex-shrink-0' />
                    Exclusively fulfilled
                </p>

                {/* SIZE INFO */}
                {
                    item.sizes.length > 0
                        ? (
                            <div className='
                        text-xs md:text-sm
                        text-zinc-300
                        flex flex-wrap items-center gap-1
                    '>
                                <span className='font-medium'>Size:</span>
                                <span className='text-white'>{item.sizes?.join(", ")}</span>
                            </div>
                        )
                        : (
                            <p className='
                        text-xs md:text-sm
                        text-amber-500
                    '>
                                No size selected
                            </p>
                        )
                }

                {/* QUANTITY COUNTER */}
                <div className='flex items-center gap-4 text-white'>
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
            </div>

            {/* PRICE AND DELETE SECTION */}
            <div className='
        flex sm:flex-col
        items-center sm:items-end
        justify-between sm:justify-start
        gap-4
        w-full sm:w-auto
    '>
                {/* PRICE */}
                <p className='
            flex items-center
            text-xl md:text-2xl lg:text-3xl
            text-white
            font-bold
            tracking-wide
        '>
                    <MdOutlineCurrencyRupee />
                    {((item.productId.price * counter).toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2
                    }))}
                </p>

                {/* DELETE BUTTON */}
                <button
                    onClick={async () => {
                        await removeItem(item.productId._id);
                    }}
                    className='
                p-2
                text-zinc-500 
                hover:text-red-600
                hover:bg-red-950/30
                rounded-lg
                transition-all duration-200
                cursor-pointer
                group
            '
                    aria-label="Remove item"
                >
                    <MdDeleteOutline className='
                w-6 h-6 md:w-7 md:h-7
                group-hover:scale-110
                transition-transform duration-200
            ' />
                </button>
            </div>
        </div>
    )
}

export default CartItemsCards