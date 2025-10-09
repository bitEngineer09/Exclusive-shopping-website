import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { authDataContext } from '../../store/AuthContext';
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";
import { BsFillBagHeartFill } from "react-icons/bs";
import NavSmallerPhones from './NavSmallerPhones';
import NavDesktop from './NavDesktop';
import NavBanner from './NavBanner';

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


    return (
        <>
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
            <div
                className='
                    relative
                    w-full h-[3.5rem] sm:h-[4rem]
                    flex xl:hidden items-center
                    bg-black
                    px-3 sm:px-4
                '>
                <div className='w-full flex items-center justify-between relative'>
                    <div className='flex items-center relative'>
                        <p className='text-[1.3rem] sm:text-[1.6rem] font-medium cursor-pointer text-(--text-secondary)'>
                            exclusive
                        </p>
                        <BsFillBagHeartFill
                            className='
                                text-[1.2rem] sm:text-[1.5rem] text-(--color-primary)
                                absolute left-[6.8rem] sm:left-[8.1rem] top-[0.2rem] sm:top-[0.3rem]
                            '/>
                    </div>
                    {
                        !isOpen
                            ? <GiHamburgerMenu
                                onClick={() => setIsOpen(true)}
                                className='text-[1.3rem] sm:text-[1.5rem] text-(--text-secondary) cursor-pointer hover:text-(--color-primary) transition-colors' />
                            :
                            <RxCross2
                                onClick={() => setIsOpen(false)}
                                className='text-[1.3rem] sm:text-[1.5rem] text-(--text-secondary) cursor-pointer hover:text-(--color-primary) transition-colors'
                            />
                    }
                </div>

                {
                    isOpen ?
                        <div className='absolute top-full left-0 w-full z-50'>
                            {/* FOR SMALLER PHONES */}
                            <NavSmallerPhones
                                handleNavSelection={handleNavSelection}
                                loggedinUserData={loggedinUserData}
                                setLoggedinUserData={setLoggedinUserData}
                                navSelection={navSelection}
                                handleLogout={handleLogout}
                                navigate={navigate}
                            />
                        </div>
                        : null
                }
            </div>

            <NavBanner />
        </>

    )
}

export default PrimaryNavbar