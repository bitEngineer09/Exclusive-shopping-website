import React from 'react';
import { useContext } from 'react';
import { MdEdit } from "react-icons/md";
import { authDataContext } from '../../store/AuthContext';
import { useState } from 'react';
import { useEffect } from 'react';

const ProfileInputForm = ({ loggedinUserData = {} }) => {

    // USE STATES
    const [formData, setFormData] = useState({
        firstName: loggedinUserData.firstName || "",
        lastName: loggedinUserData.lastName || "",
        phone: loggedinUserData.phone || "",
        dob: loggedinUserData.dob || "",
        gender: loggedinUserData.gender || "",
    });
    const [isEditing, setIsEditing] = useState(false);

    // CONTEXT DATA
    const { handleUpdateUserData, setLoggedinUserData } = useContext(authDataContext);

    // HANDLE INPUT CHANGES
    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    // HANDLE FORM SUBMIT
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const updatedUser = await handleUpdateUserData(
                formData.firstName,
                formData.lastName,
                formData.phone,
                formData.dob,
                formData.gender,
            );
            console.log(updatedUser);
            if (updatedUser?.success !== false) {
                setLoggedinUserData(updatedUser.user);
                setFormData({
                    firstName: updatedUser.user.firstName || "",
                    lastName: updatedUser.user.lastName || "",
                    phone: updatedUser.user.phone || "",
                    dob: updatedUser.user.dob || "",
                    gender: updatedUser.user.gender || "",
                });
                alert("Profile updated successfully!");
                setIsEditing(false);
            } else {
                alert("Failed to update: " + updatedUser?.error);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        if (loggedinUserData) {
            setFormData({
                firstName: loggedinUserData.firstName || "",
                lastName: loggedinUserData.lastName || "",
                phone: loggedinUserData.phone || "",
                dob: loggedinUserData.dob || "",
                gender: loggedinUserData.gender || "",
            });
        }
    }, []);



    return (
        <div className='p-[1rem] sm:p-[1.5rem] md:p-[2rem]'>
            <div className='flex items-center justify-between'>
                <p className='text-[1.1rem] sm:text-[1.2rem] md:text-[1.3rem] border-l-[3px] border-rose-600 px-[0.8rem] sm:px-[1rem] mt-[0.8rem] sm:mt-[1rem]'>
                    Basic Information
                </p>
                <MdEdit
                    onClick={() => setIsEditing(!isEditing)}
                    className='text-2xl cursor-pointer'
                />
            </div>
            <form
                onSubmit={handleSubmit}
                action=""
                className='mt-[1rem] sm:mt-[1.3rem] flex flex-col gap-[0.8rem] sm:gap-[1rem]'
            >
                <div className='flex flex-col sm:flex-row items-center justify-between gap-[0.8rem] sm:gap-[1.5rem] md:gap-[2rem]'>
                    <div className='w-full'>
                        <label htmlFor="firstName" className="text-[0.8rem] sm:text-[0.9rem] text-zinc-400">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            onChange={handleChange}
                            disabled={!isEditing}
                            value={formData.firstName}
                            placeholder="Enter your First Name"
                            className='
                                w-full
                                p-[0.8rem] sm:p-[0.9rem] md:p-[1rem]
                                bg-zinc-900
                                rounded-[0.4rem] sm:rounded-[0.5rem]
                                text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]
                                outline-none
                                mt-[0.3rem]
                                focus:ring-2 focus:ring-rose-600 transition-all
                            '
                        />
                    </div>

                    <div className='w-full'>
                        <label htmlFor="lastName" className="text-[0.8rem] sm:text-[0.9rem] text-zinc-400">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            onChange={handleChange}
                            disabled={!isEditing}
                            value={formData.lastName}
                            placeholder="Enter your Last Name"
                            className='
                                w-full
                                p-[0.8rem] sm:p-[0.9rem] md:p-[1rem]
                                bg-zinc-900
                                rounded-[0.4rem] sm:rounded-[0.5rem]
                                text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]
                                outline-none
                                mt-[0.3rem]
                                focus:ring-2 focus:ring-rose-600 transition-all
                            '
                        />
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-between gap-[0.8rem] sm:gap-[1.5rem] md:gap-[2rem] mt-[0.5rem] sm:mt-[1rem]'>
                    <div className='w-full'>
                        <label htmlFor="email" className="text-[0.8rem] sm:text-[0.9rem] text-zinc-400">Email Address</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            id="email"
                            name="email"
                            value={loggedinUserData.email || "myemail@email.com"}
                            className='
                                w-full
                                p-[0.8rem] sm:p-[0.9rem] md:p-[1rem]
                                bg-zinc-900
                                rounded-[0.4rem] sm:rounded-[0.5rem]
                                text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]
                                outline-none
                                mt-[0.3rem]
                                focus:ring-2 focus:ring-rose-600 transition-all
                            '
                        />
                    </div>

                    <div className='w-full'>
                        <label htmlFor="phone" className="text-[0.8rem] sm:text-[0.9rem] text-zinc-400">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            onChange={handleChange}
                            disabled={!isEditing}
                            value={formData.phone}
                            placeholder="+91 99999 99999"
                            className='
                                w-full
                                p-[0.8rem] sm:p-[0.9rem] md:p-[1rem]
                                bg-zinc-900
                                rounded-[0.4rem] sm:rounded-[0.5rem]
                                text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]
                                outline-none
                                mt-[0.3rem]
                                focus:ring-2 focus:ring-rose-600 transition-all
                            '
                        />
                    </div>
                </div>

                <div className='flex flex-col sm:flex-row items-center justify-between gap-[0.8rem] sm:gap-[1.5rem] md:gap-[2rem] mt-[0.5rem] sm:mt-[1rem]'>
                    <div className='w-full'>
                        <label htmlFor="dob" className="text-[0.8rem] sm:text-[0.9rem] text-zinc-400">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            onChange={handleChange}
                            disabled={!isEditing}
                            value={formData?.dob ? formData?.dob?.slice(0, 10) : ""}
                            placeholder=''
                            className='
                                w-full
                                p-[0.8rem] sm:p-[0.9rem] md:p-[1rem]
                                bg-zinc-900
                                rounded-[0.4rem] sm:rounded-[0.5rem]
                                text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]
                                outline-none
                                mt-[0.3rem]
                                focus:ring-2 focus:ring-rose-600 transition-all
                            '
                        />
                    </div>

                    <div className='w-full'>
                        <label htmlFor="gender" className="text-[0.8rem] sm:text-[0.9rem] text-zinc-400">Gender</label>
                        <input
                            type="text"
                            id="gender"
                            name="gender"
                            onChange={handleChange}
                            disabled={!isEditing}
                            value={formData?.gender}
                            placeholder='Not specified'
                            className='
                                w-full
                                p-[0.8rem] sm:p-[0.9rem] md:p-[1rem]
                                bg-zinc-900
                                rounded-[0.4rem] sm:rounded-[0.5rem]
                                text-[0.9rem] sm:text-[1rem] md:text-[1.1rem]
                                outline-none
                                mt-[0.3rem]
                                focus:ring-2 focus:ring-rose-600 transition-all
                            '
                        />
                    </div>
                </div>

                {/* Save Button */}
                {isEditing && (
                    <button
                        type="submit"
                        className='mt-4 bg-indigo-700 hover:bg-indigo-600 cursor-pointer py-3 px-4 rounded text-white font-medium'
                    >
                        Save Changes
                    </button>
                )}
            </form>
        </div>
    )
}

export default ProfileInputForm;
