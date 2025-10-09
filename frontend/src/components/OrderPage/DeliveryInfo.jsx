import React from "react";
import { CiUser } from "react-icons/ci";
import { IoMailOutline } from "react-icons/io5";
import { BiPhoneCall } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { GoHome } from "react-icons/go";
import { LuGlobe } from "react-icons/lu";
import { FaRegMap } from "react-icons/fa6";
import { LuHash } from "react-icons/lu";
import { MdPrivacyTip } from "react-icons/md";

const DeliveryInfo = ({
    firstName,
    lastName,
    email,
    street,
    city,
    state,
    pincode,
    country,
    phone,
    onChangeHandler
}) => {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="mb-6 sm:mb-8 text-center mt-4">
                <h2 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight '>
                    DELIVERY <span className="text-pink-600">information</span>
                </h2>
                <p className="text-sm sm:text-base text-gray-400 mt-2">
                    Please fill in your shipping details carefully
                </p>
            </div>

            {/* Form Container */}
            <form className='bg-zinc-950 p-5 sm:p-6 md:p-8 lg:p-10 rounded-xl md:rounded-2xl shadow-2xl border border-slate-800'>

                {/* Personal Information Section */}
                <div className="mb-6 sm:mb-8">
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <CiUser className="w-5 h-5 text-pink-600" />
                        Personal Details
                    </h3>

                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                        {/* First Name */}
                        <div className='group'>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                                First Name <span className="text-pink-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={firstName}
                                    onChange={onChangeHandler}
                                    placeholder="Gautam"
                                    required
                                    className='w-full h-12 sm:h-13 md:h-14 px-4 pl-10 rounded-lg text-white bg-zinc-900 border-2 border-zinc-800 outline-none text-sm sm:text-base placeholder:text-gray-500 focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 transition-all duration-200'
                                />
                                <CiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-pink-600 transition-colors" />
                            </div>
                        </div>

                        {/* Last Name */}
                        <div className='group'>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                                Last Name <span className="text-pink-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={lastName}
                                    onChange={onChangeHandler}
                                    placeholder="Yadav"
                                    required
                                    className='w-full h-12 sm:h-13 md:h-14 px-4 pl-10 rounded-lg text-white bg-zinc-900 border-2 border-zinc-800 outline-none text-sm sm:text-base placeholder:text-gray-500 focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 transition-all duration-200'
                                />
                                <CiUser className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-pink-600 transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Email */}
                    <div className='mt-4 sm:mt-5 group'>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                            Email Address <span className="text-pink-600">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChangeHandler}
                                placeholder="someone@example.com"
                                required
                                className='w-full h-12 sm:h-13 md:h-14 px-4 pl-10 rounded-lg text-white bg-zinc-900 border-2 border-zinc-800 outline-none text-sm sm:text-base placeholder:text-gray-500 focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 transition-all duration-200'
                            />
                            <IoMailOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-pink-600 transition-colors" />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className='mt-4 sm:mt-5 group'>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-2">
                            Phone Number <span className="text-pink-600">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={phone}
                                onChange={onChangeHandler}
                                placeholder="+91 99999 99999"
                                required
                                className='w-full h-12 sm:h-13 md:h-14 px-4 pl-10 rounded-lg text-white bg-zinc-900 border-2 border-zinc-800 outline-none text-sm sm:text-base placeholder:text-gray-500 focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 transition-all duration-200'
                            />
                            <BiPhoneCall className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-pink-600 transition-colors" />
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="border-t border-slate-800 my-6 sm:my-8"></div>

                {/* Address Information Section */}
                <div>
                    <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <SlLocationPin className="w-5 h-5 text-pink-600" />
                        Shipping Address
                    </h3>

                    {/* Street */}
                    <div className='group mb-4 sm:mb-5'>
                        <label htmlFor="street" className="block text-sm font-medium text-gray-300 mb-2">
                            Street Address <span className="text-pink-600">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="text"
                                name="street"
                                id="street"
                                value={street}
                                onChange={onChangeHandler}
                                placeholder="123 Main Street, Apartment 4B"
                                required
                                className='w-full h-12 sm:h-13 md:h-14 px-4 pl-10 rounded-lg text-white bg-zinc-900 border-2 border-zinc-800 outline-none text-sm sm:text-base placeholder:text-gray-500 focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 transition-all duration-200'
                            />
                            <GoHome className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-pink-600 transition-colors" />
                        </div>
                    </div>

                    {/* City and State */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5'>
                        <div className="group">
                            <label htmlFor="city" className="block text-sm font-medium text-gray-300 mb-2">
                                City <span className="text-pink-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={city}
                                    onChange={onChangeHandler}
                                    placeholder="New Delhi"
                                    required
                                    className='w-full h-12 sm:h-13 md:h-14 px-4 pl-10 rounded-lg text-white bg-zinc-900 border-2 border-zinc-800 outline-none text-sm sm:text-base placeholder:text-gray-500 focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 transition-all duration-200'
                                />
                                <FaRegMap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-pink-600 transition-colors" />
                            </div>
                        </div>

                        <div className="group">
                            <label htmlFor="state" className="block text-sm font-medium text-gray-300 mb-2">
                                State / Province <span className="text-pink-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="state"
                                    name="state"
                                    value={state}
                                    onChange={onChangeHandler}
                                    placeholder="Delhi"
                                    required
                                    className='w-full h-12 sm:h-13 md:h-14 px-4 pl-10 rounded-lg text-white bg-zinc-900 border-2 border-zinc-800 outline-none text-sm sm:text-base placeholder:text-gray-500 focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 transition-all duration-200'
                                />
                                <FaRegMap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-pink-600 transition-colors" />
                            </div>
                        </div>
                    </div>

                    {/* Pincode and Country */}
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5'>
                        <div className='group'>
                            <label htmlFor="pincode" className="block text-sm font-medium text-gray-300 mb-2">
                                Pincode / ZIP <span className="text-pink-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="pincode"
                                    name="pincode"
                                    value={pincode}
                                    onChange={onChangeHandler}
                                    placeholder="110001"
                                    required
                                    className='w-full h-12 sm:h-13 md:h-14 px-4 pl-10 rounded-lg text-white bg-zinc-900 border-2 border-zinc-800 outline-none text-sm sm:text-base placeholder:text-gray-500 focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 transition-all duration-200'
                                />
                                <LuHash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-pink-600 transition-colors" />
                            </div>
                        </div>

                        <div className='group'>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-300 mb-2">
                                Country <span className="text-pink-600">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="country"
                                    name="country"
                                    value={country}
                                    onChange={onChangeHandler}
                                    placeholder="India"
                                    required
                                    className='w-full h-12 sm:h-13 md:h-14 px-4 pl-10 rounded-lg text-white bg-zinc-900 border-2 border-zinc-800 outline-none text-sm sm:text-base placeholder:text-gray-500 focus:border-pink-600 focus:ring-2 focus:ring-pink-600/20 transition-all duration-200'
                                />
                                <LuGlobe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 group-focus-within:text-pink-600 transition-colors" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Note */}
                <div className="mt-6 sm:mt-8 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <p className="text-xs sm:text-sm text-gray-400 flex items-center gap-2">
                        <MdPrivacyTip className="text-pink-600" />
                        <span>Your personal information is secure and will only be used for delivery purposes.</span>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default DeliveryInfo;