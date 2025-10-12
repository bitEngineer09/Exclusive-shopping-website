import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authDataContext } from '../../store/AuthContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { BsFillBagHeartFill } from "react-icons/bs";
import NavSmallerPhones from './NavSmallerPhones';
import NavDesktop from './NavDesktop';
import NavBanner from './NavBanner';
import { CgProfile } from "react-icons/cg";



const PrimaryNavbar = () => {

    // USE STATES
    const [navSelection, setNavSelection] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [showProfilePopup, setShowProfilePopup] = useState(false);

    // USE LOCATION
    const location = useLocation();
    const currentPath = location.pathname;

    // USE NAVIGATE
    const navigate = useNavigate();

    // CONTEXT DATA
    const { setLoggedinUserData, loggedinUserData, handleLogout } = useContext(authDataContext);
    // console.log(loggedinUserData);


    const handleNavSelection = (navItem) => {
        setNavSelection(navItem);
    };

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);


    return (
        <div>
            {/* NAV LINKS LAPTOPS / DESKTOPS */}
            <NavDesktop
                handleNavSelection={handleNavSelection}
                loggedinUserData={loggedinUserData}
                setLoggedinUserData={setLoggedinUserData}
                navSelection={navSelection}
                handleLogout={handleLogout}
                currentPath={currentPath}
                navigate={navigate}
                showProfilePopup={showProfilePopup}
                setShowProfilePopup={setShowProfilePopup}
            />

            {/* NAV LINKS MOBILE */}
            <div className='relative w-full h-[4rem] sm:h-[4.3rem] flex xl:hidden items-center bg-black px-3 sm:px-4 z-50'>
                <div className='w-full flex items-center justify-between relative text-white'>
                    {/* LOGO */}
                    <div className='flex items-center justify-between w-43 sm:w-52 relative'>
                        <p
                            onClick={() => navigate("/")}
                            className='text-3xl sm:text-4xl font-medium cursor-pointer text-(--text-secondary)'>
                            exclusive
                        </p>
                        <BsFillBagHeartFill className='text-[1.5rem] sm:text-[1.7rem] text-(--color-primary) ml-2' />
                    </div>

                    {/* HAMBURGER */}
                    <div className='flex items-center justify-between gap-3 sm:gap-4'>
                        {
                            loggedinUserData ?
                                (
                                    <div
                                        onClick={() => navigate("/profile")}
                                        className='select-none cursor-pointer text-white text-xl sm:text-2xl font-medium bg-pink-700 w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex items-center justify-center rounded-full'>
                                        {loggedinUserData?.name?.charAt(0)?.toUpperCase()}
                                    </div>
                                )
                                :
                                (
                                    <CgProfile
                                        onClick={() => navigate("/login")}
                                        className='text-3xl sm:text-4xl text-rose-600 hover:scale-110 duration-150 ease-in-out hover:text-zinc-400 cursor-pointer' />
                                )
                        }
                        {
                            !isOpen
                                ? <GiHamburgerMenu
                                    onClick={() => setIsOpen(true)}
                                    className='text-2xl sm:text-3xl text-(--text-secondary) cursor-pointer hover:text-(--color-primary) transition-colors' />
                                :
                                <RxCross2
                                    onClick={() => setIsOpen(false)}
                                    className='text-2xl sm:text-3xl text-(--text-secondary) cursor-pointer hover:text-(--color-primary) transition-colors'
                                />
                        }
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {
                isOpen && (
                    <div className='fixed inset-0 z-40 xl:hidden'>
                        {/* Backdrop */}
                        <div 
                            onClick={() => setIsOpen(false)}
                            className='absolute inset-0 '
                        />
                        
                        {/* Menu Panel */}
                        <div className='absolute top-[4rem] sm:top-[4.3rem] right-0 h-[calc(100vh-4rem)] sm:h-[calc(100vh-4.3rem)] w-[17rem] sm:w-[20rem] overflow-y-auto'>
                            <NavSmallerPhones
                                handleNavSelection={handleNavSelection}
                                loggedinUserData={loggedinUserData}
                                setLoggedinUserData={setLoggedinUserData}
                                navSelection={navSelection}
                                handleLogout={handleLogout}
                                navigate={navigate}
                            />
                        </div>
                    </div>
                )
            }

            {
                currentPath !== "/auth" && <NavBanner />
            }
        </div>

    )
}

export default PrimaryNavbar