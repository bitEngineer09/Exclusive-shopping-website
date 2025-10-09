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
                w-full lg:w-[18rem] xl:w-[22rem] 2xl:w-[28rem]
                min-h-screen lg:min-h-0
                flex flex-col 
                bg-[#1C1917] text-(--text-secondary)
                px-[1rem] sm:px-[2rem] lg:px-[2rem] xl:px-[3rem]
                py-[1rem] lg:py-0
            '>
            <div
               onClick={() => {
                        navigate("/");
                        setSideItem("listItems")
                    }}
                className={`
                    flex items-center justify-start gap-[1rem] sm:gap-[1.3rem] xl:gap-[1.6rem]
                    mt-[1rem] sm:mt-[1.5rem] lg:mt-[2rem]
                    w-full p-[1rem_1.5rem] sm:p-[1.2rem_1.8rem] xl:p-[1.5rem_2rem]
                    hover:bg-[#44403C] hover:text-(--text-secondary)
                    text-[1.3rem] sm:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem]
                    text-(--text-secondary) text-center 
                    border-zinc-400 transition-all duration-200 rounded-[0.7rem] xl:rounded-[0.9rem]
                    cursor-pointer 
                    ${location.pathname === "/" ? "bg-rose-800 hover:bg-rose-800" : ""}
                `}>
                <FaList className="flex-shrink-0" />
                <span>List Items</span>
            </div>

            <div
                    onClick={() => {
                        navigate("/add");
                        setSideItem("addItems")
                    }}
                    className={`
                    flex items-center justify-start gap-[1rem] sm:gap-[1.3rem] xl:gap-[1.6rem]
                    mt-[1rem] sm:mt-[1.5rem] lg:mt-[2rem]
                    w-full p-[1rem_1.5rem] sm:p-[1.2rem_1.8rem] xl:p-[1.5rem_2rem]
                    hover:bg-[#44403C] hover:text-(--text-secondary)
                    text-[1.3rem] sm:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem]
                    text-(--text-secondary) text-center 
                    border-zinc-400 transition-all duration-200 rounded-[0.7rem] xl:rounded-[0.9rem]
                    cursor-pointer 
                    ${location.pathname === "/add" ? "bg-emerald-700 hover:bg-emerald-800" : ""}
                `}>
                <FaPlus className="flex-shrink-0" />
                <span>Add Items</span>
            </div>
            
            <div
                onClick={() => {
                        navigate("/orders");
                        setSideItem("orders")
                    }}
                className={`
                    flex items-center justify-start gap-[1rem] sm:gap-[1.3rem] xl:gap-[1.6rem]
                    mt-[1rem] sm:mt-[1.5rem] lg:mt-[2rem]
                    w-full p-[1rem_1.5rem] sm:p-[1.2rem_1.8rem] xl:p-[1.5rem_2rem]
                    hover:bg-[#44403C] hover:text-(--text-secondary)
                    text-[1.3rem] sm:text-[1.6rem] lg:text-[1.8rem] xl:text-[2rem]
                    text-(--text-secondary) text-center 
                    border-zinc-400 transition-all duration-200 rounded-[0.7rem] xl:rounded-[0.9rem]
                    cursor-pointer 
                    ${location.pathname === "/orders" ? "bg-amber-700 hover:bg-amber-700" : ""}
                `}>
                <FaCheck className="flex-shrink-0" />
                <span>View Orders</span>
            </div>
        </div>
    )
}

export default SideBar