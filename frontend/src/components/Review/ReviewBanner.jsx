import React from 'react';
import { BsFillBagHeartFill } from "react-icons/bs";
import { MdOutlineSecurity } from "react-icons/md";
import { MdShoppingCart } from "react-icons/md";
import { IoIosStar } from "react-icons/io";
import { MdCurrencyRupee } from "react-icons/md";

const ReviewBanner = () => {
    return (
        <div className='
            w-full
            text-zinc-300
            text-center
            flex flex-col 
            gap-6 md:gap-8
            bg-zinc-900
            p-3 md:p-8 lg:p-10
            rounded-xl
        '>
            {/* HEADER */}
            <div className='
                text-lg sm:text-xl md:text-2xl
                py-4 md:py-6
                px-4
                text-pink-600
                bg-zinc-950
                rounded-lg
                font-semibold
            '>
                Go ahead — leave a review and let your voice be heard!
            </div>

            {/* DESCRIPTION */}
            <p className='
                px-4 md:px-8 lg:px-12
                text-sm md:text-base lg:text-lg
                leading-relaxed
                tracking-wide
                text-zinc-400
            '>
                At <span className='text-rose-700 font-semibold'>exclusive</span>, we deeply value and respect your feedback. Your reviews are not just words — they help us grow, improve, and serve you better every day. Whether it's a kind compliment or constructive criticism, each review helps future customers make informed decisions and allows us to provide the best possible experience. Your voice matters, and we're truly grateful for every customer who takes the time to share their thoughts. Thank you for helping us build a better shopping experience for everyone.
            </p>

        </div>
    )
}

export default ReviewBanner