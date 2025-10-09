import React, { useContext, useEffect, useState } from 'react';
import { productDataContext } from '../../store/ProductContext';
import { GoHeartFill } from "react-icons/go";
import { useNavigate } from 'react-router-dom';

const RecommendedProducts = ({ category, ID }) => {

    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const { getAllProductsData } = useContext(productDataContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProductsData();
                setProducts(response.products);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, [])

    // console.log(products)

    return (
        <>
            {/* SECTION HEADING */}
            <h2 className='
                    text-xl sm:text-2xl md:text-3xl
                    text-white
                    font-semibold
                    mt-16 md:mt-20 lg:mt-24
                    mb-8 md:mb-10 lg:mb-12
                    text-center 
                    bg-slate-900 
                    py-3 md:py-4
            '>
                Recommended For You
            </h2>

            {/* PRODUCTS CARD */}
            <div className='px-3 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-20'>
                <div className='
                    w-full 
                    pb-8 md:pb-12 lg:pb-10
                    overflow-x-auto
                    scrollbar-hide
                '>
                    <div className='
                        flex
                        flex-nowrap
                        gap-4 md:gap-5 lg:gap-6
                    '>
                        {
                            products
                                .filter(item => item.category === category && item._id !== ID)
                                .slice(0, 12)
                                .map((product) => (
                                    <div
                                        key={product._id}
                                        onClick={() => navigate(`/collections/${product._id}`)}
                                        className="
                                          flex-shrink-0
                                          w-64 sm:w-72 md:w-80
                                          bg-stone-900
                                          rounded-lg
                                          overflow-hidden
                                          cursor-pointer
                                          hover:shadow-xl
                                          transition-all duration-300
                                          hover:scale-[1.02]
                                          flex flex-col
                                        ">
                                        {/* PRODUCT IMAGE */}
                                        <div className='
                                            relative
                                            w-full
                                            aspect-[3/4]
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
                                            <p className='
                                                text-zinc-300
                                                text-sm md:text-base
                                                line-clamp-2
                                                min-h-[2.5rem] md:min-h-[3rem]
                                                leading-relaxed
                                            '>
                                                {product.name}
                                            </p>

                                            <div className='
                                                flex items-center 
                                                justify-between
                                                gap-2
                                                mt-auto
                                                '>
                                                <p className='
                                                    text-white 
                                                    text-lg md:text-xl lg:text-2xl
                                                    font-semibold
                                                    whitespace-nowrap
                                                    '>
                                                    ₹{product.price.toLocaleString()}
                                                </p>

                                                <div className='
                                                    flex items-center 
                                                    gap-1.5 md:gap-2
                                                    px-2.5 md:px-3
                                                    py-1 md:py-1.5
                                                    text-xs md:text-sm
                                                    text-white
                                                    font-medium
                                                    bg-rose-800
                                                    rounded-full
                                                    whitespace-nowrap
                                                    flex-shrink-0
                                                    '>
                                                    <span>Top Selling</span>
                                                    <GoHeartFill className='
                                                                w-3.5 h-3.5 md:w-4 md:h-4
                                                                text-zinc-200
                                                                '/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}

export default RecommendedProducts