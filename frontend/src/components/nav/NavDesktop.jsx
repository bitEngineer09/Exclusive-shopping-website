import React, { useContext, useEffect, useRef, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { BsFillBagHeartFill } from "react-icons/bs";
import { GrCart } from "react-icons/gr";
import { GoHeart } from "react-icons/go";
import { CgProfile } from "react-icons/cg";
import ProfilePopUp from "../nav/ProfilePopUp";
import { AiOutlineClose } from "react-icons/ai";
import { cartDataContext } from '../../store/CartContext';
import { productDataContext } from '../../store/ProductContext';


const NavDesktop = ({
    loggedinUserData,
    currentPath,
    navigate,
    showProfilePopup, setShowProfilePopup
}) => {


    // USE STATES
    const [searchQuery, setSearchQuery] = useState("");
    const [wishListLength, setWishListLength] = useState(0);
    const [cartLength, setCartLength] = useState(0);
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // CONTEXT DATA
    const { cartItems } = useContext(cartDataContext);
    const { wishlistData, getAllProductsData } = useContext(productDataContext);


    // USE REF
    const popupRef = useRef(null);
    const searchRef = useRef(null);


    useEffect(() => {
        // console.log(cartItems)
        setCartLength(cartItems.length)
    }, [cartItems]);

    useEffect(() => {
        setWishListLength(wishlistData.length);
    }, [wishlistData]);



    // HANDLE CLICK OUTSIDE
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (popupRef.current && !popupRef.current.contains(e.target)) {
                setShowProfilePopup(false)
            }

            if (searchRef.current && !searchRef.current.contains(e.target)) {
                setFilteredProducts([]);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, []);


    // FETCH ALL PRODUCTS
    useEffect(() => {
        const fetchAllProuducts = async () => {
            try {
                const response = await getAllProductsData();
                // console.log(response.products);
                setProducts(response?.products);
                // console.log(products);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllProuducts();
    }, []);


    // SEARCH QUERY
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredProducts([]);
            return;
        }

        const filtered = products?.filter((product) =>
            product?.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredProducts(filtered);
    }, [searchQuery, products]);


    return (
        <>
            <div
                ref={popupRef}
                className='
                    w-full h-[5rem]
                    hidden xl:grid md:grid-cols-[27%_37%_36%] 2xl:grid-cols-[25%_40%_35%] items-center
                    md:px-[1rem] 
                    bg-(--bg-secondary)
                    '>

                {/* LOGO */}
                <div
                    onClick={() => navigate('/')}
                    className='flex items-center gap-[0.4rem] cursor-pointer'>
                    <p className='md:text-[2.5rem] xl:text-[2.7rem] font-medium text-(--text-secondary)'>exclusive
                    </p>
                    <BsFillBagHeartFill className='text-[2.4rem] text-(--color-primary)' />
                </div>

                {
                    currentPath !== "/auth" &&
                    <>
                        {/* NAV LINKS */}
                        <div
                            className='
                                navLists
                                flex items-center justify-center
                                w-[26vw]
                                md:gap-[2rem]
                                md:text-[1rem] xl:text-[1.1rem] 2xl:text-[1.2rem]
                                font-medium
                                '>
                            <div
                                onClick={() => {
                                    navigate('/')
                                }}
                                className={`
                                    md:w-[4.9rem] xl:w-[6rem] md:h-[2.4rem] xl:h-[2.8rem]
                                    rounded-[0.2rem]
                                    flex items-center justify-center
                                    hover:text-(--color-primary)
                                    cursor-pointer 
                                    ease-in-out duration-150
                                    ${currentPath === "/"
                                        ? "text-(--color-primary)"
                                        : "text-(--text-secondary)"}
                                `}>
                                <span>Home
                                </span>
                            </div>

                            <div
                                onClick={() => {
                                    navigate('/about')
                                }}
                                className={`
                                    md:w-[4.9rem] xl:w-[6rem] md:h-[2.4rem] xl:h-[2.8rem]
                                    flex items-center justify-center
                                    rounded-[0.2rem]
                                    cursor-pointer 
                                    ease-in-out duration-150
                                    hover:text-(--color-primary)
                                    ${currentPath.includes("/about")
                                        ? "text-(--color-primary)"
                                        : "text-(--text-secondary)"}
                                    `}>
                                <span>About
                                </span>
                            </div>

                            <div
                                onClick={() => navigate("/collections")}
                                className={`
                                    md:w-[4.9rem] xl:w-[6rem] md:h-[2.4rem] xl:h-[2.8rem]
                                    flex items-center justify-center
                                    rounded-[0.2rem]
                                    hover:text-(--color-primary)
                                    cursor-pointer 
                                    ease-in-out duration-150
                                    ${currentPath.includes("/collections")
                                        ? "text-(--color-primary)"
                                        : "text-(--text-secondary)"}
                                    `}>
                                <span>Collections
                                </span>
                            </div>

                            <div
                                onClick={() => navigate("/contact")}
                                className={`
                                    md:w-[4.9rem] xl:w-[6rem] md:h-[2.4rem] xl:h-[2.8rem]
                                    flex items-center justify-center
                                    rounded-[0.2rem]
                                    hover:text-(--color-primary)
                                    cursor-pointer 
                                    ease-in-out duration-150
                                    ${currentPath.includes("/contact")
                                        ? "text-(--color-primary)"
                                        : "text-(--text-secondary)"}
                                    `}>
                                <span>Contact
                                </span>
                            </div>

                        </div>

                        <div className="flex items-center justify-between w-full">

                            <div
                                onClick={() => {
                                    if (loggedinUserData) {
                                        navigate('/wishlist')
                                    } else {
                                        navigate('/auth')
                                    }
                                }}
                                className="wishList relative">
                                <GoHeart
                                    className='
                                        text-[1.8rem] text-rose-600
                                        hover:scale-112 duration-150 ease-in-out
                                        hover:text-zinc-400
                                        cursor-pointer
                                        '/>
                                {
                                    wishListLength > 0
                                        ? <div
                                            className='
                                                absolute top-[-17px] right-[-10px]
                                                size-[1.2rem]
                                                flex items-center justify-center
                                                text-[0.8rem] text-white
                                                rounded-full
                                                bg-rose-800
                                                '>
                                            <p>{wishListLength}</p>
                                        </div>
                                        : null
                                }
                            </div>
                            <div className="cart relative">
                                <GrCart
                                    onClick={() => {
                                        if (loggedinUserData) {
                                            navigate('/cart')
                                        } else {
                                            navigate('/auth')
                                        }
                                    }}
                                    className='
                                        text-[1.7rem] text-rose-600
                                        hover:scale-112 duration-150 ease-in-out
                                        hover:text-zinc-400
                                        cursor-pointer
                                        '/>
                                {
                                    cartLength > 0
                                        ? <div
                                            className='
                                                absolute top-[-17px] right-[-10px]
                                                size-[1.2rem]
                                                flex items-center justify-center
                                                text-[0.8rem] text-white
                                                rounded-full
                                                bg-rose-800
                                                '>
                                            <p>{cartLength}</p>
                                        </div>
                                        : null
                                }
                            </div>

                            {/* NAV SEARCH */}
                            <div    
                                ref={searchRef}
                                className='justify-self-end relative bg-zinc-200 xl:w-[62%] 2xl:w-[67%] rounded-[0.3rem]'>
                                <input
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    type="text"
                                    placeholder='What are you looking for ?'
                                    className='
                                        xl:text-[0.9rem] 2xl:text-[1.1rem]
                                        w-[90%] md:h-[2.8rem] 2xl:h-[3rem]
                                        md:px-[0.9rem] 2xl:px-[1.2rem]
                                        outline-none
                                        '/>
                                <IoSearch
                                    className='
                                        md:text-[1.1rem] 2xl:text-[1.3rem]
                                        absolute 
                                        md:right-[0.5rem] 2xl:right-[1rem]
                                        md:bottom-[0.9rem] 2xl:bottom-[0.8rem]
                                        cursor-pointer
                                        '/>
                                {
                                    filteredProducts.length > 0 && (
                                        <div
                                            className="
                                                absolute
                                                top-[110%] left-0
                                                w-full 
                                                text-white bg-black
                                                rounded-xl shadow-md
                                                z-50 max-h-[200px]
                                                overflow-y-auto
                                                border-3 border-rose-700 
                                                ">
                                            {filteredProducts.map(product => (
                                                <div
                                                    key={product.id}
                                                    onClick={() => {
                                                        navigate(`/collections/${product._id}`);
                                                        setSearchQuery("");
                                                        setFilteredProducts([]);
                                                    }}
                                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer border-b-2"
                                                >
                                                    {product.name}
                                                </div>
                                            ))}
                                        </div>
                                    )
                                }
                            </div>

                            <div className="profile w-[4rem] flex flex-col items-center justify-between">
                                {
                                    showProfilePopup
                                        ? (<AiOutlineClose
                                            onClick={() => setShowProfilePopup(!showProfilePopup)}
                                            className='
                                                text-[1.8rem] text-rose-600
                                                hover:scale-112 duration-150 ease-in-out
                                                hover:text-zinc-400
                                                cursor-pointer
                                                '/>
                                        ) : loggedinUserData ?
                                            (<p
                                                onClick={() => setShowProfilePopup(!showProfilePopup)}
                                                className='select-none cursor-pointer text-white text-3xl font-medium bg-pink-700 size-13 flex items-center justify-center rounded-full'>{loggedinUserData?.name?.charAt(0)?.toUpperCase()}</p>)
                                            : <CgProfile
                                                onClick={() => setShowProfilePopup(!showProfilePopup)}
                                                className='
                                                    text-5xl text-rose-600
                                                    hover:scale-112 duration-150 ease-in-out
                                                    hover:text-zinc-400
                                                    cursor-pointer
                                                    '/>
                                }

                            </div>
                        </div>
                    </>
                }
            </div>
            {
                showProfilePopup
                    ? <ProfilePopUp navigate={navigate} popupRef={popupRef} />
                    : null
            }
        </>
    )
}

export default NavDesktop