import React, { useContext } from 'react';
// import shoppingBag from '../../assets/shopping-bag.png';
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../../store/AuthContext';
import { BsBagHeartFill } from "react-icons/bs";

const Nav = () => {


    const {handleLogout, admin} = useContext(authDataContext);



  const navigate = useNavigate();

  return (
    <div
      className='
        nav
        w-full h-20 sm:h-24 md:h-28 lg:h-32
        flex items-center justify-between
        gap-2 sm:gap-3
        px-4 sm:px-6 md:px-12
        bg-zinc-950
        text-white
        border-b-2 border-zinc-700
        '>

      {/* LOGO SECTION */}
      <div className='flex items-center gap-2'>
        <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium'>exclusive</h1>
        <BsBagHeartFill className='text-xl sm:text-2xl md:text-3xl lg:text-4xl text-rose-600' />
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
          text-stone-300 text-md sm:text-lg md:text-xl lg:text-2xl
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
  )
}

export default Nav