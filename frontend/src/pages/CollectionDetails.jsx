import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { productDataContext } from '../store/ProductContext';
import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import { TbTruckDelivery } from "react-icons/tb";
import { SlPaypal } from "react-icons/sl";
import { IoMdReturnLeft } from "react-icons/io";
import { FiLock } from "react-icons/fi";
import Footer from '../components/Footer/Footer';
import ItemDetails from '../components/CollectionDetails/ItemDetails';
import RecommendedProducts from '../components/CollectionDetails/RecommendedProducts';
import { cartDataContext } from '../store/CartContext';
import Review from '../components/Review/Review';
import ReviewBanner from '../components/Review/ReviewBanner';
import MoreCollections from '../components/CollectionDetails/MoreCollections';
import { Ring2 } from 'ldrs/react';
import 'ldrs/react/Ring2.css';

const CollectionDetails = () => {

    // USE STATE
    const [item, setItem] = useState({});
    const [selectedSize, setSelectedSize] = useState([]);
    const [selectedImage, setSelectedImage] = useState("");
    const [counter, setCounter] = useState(1);
    const [isZoomed, setIsZoomed] = useState(false);
    const [zoomStyle, setZoomStyle] = useState({});
    const [loading, setLoading] = useState(true);

    const handleMouseEnter = () => {
        // Only enable zoom on desktop devices
        if (window.innerWidth >= 1024) {
            setIsZoomed(true);
        }
    };

    const handleMouseLeave = () => setIsZoomed(false);

    // USE PARAMS
    const { id } = useParams();

    // CONTEXT DATA
    const { singleProduct, handleAddWishList, handleWishListData } = useContext(productDataContext);
    const { addItemsToCart } = useContext(cartDataContext);
    const imageKeys = ["image1", "image2", "image3", "image4"];


    // DATA VARIABLES
    const features = [
        { icon: <TbTruckDelivery className='text-xl sm:text-2xl lg:text-3xl mb-2 text-pink-700' />, content: "Fast Delivery" },
        { icon: <SlPaypal className='text-xl sm:text-2xl lg:text-3xl mb-2 text-pink-700' />, content: "Pay on Delivery" },
        { icon: <IoMdReturnLeft className='text-xl sm:text-2xl lg:text-3xl mb-2 text-pink-700' />, content: "10 days Return & Exchange" },
        { icon: <FiLock className='text-xl sm:text-2xl lg:text-3xl mb-2 text-pink-700' />, content: "Secure transaction" },
    ]


    // MOUSE ZOOM FUNCTION
    const handleMouseMove = (e) => {
        if (window.innerWidth < 1024) return; // Disable on mobile/tablet

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.pageX - left) / width) * 100;
        const y = ((e.pageY - top) / height) * 100;

        setZoomStyle({
            backgroundImage: `url(${item[selectedImage || "image1"]})`,
            backgroundPosition: `${x}% ${y}%`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "200%",
        });
    };

    const category = item?.category;
    const ID = item?._id;


    // COUNTER INCREMENT FUNCTION
    const handleIncrement = () => {
        setCounter((prev) => prev + 1);
    }


    // COUNTER DECREMENT FUNCTION
    const handleDecrement = () => {
        setCounter((prev) => (prev > 1) ? prev - 1 : prev);
    }

    const averageRating = item?.reviews?.length
        ? item.reviews.reduce((acc, review) => acc + review.rating, 0) / item.reviews.length
        : 0;


    // FETCH SINGLE PRODUCTS DATA
    useEffect(() => {
        const fetchSingleProductData = async (id) => {
            try {
                setLoading(true);
                const response = await singleProduct(id);
                setItem(response.product);
                setLoading(false);
                return response.product;
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleProductData(id)
    }, [id]);


    return (
        <div className='bg-zinc-950 min-h-screen flex flex-col'>
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
                            {/* Main Content Container */}
                            <div className='w-full px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16'>
                                <div className="mt-4 sm:mt-6 md:mt-8 lg:mt-10 max-w-[1920px] mx-auto">

                                    {/* Product Display Grid */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">

                                        {/* IMAGE CONTAINER */}
                                        <div className='flex flex-col space-y-3 sm:space-y-4'>

                                            {/* Mobile/Tablet: Main Image First */}
                                            <div className='block lg:hidden w-full'>
                                                <div
                                                    className='w-full h-[45vh] sm:h-[50vh] md:h-[60vh] lg:h-[80vh] relative overflow-hidden rounded-lg sm:rounded-xl'
                                                >
                                                    <img
                                                        src={item[selectedImage || "image1"]}
                                                        alt="Product main view"
                                                        className='w-full h-full object-cover'
                                                    />
                                                </div>
                                            </div>

                                            {/* Thumbnail Images - Horizontal on Mobile, Grid on Desktop */}
                                            <div className='flex flex-row lg:hidden gap-2 sm:gap-3 overflow-x-auto pb-2'>
                                                {imageKeys.map((image, index) => (
                                                    <img
                                                        key={index}
                                                        src={item[image]}
                                                        alt={`Product view ${index + 1}`}
                                                        onClick={() => setSelectedImage(image)}
                                                        className={`
                                            cursor-pointer flex-shrink-0
                                            w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24
                                            object-cover rounded-md sm:rounded-lg
                                            ${selectedImage === image ? 'ring-2 ring-pink-700' : ''}
                                            hover:opacity-75 transition-opacity
                                        `}
                                                    />
                                                ))}
                                            </div>

                                            {/* Desktop: Side-by-side Layout */}
                                            <div className='hidden lg:flex gap-3 xl:gap-4'>
                                                {/* Thumbnail Column */}
                                                <div className='flex flex-col gap-3 xl:gap-4 w-20 xl:w-24'>
                                                    {imageKeys.map((image, index) => (
                                                        <img
                                                            key={index}
                                                            src={item[image]}
                                                            alt={`Product view ${index + 1}`}
                                                            onClick={() => setSelectedImage(image)}
                                                            className={`
                                                cursor-pointer
                                                w-full h-20 xl:h-24
                                                object-cover rounded-lg
                                                ${selectedImage === image ? 'ring-2 ring-pink-700' : ''}
                                                hover:opacity-75 transition-opacity
                                            `}
                                                        />
                                                    ))}
                                                </div>

                                                {/* Main Preview Image */}
                                                <div className='flex-1'>
                                                    <div
                                                        className='w-full h-[500px] xl:h-[600px] 2xl:h-[700px] relative overflow-hidden rounded-xl'
                                                        onMouseEnter={handleMouseEnter}
                                                        onMouseLeave={handleMouseLeave}
                                                        onMouseMove={handleMouseMove}
                                                    >
                                                        <img
                                                            src={item[selectedImage || "image1"]}
                                                            alt="Product main view"
                                                            className='w-full h-full object-cover'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* PRODUCT DETAILS OR ZOOMED IMAGE */}
                                        {isZoomed ? (
                                            <div
                                                className='hidden lg:block w-full h-[500px] xl:h-[600px] 2xl:h-[700px] border border-gray-300 rounded-xl shadow-lg'
                                                style={zoomStyle}
                                            />
                                        ) : (
                                            <div className='w-full'>
                                                <ItemDetails
                                                    item={item}
                                                    counter={counter}
                                                    handleDecrement={handleDecrement}
                                                    handleIncrement={handleIncrement}
                                                    features={features}
                                                    addItemsToCart={addItemsToCart}
                                                    selectedSize={selectedSize}
                                                    setSelectedSize={setSelectedSize}
                                                    handleAddWishList={handleAddWishList}
                                                    handleWishListData={handleWishListData}
                                                    averageRating={averageRating}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>


                            {/* RECOMMENDED PRODUCTS */}
                            <RecommendedProducts category={category} ID={ID} />

                            {/* MORE COLLECTIONS */}
                            <div className='px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 mt-12 sm:mt-16 md:mt-20'>
                                <MoreCollections />
                            </div>

                            {/* REVIEWS SECTION */}
                            <div className="px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-16 mt-12 sm:mt-16 md:mt-20 lg:mt-24">
                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 lg:gap-10 xl:gap-12 max-w-[1920px] mx-auto">

                                    {/* Review Banner - Sticky on Large Screens */}
                                    <div className="order-2 xl:order-1">
                                        <div className="xl:sticky xl:top-24">
                                            <ReviewBanner />
                                        </div>
                                    </div>

                                    {/* Reviews List */}
                                    <div className='order-1 xl:order-2'>
                                        <Review id={ID} reviews={item.reviews} />
                                    </div>
                                </div>
                            </div>

                            {/* FOOTER */}
                            <div className="mt-16 sm:mt-20 md:mt-24 lg:mt-28 w-full">
                                <Footer />
                            </div>
                        </div>
                    )

            }
        </div>
    )
}

export default CollectionDetails