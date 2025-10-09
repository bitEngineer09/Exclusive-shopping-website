import React from 'react';
import razor from '../../assets/razorpay.webp';

const PaymentMode = ({ method, setMethod }) => {
    return (
        <div className='h-[9rem]'>
            <h1 className='text-[2rem] mt-[3rem] text-center'>PAYMENT METHOD</h1>
            <div className='flex items-center justify-between mt-[2rem]'>
                <button
                    onClick={() => setMethod("Razorpay")}
                    className={`
                        bg-zinc-300
                        w-[12rem]
                        h-[3.5rem]
                        flex items-center justify-center
                        rounded-[0.7rem]
                        cursor-pointer
                        ${method === "Razorpay" ? "border-[5px] border-amber-500 scale-90" : ""}
                    `}>
                    <img src={razor} alt="" className='w-[8rem]' />
                </button>
                <button
                    onClick={() => setMethod("cod")}
                    className={`
                        bg-blue-600
                        p-[1rem]
                        rounded-[0.7rem]
                        cursor-pointer
                        ${method === "COD" ? "border-[3px] border-white scale-90" : ""}
                    `}>
                    CASH ON DELIVERY
                </button>
            </div>
        </div>
    )
}

export default PaymentMode