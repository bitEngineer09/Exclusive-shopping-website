import React, { useContext, useEffect, useState } from 'react';
import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import { orderDataContext } from '../store/OrderContext';
import OrderItems from '../components/OrderPage/OrderItems';
import Footer from '../components/Footer/Footer';
import { Ring2 } from 'ldrs/react';
import 'ldrs/react/Ring2.css';



const MyOrder = () => {

    const [loading, setLoading] = useState(true);

    // CONTEXT DATA
    const { orderData } = useContext(orderDataContext);

    useEffect(() => {
        if (orderData.length >= 0) {
            setLoading(false);
        }
    }, [orderData]);


    return (
        <div className='w-full min-h-screen bg-(--bg-color) flex flex-col'>
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
                        <div>
                            {/* BREADCRUMB */}
                            <div className='
        w-full
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-40
        mt-6 md:mt-8
    '>
                                <p className='text-white text-sm md:text-base'>
                                    Home / <span className='text-(--color-primary)'>Orders</span>
                                </p>
                            </div>

                            {/* PAGE HEADER */}
                            <div className='my-3 md:my-5'>
                                <h1 className="
                        flex items-center justify-center 
                        gap-2 md:gap-3
                        text-3xl sm:text-4xl md:text-5xl lg:text-6xl
                        font-semibold
                        mb-3 md:mb-4
                        text-white
                        text-center
                        px-4
                        ">
                                    My <span className='text-rose-700'>Orders</span>
                                </h1>
                                <p className='
                        text-white 
                        text-base md:text-lg lg:text-xl
                        text-center 
                        tracking-wide
                        px-4
                        '>
                                    Track and manage all your purchases in one place
                                </p>
                            </div>

                            {/* ORDER ITEMS */}
                            <OrderItems orderData={orderData} />

                            {/* FOOTER */}
                            <Footer />
                        </div>
                    )
            }
        </div>
    )
}

export default MyOrder