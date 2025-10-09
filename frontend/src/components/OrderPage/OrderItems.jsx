import React, { useContext, useEffect, useState } from 'react';
import { MdCurrencyRupee } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { orderDataContext } from '../../store/OrderContext';

const OrderItems = ({ orderData }) => {

    // USE STATES
    const [totalItems, setTotalItems] = useState(0);
    const [totalOrders, setTotalOrders] = useState(0);
    const [totalSpent, setTotalSpent] = useState(0);

    
    // CONTEXT DATA
    const { finalData } = useContext(orderDataContext);
    console.log(finalData)

    // USE NAVIGATE
    const navigate = useNavigate();

    useEffect(() => {

        // TOTAL ORDERS
        const allOrders = () => {
            if (orderData && orderData?.length > 0) {
                setTotalOrders(orderData.length);
            }
        };
        allOrders();

        // TOTAL ITEMS
        const sumOfItem = finalData.reduce((acc, item) => {
            return acc + item.quantity
        }, 0);
        setTotalItems(sumOfItem);


        // TOTAL SPENT
        const sumOfSpent = finalData.reduce((acc, item) => {
            return acc + (item.price * item.quantity)
        }, 0);
        setTotalSpent(sumOfSpent);

    }, [finalData]);



    return (
       <div className='
    w-full 
    px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-40
    py-6 md:py-8 lg:py-12
    mb-8 md:mb-12 lg:mb-16
'>
    {/* STATS CARDS */}
    <div className='
        grid 
        grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
        gap-4 md:gap-6
        mb-8 md:mb-12
    '>
        {/* TOTAL ORDERS */}
        <div className='
            bg-pink-600
            hover:bg-pink-700
            p-6 md:p-8
            rounded-xl
            flex flex-col 
            items-center 
            justify-center
            gap-2
            transition-colors duration-200
            shadow-lg
        '>
            <p className='
                text-white 
                font-bold 
                text-4xl md:text-5xl lg:text-6xl
            '>
                {totalOrders}
            </p>
            <p className='
                text-base md:text-lg
                font-medium 
                text-white 
                tracking-wide
            '>
                Total Orders
            </p>
        </div>

        {/* TOTAL ITEMS */}
        <div className='
            bg-green-600
            hover:bg-green-700
            p-6 md:p-8
            rounded-xl
            flex flex-col 
            items-center 
            justify-center
            gap-2
            transition-colors duration-200
            shadow-lg
        '>
            <p className='
                text-white 
                font-bold 
                text-4xl md:text-5xl lg:text-6xl
            '>
                {totalItems}
            </p>
            <p className='
                text-base md:text-lg
                font-medium 
                text-white 
                tracking-wide
            '>
                Total Items
            </p>
        </div>

        {/* TOTAL SPENT */}
        <div className='
            bg-blue-600
            hover:bg-blue-700
            p-6 md:p-8
            rounded-xl
            flex flex-col 
            items-center 
            justify-center
            gap-2
            transition-colors duration-200
            shadow-lg
            sm:col-span-2 lg:col-span-1
        '>
            <p className='
                text-white 
                font-bold 
                text-4xl md:text-5xl lg:text-6xl
                flex items-center
            '>
                <MdCurrencyRupee />
                {totalSpent.toLocaleString()}
            </p>
            <p className='
                text-base md:text-lg
                font-medium 
                text-white 
                tracking-wide
            '>
                Total Spent
            </p>
        </div>
    </div>

    {/* ORDERS LIST */}
    <div className='flex flex-col gap-6 md:gap-8'>
        {
            finalData?.map((itemDetails, index) => {
                const newDate = new Date(itemDetails.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                });

                return (
                    <div key={index} className='text-white'>
                        {/* ORDER HEADER */}
                        <div className='
                            flex flex-col sm:flex-row
                            justify-between
                            gap-2 sm:gap-4
                            mb-3
                        '>
                            <span className='
                                bg-zinc-900 
                                px-4 py-2
                                rounded-lg
                                text-sm md:text-base
                                font-medium
                                w-fit
                            '>
                                #ORDER ID: {itemDetails?.orderId}
                            </span>
                            <p className='
                                text-sm md:text-base
                                text-zinc-300
                            '>
                                Placed on: <span className='text-rose-500 font-medium'>{newDate}</span>
                            </p>
                        </div>

                        {/* ORDER CARD */}
                        <div className='
                            w-full 
                            bg-zinc-900 
                            p-4 md:p-6
                            rounded-xl
                        '>
                            <div className='
                                flex flex-col lg:flex-row
                                justify-between 
                                gap-4 md:gap-6
                            '>
                                {/* PRODUCT INFO */}
                                <div className='
                                    flex flex-col sm:flex-row
                                    gap-4 md:gap-6
                                    flex-1
                                '>
                                    {/* PRODUCT IMAGE */}
                                    <img
                                        src={itemDetails?.productDetails?.image1}
                                        alt={itemDetails?.productDetails?.name}
                                        className='
                                            w-full sm:w-32 md:w-40
                                            aspect-[3/4]
                                            rounded-lg
                                            object-cover
                                        '
                                    />

                                    {/* PRODUCT DETAILS */}
                                    <div className='
                                        flex flex-col 
                                        gap-2 md:gap-3
                                        flex-1
                                    '>
                                        <h3
                                            onClick={() => navigate(`/collections/${itemDetails.productDetails._id}`)}
                                            className='
                                                text-base md:text-lg
                                                font-medium
                                                hover:text-rose-400 
                                                cursor-pointer
                                                transition-colors duration-200
                                                line-clamp-2
                                            '>
                                            {itemDetails?.productDetails?.name}
                                        </h3>

                                        <p className='
                                            text-sm md:text-base
                                            text-zinc-400
                                            line-clamp-2
                                        '>
                                            {itemDetails?.productDetails?.description}
                                        </p>

                                        <div className='
                                            flex flex-col 
                                            gap-1.5
                                            text-sm md:text-base
                                        '>
                                            <p>
                                                Qty: <span className='font-medium'>{itemDetails?.quantity}</span>
                                            </p>
                                            <p className='flex items-center gap-1'>
                                                Price: 
                                                <span className='flex items-center font-medium text-emerald-400'>
                                                    <MdCurrencyRupee />
                                                    {(itemDetails.price).toLocaleString()}
                                                </span>
                                            </p>
                                            <p className='
                                                flex items-center gap-1
                                                underline underline-offset-2
                                            '>
                                                Total: 
                                                <span className='flex items-center text-rose-400 font-semibold'>
                                                    <MdCurrencyRupee />
                                                    {(itemDetails.price * itemDetails.quantity).toLocaleString()}
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* ACTIONS */}
                                <div className='
                                    flex sm:flex-row lg:flex-col
                                    items-center lg:items-end
                                    justify-between sm:justify-end lg:justify-start
                                    gap-3 md:gap-4
                                '>
                                    <span className='
                                        px-5 py-2.5
                                        text-sm md:text-base
                                        rounded-full 
                                        bg-orange-600
                                        hover:bg-orange-700
                                        transition-colors duration-200
                                        font-medium
                                        whitespace-nowrap
                                    '>
                                        {itemDetails.status}
                                    </span>

                                    <button
                                        onClick={() => navigate(`/collections/${itemDetails.productDetails._id}`)}
                                        className='
                                        bg-indigo-600 
                                        hover:bg-indigo-700
                                        px-5 py-2.5
                                        text-sm md:text-base
                                        rounded-full
                                        transition-colors duration-200
                                        font-medium
                                        whitespace-nowrap
                                        cursor-pointer
                                    '>
                                        Reorder
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    </div>
</div>
    )
}

export default OrderItems