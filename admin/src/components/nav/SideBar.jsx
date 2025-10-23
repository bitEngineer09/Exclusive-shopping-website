import React, { useState } from 'react';
import { FaPlus } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';


const SideBar = () => {

    const [sideItem, setSideItem] = useState("");
    const location = useLocation();

    const navigate = useNavigate();

    return (
        <div
            className='
                SideBar
                w-full lg:w-64 xl:w-80 2xl:w-96
                h- lg:min-h-0
                flex flex-col 
                bg-stone-900 text-stone-300
                px-4 sm:px-6 lg:px-6 xl:px-8
                py-4 lg:py-0
            '>
            <div
               onClick={() => {
                        navigate("/");
                        setSideItem("listItems")
                    }}
                className={`
                    flex items-center justify-start gap-3 sm:gap-4 xl:gap-5
                    mt-4 sm:mt-6 lg:mt-8
                    w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-7 xl:py-5
                    hover:bg-stone-700 hover:text-stone-300
                    text-base sm:text-lg lg:text-xl xl:text-2xl
                    text-stone-300 text-center 
                    border-zinc-400 transition-all duration-200 rounded-lg xl:rounded-xl
                    cursor-pointer 
                    ${location.pathname === "/" ? "bg-rose-800 hover:bg-rose-800" : ""}
                `}>
                <FaList className="flex-shrink-0 text-lg sm:text-xl lg:text-2xl" />
                <span className="whitespace-nowrap">List Items</span>
            </div>

            <div
                    onClick={() => {
                        navigate("/add");
                        setSideItem("addItems")
                    }}
                    className={`
                    flex items-center justify-start gap-3 sm:gap-4 xl:gap-5
                    mt-4 sm:mt-6 lg:mt-8
                    w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-7 xl:py-5
                    hover:bg-stone-700 hover:text-stone-300
                    text-base sm:text-lg lg:text-xl xl:text-2xl
                    text-stone-300 text-center 
                    border-zinc-400 transition-all duration-200 rounded-lg xl:rounded-xl
                    cursor-pointer 
                    ${location.pathname === "/add" ? "bg-emerald-700 hover:bg-emerald-800" : ""}
                `}>
                <FaPlus className="flex-shrink-0 text-lg sm:text-xl lg:text-2xl" />
                <span className="whitespace-nowrap">Add Items</span>
            </div>
            
            <div
                onClick={() => {
                        navigate("/orders");
                        setSideItem("orders")
                    }}
                className={`
                    flex items-center justify-start gap-3 sm:gap-4 xl:gap-5
                    mt-4 sm:mt-6 lg:mt-8
                    w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-7 xl:py-5
                    hover:bg-stone-700 hover:text-stone-300
                    text-base sm:text-lg lg:text-xl xl:text-2xl
                    text-stone-300 text-center 
                    border-zinc-400 transition-all duration-200 rounded-lg xl:rounded-xl
                    cursor-pointer 
                    ${location.pathname === "/orders" ? "bg-amber-700 hover:bg-amber-700" : ""}
                `}>
                <FaCheck className="flex-shrink-0 text-lg sm:text-xl lg:text-2xl" />
                <span className="whitespace-nowrap">View Orders</span>
            </div>
        </div>
    )
}

export default SideBar