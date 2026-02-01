import React, { useContext, useEffect, useState } from 'react';
import { productDataContext } from '../../store/ProductContext';
import { GoHeartFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const MoreCollections = () => {

    // USE STATES
    const [products, setProducts] = useState([]);

    const { getAllProductsData } = useContext(productDataContext);

    // USE LOCATION
    const navigate = useNavigate();


    // FETCH ALL PRODUCTS
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const result = await getAllProductsData();
                setProducts(result?.products);
                // console.log(result.products);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, [getAllProductsData]);


    return (
        <>
            {/* SECTION HEADING */}
            <div className='mb-8 md:mb-12 lg:mb-16'>
                <h2 className='
                        text-2xl sm:text-3xl md:text-4xl lg:text-5xl
                        font-semibold 
                        text-center 
                        text-white
                        '>
                    Explore Some More <span className='text-rose-700'>Collections</span>
                </h2>
                <p className='
                        hidden md:block 
                        text-lg lg:text-xl xl:text-2xl
                        font-medium 
                        text-center 
                        text-white 
                        mt-4
                '>
                    Step into Style - New Collection Dropping This Season!
                </p>
            </div>

            {/* COLLECTIONS GRID */}
            <div className='
                    px-3 sm:px-4 md:px-6 lg:px-0
            '>
                <div className="
                        collectionDiv
                        grid
                        grid-cols-2
                        sm:grid-cols-2
                        md:grid-cols-3
                        lg:grid-cols-4
                        gap-x-3 sm:gap-x-4 md:gap-x-5 lg:gap-x-6
                        gap-y-4 sm:gap-y-6 md:gap-y-8 lg:gap-y-10
                        ">
                    {
                        products?.slice(-8)?.map((product) => {
                            return (
                                <div
                                    onClick={() => navigate(`/collections/${product._id}`)}
                                    key={product._id}
                                    className='
                                        collectionCard
                                        bg-stone-900 
                                        rounded-lg
                                        overflow-hidden
                                        cursor-pointer
                                        transition-all duration-300
                                        hover:scale-[1.02]
                                        flex flex-col
                                        '>
                                    {/* PRODUCT IMAGE */}
                                    <div className='
                                            relative
                                            w-full
                                            aspect-[3/3]
                                            overflow-hidden
                                            '>
                                        <img
                                            src={product.image1}
                                            alt={product.name}
                                            loading="lazy"
                                            className='
                                                w-full 
                                                h-full
                                                object-cover
                                                hover:scale-110
                                                transition-transform duration-500
                                                '/>
                                    </div>

                                    {/* PRODUCT DETAILS */}
                                    <div className="
                                            details 
                                            p-3 md:p-4
                                            flex flex-col
                                            gap-3
                                            flex-grow
                                            ">
                                        {/* PRODUCT NAME */}
                                        <p className='
                                                text-zinc-300
                                                text-xs sm:text-sm md:text-base
                                                line-clamp-2
                                                min-h-[2.5rem] md:min-h-[3rem]
                                                leading-relaxed
                                                '>
                                            {product.name}
                                        </p>

                                        {/* PRICE AND BADGE */}
                                        <div className='
                                                flex items-center justify-between
                                                gap-2
                                                mt-auto
                                                '>
                                            {/* PRICE */}
                                            <p className='
                                                    text-white 
                                                    text-base sm:text-lg md:text-xl lg:text-2xl
                                                    font-semibold
                                                    whitespace-nowrap
                                                    '>
                                                ₹{product.price.toLocaleString()}
                                            </p>

                                            {/* TOP SELLING BADGE */}
                                            <div className='
                                                    hidden sm:flex
                                                    items-center 
                                                    gap-2
                                                    px-3 py-1.5
                                                    text-xs md:text-sm
                                                    text-white
                                                    bg-rose-800
                                                    rounded-full
                                                    whitespace-nowrap
                                                    '>
                                                <span className='font-medium'>Top Selling</span>
                                                <GoHeartFill className='w-4 h-4 text-zinc-200'/>
                                            </div>
                                        </div>

                                        {/* MOBILE BADGE - Shows only on small screens */}
                                        <div className='
                                                sm:hidden
                                                flex items-center 
                                                justify-center
                                                gap-2
                                                px-3 py-1.5
                                                text-xs
                                                text-white
                                                bg-rose-800
                                                rounded-full
                                                '>
                                            <span className='font-medium'>Top Selling</span>
                                            <GoHeartFill className='w-3.5 h-3.5' />
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </>

    )
}

export default MoreCollections