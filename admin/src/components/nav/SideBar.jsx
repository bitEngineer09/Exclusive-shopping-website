import React from 'react';
import { FaPlus, FaCheck, FaCheckDouble } from "react-icons/fa";
import { FaList } from "react-icons/fa6";
import { useLocation, useNavigate } from 'react-router-dom';

const navItems = [
    { label: "List Items", icon: FaList, path: "/", activeColor: "bg-rose-800 hover:bg-rose-800" },
    { label: "Add Items", icon: FaPlus, path: "/add", activeColor: "bg-emerald-700 hover:bg-emerald-800" },
    { label: "View Orders", icon: FaCheck, path: "/orders", activeColor: "bg-amber-700 hover:bg-amber-700" },
    { label: "Completed Orders", icon: FaCheckDouble, path: "/completed-orders", activeColor: "bg-emerald-800 hover:bg-emerald-800" },
];

const SideBar = () => {
    const location = useLocation();
    const navigate = useNavigate();

    return (
        <div className='
            SideBar
            w-full lg:w-64 xl:w-95 2xl:w-110
            flex flex-col
            bg-[#09090B] text-white
            px-4 sm:px-6 lg:px-6 xl:px-8
            py-4 lg:py-0
        '>
            {navItems.map(({ label, icon: Icon, path, activeColor }) => (
                <div
                    key={path}
                    onClick={() => navigate(path)}
                    className={`
                        flex items-center justify-center gap-3 sm:gap-4 xl:gap-5
                        mt-4 sm:mt-6 lg:mt-8
                        w-full px-4 py-3 sm:px-6 sm:py-4 xl:px-7 xl:py-5
                        hover:bg-stone-700
                        text-base sm:text-lg lg:text-xl xl:text-2xl
                        text-white text-center
                        transition-all duration-200 rounded-lg xl:rounded-xl
                        cursor-pointer
                        ${location.pathname === path ? activeColor : ""}
                    `}>
                    <Icon className="flex-shrink-0 text-lg sm:text-xl lg:text-2xl" />
                    <span className="whitespace-nowrap">{label}</span>
                </div>
            ))}
        </div>
    );
};

export default SideBar;