import React, { useContext, useEffect, useState } from 'react';
import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import { authDataContext } from '../store/AuthContext';
import ProfileInputForm from '../components/Profile/ProfileInputForm';
import Footer from '../components/Footer/Footer';

const Profile = () => {
    // CONTEXT DATA
    const { loggedinUserData, isLoggedIn, checkAuth } = useContext(authDataContext);
    const [loading, setLoading] = useState(true);
    
    // Debug logs
    console.log("Profile Page - loggedinUserData:", loggedinUserData);
    console.log("Profile Page - isLoggedIn:", isLoggedIn);

    // Check authentication on component mount
    useEffect(() => {
        const verifyAuth = async () => {
            setLoading(true);
            try {
                // Re-check authentication
                await checkAuth?.();
            } catch (error) {
                console.error("Auth check failed:", error);
            } finally {
                setLoading(false);
            }
        };

        verifyAuth();
    }, [checkAuth]);

    // If no user data, show loading or redirect
    if (loading) {
        return (
            <div className='w-full min-h-screen bg-(--bg-color) flex flex-col'>
                <PrimaryNavbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-white text-xl">Loading profile...</div>
                </div>
            </div>
        );
    }

    if (!loggedinUserData) {
        return (
            <div className='w-full min-h-screen bg-(--bg-color) flex flex-col'>
                <PrimaryNavbar />
                <div className="flex-1 flex items-center justify-center">
                    <div className="text-white text-xl text-center">
                        <p>Please log in to view your profile</p>
                        <button 
                            onClick={() => window.location.href = '/auth'}
                            className="mt-4 px-6 py-2 bg-rose-700 rounded-lg hover:bg-rose-600"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const memberDate = new Date(loggedinUserData?.createdAt).toDateString();

    return (
        <div className='w-full min-h-screen bg-(--bg-color) flex flex-col'>
            {/* NAVBAR */}
            <PrimaryNavbar />

            {/* LEFT PROFILE CARD */}
            <div className='
                w-full
                px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-40
                mt-6 md:mt-8
            '>
                <p className='text-white text-sm md:text-base'>
                    Home / <span className='text-(--color-primary)'>Profile</span>
                </p>
            </div>

            {/* MAIN CONTAINER */}
            <div className='
                flex-1
                px-4 sm:px-6 md:px-8 lg:px-12 xl:px-24 2xl:px-40
                py-6 md:py-8
                flex flex-col lg:flex-row 
                gap-6 md:gap-8
                text-white
                mb-8 md:mb-12 lg:mb-16
            '>

                {/* LEFT SIDE - PROFILE CARD & STATS */}
                <aside className='
                    w-full lg:w-80 xl:w-96
                    flex flex-col 
                    gap-4 md:gap-6
                    lg:sticky lg:top-8
                    lg:h-fit
                '>
                    {/* PROFILE CARD */}
                    <div className='
                        bg-zinc-800
                        flex flex-col 
                        items-center 
                        gap-4
                        p-6 md:p-8
                        rounded-xl
                    '>
                        {/* PROFILE AVATAR */}
                        <div className='
                            flex items-center justify-center 
                            bg-rose-700
                            w-20 h-20 md:w-24 md:h-24
                            rounded-full
                            text-4xl md:text-5xl 
                            font-semibold
                            shadow-lg
                        '>
                            {loggedinUserData?.name?.charAt(0)?.toUpperCase() || 'U'}
                        </div>

                        {/* NAME */}
                        <h2 className='
                            text-xl md:text-2xl 
                            font-semibold
                            text-center
                        '>
                            {loggedinUserData?.name || 'User'}
                        </h2>

                        {/* EMAIL */}
                        <p className='
                            text-sm md:text-base
                            text-zinc-400
                            tracking-wide
                            text-center
                            break-all
                        '>
                            {loggedinUserData?.email || 'No email provided'}
                        </p>
                    </div>
                </aside>

                {/* RIGHT SIDE - PROFILE INFORMATION */}
                <main className='flex-1 flex flex-col gap-6'>
                    {/* PERSONAL INFORMATION CARD */}
                    <div className='rounded-xl bg-zinc-800 overflow-hidden'>
                        {/* HEADER */}
                        <div className='
                            bg-zinc-900
                            border-b-2 border-zinc-700
                            p-6 md:p-8
                        '>
                            <h1 className='
                                text-2xl md:text-3xl lg:text-4xl
                                font-semibold
                                mb-2
                            '>
                                Personal <span className='text-rose-700'>Information</span>
                            </h1>
                            <p className='
                                text-sm md:text-base
                                text-zinc-400
                            '>
                                Manage your account details and preferences
                            </p>
                        </div>

                        {/* PROFILE INPUT FORM */}
                        <ProfileInputForm loggedinUserData={loggedinUserData} />
                    </div>

                    {/* MEMBER SINCE BADGE */}
                    <div className='
                        flex items-center justify-center
                        sm:justify-start
                        p-4 md:p-5
                        bg-rose-800 
                        hover:bg-rose-700
                        rounded-lg
                        transition-colors duration-200
                        text-center sm:text-left
                        font-medium
                    '>
                        Member since: <span className='ml-2 font-bold'>{memberDate}</span>
                    </div>
                </main>
            </div>

            {/* FOOTER */}
            <Footer />
        </div>
    )
}

export default Profile