import React, { useContext } from 'react';
import NavBanner from './NavBanner';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../../store/AuthContext';
import { BsFillBagHeartFill } from "react-icons/bs";

const Nav = () => {


  const { handleLogout, admin } = useContext(authDataContext);



  const navigate = useNavigate();

  return (
    <>
      <div
        className='
        nav
        w-full h-20 sm:h-24 md:h-28 lg:h-32
        flex items-center justify-between
        gap-2 sm:gap-3
        px-4 sm:px-6 
        bg-zinc-950
        text-white
        border-b-2 border-zinc-700
        md:px-4 
        '>

        {/* LOGO SECTION */}
        <div
          onClick={() => navigate('/')}
          className='flex items-center gap-[0.4rem] cursor-pointer'>
          <p className='text-5xl md:text-6xl xl:text-7xl font-medium text-(--text-secondary)'>exclusive
          </p>
          <BsFillBagHeartFill className='text-4xl md:text-5xl xl:text-6xl text-(--color-primary)' />
        </div>

        {/* LOG OUT BTN */}
        {
          admin ?
            <button
              onClick={() => {
                handleLogout()
                navigate('/login');
              }}
              className='
          w-24 sm:w-28 md:w-32 lg:w-36 xl:w-40
          h-10 sm:h-12 md:h-14 lg:h-16 xl:h-18
          text-white text-md sm:text-lg md:text-xl lg:text-2xl
          rounded-lg
          bg-rose-700 hover:bg-rose-800
          transition-colors duration-200
          cursor-pointer
        '>
              <span>Log out
              </span>
            </button>
            : ""
        }
      </div>
      <NavBanner />
    </>
  )
}

export default Nav