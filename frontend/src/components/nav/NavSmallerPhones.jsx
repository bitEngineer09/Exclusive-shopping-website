import React from 'react';
import { IoSearch } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { LuBookHeart } from "react-icons/lu";
import { FaHeadphones } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { GrCart } from "react-icons/gr";
import { TbLogout } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRegHeart } from "react-icons/fa";



const NavSmallerPhones = ({
    handleNavSelection,
    loggedinUserData,
    setLoggedinUserData,
    navSelection,
    handleLogout,
    navigate
}) => {



    return (
        <div
            className='
                absolute z-50
                w-[20rem] top-[-1px] right-0 border-2 md:border-3 rounded-xl border-rose-600
                flex flex-col items-center justify-center bg-black/90 backdrop-blur-md
                max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] overflow-y-auto
            '>

            {/* NAV SEARCH */}
            <div className='relative w-full border-b-[2px] border-rose-700 py-3 px-4'>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='What are you looking for?'
                    className='
                        searchInput
                        w-full h-[2.5rem] sm:h-[2.8rem]
                        text-[0.9rem] sm:text-[1rem]
                        px-3 sm:px-4 pr-10
                        outline-none rounded text-white
                    '/>
                <IoSearch
                    className='
                        text-[1rem] sm:text-[1.1rem] text-(--text-secondary)
                        absolute right-6 sm:right-7 top-1/2 -translate-y-1/2
                        cursor-pointer hover:text-(--color-primary) transition-colors
                    '/>
            </div>

            <div
                onClick={() => {
                    handleNavSelection("profile");
                    if (loggedinUserData) {
                        navigate("/profile");
                    } else {
                        navigate("/auth");
                    }
                }}
                className={`
                    text-[1rem] sm:text-[1.1rem] font-medium
                    border-b-[1px] border-zinc-700 text-(--text-secondary) 
                    w-full py-3 sm:py-4
                    flex items-center justify-center
                    cursor-pointer hover:bg-white/5 active:bg-white/10
                    transition-all duration-200
                    ${navSelection === "profile" ? "bg-white/10 text-(--color-primary)" : ""}
                `}>
                <div className='flex items-center justify-center gap-4'>
                    <div className="profile flex flex-col items-center justify-between">                               {
                        loggedinUserData ?
                            (<p
                                className='select-none cursor-pointer text-white text-zl md:text-2xl font-medium bg-pink-700 size-9 md:size-11 flex items-center justify-center rounded-full'>{loggedinUserData?.name?.charAt(0)?.toUpperCase()}</p>)
                            :
                            <CgProfile
                                className='
                                    text-5xl text-rose-600
                                    hover:scale-112 duration-150 ease-in-out
                                    hover:text-zinc-400
                                    cursor-pointer
                                '/>
                    }
                    </div>
                    <p>Profile</p>
                </div>

            </div>

            <div
                onClick={() => {
                    handleNavSelection("home")
                    navigate("/")
                }}
                className={`
                    text-[1rem] sm:text-[1.1rem] font-medium
                    border-b-[1px] border-zinc-700 text-(--text-secondary) 
                    w-full py-3 sm:py-4
                    flex items-center justify-center
                    cursor-pointer hover:bg-white/5 active:bg-white/10
                    transition-all duration-200
                    ${navSelection === "home" ? "bg-white/10 text-(--color-primary)" : ""}
                `}>
                <p className='flex items-center w-25 sm:w-30 justify-between gap-5'>Home <IoHomeOutline className='text-xl' /> </p>
            </div>

            <div
                onClick={() => {
                    handleNavSelection("about")
                    navigate("/about")
                }}
                className={`
                    text-[1rem] sm:text-[1.1rem] font-medium
                    border-b-[1px] border-zinc-700 text-(--text-secondary) 
                    w-full py-3 sm:py-4
                    flex items-center justify-center
                    cursor-pointer hover:bg-white/5 active:bg-white/10
                    transition-all duration-200
                    ${navSelection === "about" ? "bg-white/10 text-(--color-primary)" : ""}
                `}>
                <p className='flex items-center w-25 sm:w-30 justify-between gap-5'>About <LuBookHeart className='text-xl' /> </p>
            </div>

            <div
                onClick={() => {
                    handleNavSelection("contact")
                    navigate("/contact")
                }}
                className={`
                    text-[1rem] sm:text-[1.1rem] font-medium
                    border-b-[1px] border-zinc-700 text-(--text-secondary) 
                    w-full py-3 sm:py-4
                    flex items-center justify-center
                    cursor-pointer hover:bg-white/5 active:bg-white/10
                    transition-all duration-200
                    ${navSelection === "contact" ? "bg-white/10 text-(--color-primary)" : ""}
                `}>
                <p className='flex items-center w-25 sm:w-30 justify-between gap-5'>Contact <FaHeadphones className='text-xl' /> </p>
            </div>

            <div
                onClick={() => {
                    handleNavSelection("cart");
                    if (loggedinUserData) {
                        navigate("/cart");
                    } else {
                        navigate("/auth");
                    }
                }}
                className={`
                    text-[1rem] sm:text-[1.1rem] font-medium
                    border-b-[1px] border-zinc-700 text-(--text-secondary) 
                    w-full py-3 sm:py-4
                    flex items-center justify-center
                    cursor-pointer hover:bg-white/5 active:bg-white/10
                    transition-all duration-200
                    ${navSelection === "cart" ? "bg-white/10 text-(--color-primary)" : ""}
                `}>
                <p className='flex items-center w-25 sm:w-30 justify-between gap-5'>Cart <GrCart className='text-xl' /> </p>
            </div>

            <div
                onClick={() => {
                    handleNavSelection("wishlist");
                    if (loggedinUserData) {
                        navigate("/wishlist");
                    } else {
                        navigate("/auth");
                    }
                }}
                className={`
                    text-[1rem] sm:text-[1.1rem] font-medium
                    border-b-[1px] border-zinc-700 text-(--text-secondary) 
                    w-full py-3 sm:py-4
                    flex items-center justify-center
                    cursor-pointer hover:bg-white/5 active:bg-white/10
                    transition-all duration-200
                    ${navSelection === "wishlist" ? "bg-white/10 text-(--color-primary)" : ""}
                `}>
                <p className='flex items-center w-25 sm:w-30 justify-between gap-5'>Wishlist <FaRegHeart className='text-xl' /> </p>
            </div>

            <div
                onClick={() => {
                    handleNavSelection("orders");
                    if (loggedinUserData) {
                        navigate("/myorder");
                    } else {
                        navigate("/auth");
                    }
                }}
                className={`
                    text-[1rem] sm:text-[1.1rem] font-medium
                    border-b-[1px] border-zinc-700 text-(--text-secondary) 
                    w-full py-3 sm:py-4
                    flex items-center justify-center
                    cursor-pointer hover:bg-white/5 active:bg-white/10
                    transition-all duration-200
                    ${navSelection === "orders" ? "bg-white/10 text-(--color-primary)" : ""}
                `}>
                <p className='flex items-center w-25 sm:w-30 justify-between gap-5'>Orders <MdCurrencyRupee className='text-xl' /> </p>
            </div>


            {
                !loggedinUserData ?
                    <div
                        onClick={() => {
                            handleNavSelection("login");
                            navigate('/auth');
                        }}
                        className={`
                            text-[1rem] sm:text-[1.1rem] font-medium
                            border-b-[1px] border-zinc-700 text-(--text-secondary) 
                            w-full py-3 sm:py-4
                            flex items-center justify-center
                            cursor-pointer hover:bg-white/5 active:bg-white/10
                            transition-all duration-200
                            ${navSelection === "login" ? "bg-white/10 text-(--color-primary)" : ""}
                        `}>
                        <p className='flex items-center w-25 sm:w-30 justify-between gap-5'>Log in <BiLogIn className='text-xl' /></p>
                    </div> :

                    <div
                        onClick={() => {
                            handleNavSelection("logout");
                            handleLogout();
                            setLoggedinUserData(null);
                        }}
                        className={`
                            text-[1rem] sm:text-[1.1rem] font-medium
                            border-b-[1px] border-zinc-700 text-(--text-secondary)
                            w-full py-3 sm:py-4
                            flex items-center justify-center
                            cursor-pointer hover:bg-red-500/10 active:bg-red-500/20
                            transition-all duration-200
                            ${navSelection === "logout" ? "bg-red-500/20 text-red-400" : ""}
                        `}>
                        <p className='flex items-center w-25 sm:w-30 justify-between gap-5'>Log out <TbLogout className='text-xl' /></p>
                    </div>
            }
        </div>
    )
}

export default NavSmallerPhones