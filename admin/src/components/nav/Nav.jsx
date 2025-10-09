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
        w-full h-[9rem]
        flex items-center justify-between
        gap-[0.7rem]
        px-[5rem] bg-(--bg-secondary)
        text-(--text-secondary)
        '>

      {/* LOGO SECTION */}
      <div className='flex items-center gap-[0.5rem]'>
        <h1 className='text-[3.8rem] font-medium'>exclusive</h1>
        <BsBagHeartFill className='text-[3.2rem] text-(--color-primary)' />
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
          w-[10rem] h-[4.7rem]
          text-(--text-secondary) text-[2rem]
          rounded-[0.7rem]
        bg-rose-700
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