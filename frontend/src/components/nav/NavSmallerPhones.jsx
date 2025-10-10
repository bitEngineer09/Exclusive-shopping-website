import React from 'react';
import { IoSearch } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { LuBookHeart } from "react-icons/lu";
import { FaHeadphones } from "react-icons/fa";
import { MdCurrencyRupee } from "react-icons/md";
import { GrCart } from "react-icons/gr";
import { TbLogout } from "react-icons/tb";
import { BiLogIn } from "react-icons/bi";
import { FaRegHeart } from "react-icons/fa";
import { GiClothes } from "react-icons/gi";


const NavSmallerPhones = ({
    handleNavSelection,
    loggedinUserData,
    setLoggedinUserData,
    navSelection,
    handleLogout,
    navigate
}) => {



    return (
        <div className='w-full h-full flex flex-col backdrop-blur-2xl bg-black/70 border-l-2 border-zinc-600'>

            {/* NAV SEARCH */}
            <div className='relative w-full border-b-[2px] border-zinc-700 py-3 px-4'>
                <input
                    type="text"
                    name=""
                    id=""
                    placeholder='What are you looking for?'
                    className='searchInput w-full h-[2.5rem] sm:h-[2.8rem] text-[0.9rem] sm:text-[1rem] px-3 sm:px-4 pr-10 outline-none rounded text-white'/>
                <IoSearch className='text-[1rem] sm:text-[1.1rem] text-(--text-secondary) absolute right-6 sm:right-7 top-1/2 -translate-y-1/2 cursor-pointer hover:text-(--color-primary) transition-colors'/>
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
                <p className='flex items-center w-34 sm:w-35 justify-between gap-5 tracking-w font-medium'>Home <IoHomeOutline className='text-xl' /> </p>
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
                <p className='flex items-center w-34 sm:w-35 justify-between gap-5 tracking-w font-medium'>About <LuBookHeart className='text-xl' /> </p>
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
                <p className='flex items-center w-34 sm:w-35 justify-between gap-5 tracking-w font-medium'>Contact <FaHeadphones className='text-xl' /> </p>
            </div>

            <div
                onClick={() => {
                    handleNavSelection("collections")
                    navigate("/collections")
                }}
                className={`
                    text-[1rem] sm:text-[1.1rem] font-medium
                    border-b-[1px] border-zinc-700 text-(--text-secondary) 
                    w-full py-3 sm:py-4
                    flex items-center justify-center
                    cursor-pointer hover:bg-white/5 active:bg-white/10
                    transition-all duration-200
                    ${navSelection === "collections" ? "bg-white/10 text-(--color-primary)" : ""}
                `}>
                <p className='flex items-center w-34 sm:w-35 justify-between gap-5 tracking-w font-medium'>Collections <GiClothes className='text-xl' /> </p>
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
                <p className='flex items-center w-34 sm:w-35 justify-between gap-5 tracking-w font-medium'>Cart <GrCart className='text-xl' /> </p>
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
                <p className='flex items-center w-34 sm:w-35 justify-between gap-5 tracking-w font-medium'>Wishlist <FaRegHeart className='text-xl' /> </p>
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
                <p className='flex items-center w-34 sm:w-35 justify-between gap-5 tracking-w font-medium'>Orders <MdCurrencyRupee className='text-xl' /> </p>
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
                        <p className='flex items-center w-34 sm:w-35 justify-between gap-5 tracking-w font-medium'>Log in <BiLogIn className='text-xl' /></p>
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
                        <p className='flex items-center w-34 sm:w-35 justify-between gap-5 tracking-w font-medium'>Log out <TbLogout className='text-xl' /></p>
                    </div>
            }
        </div>
    )
}

export default NavSmallerPhones