import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { productDataContext } from '../../store/ProductContext';
import { MdOutlineCurrencyRupee } from "react-icons/md";
import RatingStars from '../RatingStars';

const CartRecommendation = () => {

    // USE STATES
    const [products, setProducts] = useState([]);

    // USE NAVIGATE
    const navigate = useNavigate();

    // CONTEXT DATA
    const { getAllProductsData } = useContext(productDataContext);

    // GET RANDOM PRODUCT
    const getRandomProduct = (allProducts, count) => {
        const shuffled = [...allProducts].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, count);
    }

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getAllProductsData();
                const randomSix = getRandomProduct(response.products, 6);
                setProducts(randomSix);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, [])

    return (
       <div className='
    w-full
    p-4 md:p-6
    flex 
    lg:flex-col
    overflow-x-auto
    lg:overflow-x-visible
    gap-4 md:gap-5 lg:gap-6
    mt-6
    rounded-xl
    bg-zinc-900
    scrollbar-hide
'>
    {
        products.map((pro) => {
            return (
                <div
                    key={pro._id}
                    className='
                        flex 
                        flex-col lg:flex-row
                        flex-shrink-0
                        w-48 sm:w-56 lg:w-full
                        gap-3 lg:gap-4
                        text-white
                        group
                        cursor-pointer
                    '
                    onClick={() => navigate(`/collections/${pro._id}`)}
                >
                    {/* PRODUCT IMAGE */}
                    <div className='
                        w-full lg:w-32 xl:w-36
                        flex-shrink-0
                    '>
                        <img
                            src={pro.image1}
                            alt={pro.name}
                            loading="lazy"
                            className='
                                w-full
                                aspect-[3/4]
                                rounded-lg 
                                object-cover
                                group-hover:opacity-80
                                transition-opacity duration-200
                            '
                        />
                    </div>

                    {/* PRODUCT DETAILS */}
                    <div className='flex flex-col gap-2 flex-1'>
                        {/* PRODUCT NAME */}
                        <h4 className='
                            text-sm md:text-base
                            text-zinc-200
                            line-clamp-2
                            leading-relaxed
                            group-hover:text-rose-400
                            transition-colors duration-200
                        '>
                            {pro.name}
                        </h4>

                        {/* RATING */}
                        <div className='flex items-center'>
                            <RatingStars rating={5} />
                        </div>

                        {/* PRICE */}
                        <p className='
                            flex items-center 
                            text-lg md:text-xl
                            font-semibold
                            mt-1
                        '>
                            <MdOutlineCurrencyRupee />
                            {pro.price.toLocaleString()}
                        </p>

                        {/* CTA BUTTON */}
                        <button
                            className='
                                text-xs md:text-sm
                                mt-2
                                bg-rose-900
                                hover:bg-rose-800
                                text-white
                                rounded-full
                                py-2 px-4
                                transition-colors duration-200
                                text-center
                                font-medium
                                whitespace-nowrap
                            '>
                            See all Buying Options
                        </button>
                    </div>
                </div>
            )
        })
    }
</div>
    )
}

export default CartRecommendation