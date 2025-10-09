import React from 'react';
import { MdCurrencyRupee } from "react-icons/md";
import PaymentMode from './PaymentMode';
import { GiClothes } from "react-icons/gi";


const CartTotals = ({ method, setMethod, onSubmitHandler, totalPrice, totalQuantity }) => {
    return (
        <div className='w-full h-full '>
            {/* Header */}
            <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-center'>
                    CART <span className="text-pink-600">totals</span>
            </h2>

            {/* Main Content Card */}
            <div className='bg-zinc-950 border border-slate-800 p-4 sm:p-5 md:p-6 lg:p-8 rounded-lg md:rounded-xl mt-3 sm:mt-4 md:mt-5 shadow-lg'>
                
                {/* Price Breakdown Section */}
                <div className='space-y-3 sm:space-y-3.5 md:space-y-4'>
                    
                    {/* Total Items Row */}
                    <div className='flex justify-between items-center bg-zinc-900 border-2 border-zinc-800 h-12 sm:h-13 md:h-14 lg:h-16 text-sm sm:text-base md:text-lg rounded-lg px-3 sm:px-4 md:px-5 hover:bg-zinc-700 transition-colors'>
                        <p className='tracking-wide flex items-center gap-2 sm:gap-2.5'>
                            <span className='hidden xs:inline'>Total Items</span>
                            <span className='xs:hidden'>Items</span>
                            <GiClothes className='text-lg sm:text-xl md:text-2xl text-pink-600' />
                        </p>
                        <span className='flex items-center font-medium'>
                            {totalQuantity} {totalQuantity === 1 ? 'item' : 'items'}
                        </span>
                    </div>

                    {/* Subtotal Row */}
                    <div className='flex justify-between items-center bg-zinc-900 border-2 border-zinc-800 h-12 sm:h-13 md:h-14 lg:h-16 text-sm sm:text-base md:text-lg rounded-lg px-3 sm:px-4 md:px-5 hover:bg-zinc-700 transition-colors'>
                        <p className='tracking-wide'>Subtotal</p>
                        <span className='flex items-center font-medium'>
                            <MdCurrencyRupee className='text-base sm:text-lg md:text-xl' />
                            <span className='tabular-nums'>{totalPrice.toLocaleString('en-IN')}</span>
                        </span>
                    </div>

                    {/* Shipping Fee Row */}
                    <div className='flex justify-between items-center bg-zinc-900 border-2 border-zinc-800 h-12 sm:h-13 md:h-14 lg:h-16 text-sm sm:text-base md:text-lg rounded-lg px-3 sm:px-4 md:px-5 hover:bg-zinc-700 transition-colors'>
                        <p className='tracking-wide flex items-center gap-1'>
                            <span className='hidden xs:inline'>Shipping Fee</span>
                            <span className='xs:hidden'>Shipping</span>
                            <span className='text-xs sm:text-sm text-gray-400 ml-1'>(2%)</span>
                        </p>
                        <span className='flex items-center font-medium'>
                            <MdCurrencyRupee className='text-base sm:text-lg md:text-xl' />
                            <span className='tabular-nums'>{(totalPrice * 0.02).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </span>
                    </div>

                    {/* Total Row - Highlighted */}
                    <div className='flex justify-between items-center bg-gradient-to-r from-rose-800 to-pink-700 h-12 sm:h-13 md:h-14 lg:h-16 text-sm sm:text-base md:text-lg rounded-lg px-3 sm:px-4 md:px-5 shadow-md'>
                        <p className='tracking-wide font-semibold flex items-center gap-1'>
                            <span>Total</span>
                            <span className='flex items-center'>
                                (<MdCurrencyRupee className='text-base sm:text-lg md:text-xl' />)
                            </span>
                        </p>
                        <span className='flex items-center font-bold text-lg sm:text-xl md:text-2xl'>
                            <MdCurrencyRupee className='text-lg sm:text-xl md:text-2xl' />
                            <span className='tabular-nums'>{(totalPrice + (totalPrice * 0.02)).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                        </span>
                    </div>
                </div>

                {/* Payment Mode Section */}
                <div className='mt-5 sm:mt-6 md:mt-7'>
                    <PaymentMode method={method} setMethod={setMethod} />
                </div>

                {/* Place Order Button */}
                <button
                    onClick={onSubmitHandler}
                    className='
                        w-full
                        mt-5 sm:mt-6 md:mt-7 lg:mt-8
                        text-base sm:text-lg md:text-xl lg:text-2xl
                        font-semibold
                        bg-green-700 hover:bg-green-600
                        active:bg-green-800
                        py-3 sm:py-3.5 md:py-4 lg:py-5
                        px-4 sm:px-5 md:px-6
                        rounded-lg md:rounded-xl
                        cursor-pointer
                        transition-all duration-200
                        active:scale-[0.98]
                        hover:shadow-lg
                        focus:outline-none focus:ring-4 focus:ring-green-500/50
                        disabled:opacity-50 disabled:cursor-not-allowed
                    '
                    aria-label='Place order'
                >
                    Place Order
                </button>
            </div>
        </div>
    )
}

export default CartTotals