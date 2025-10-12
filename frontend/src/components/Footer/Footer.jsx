import React, { useContext } from 'react';
import { FaArrowRight } from "react-icons/fa";
import FooterSecondary from './FooterSecondary';
import { useLocation, useNavigate } from 'react-router-dom';
import { authDataContext } from '../../store/AuthContext';
import ExploreMore from '../Home/ExploreMore';

const Footer = () => {

  // USE NAVIGATE
  const navigate = useNavigate();

  const location = useLocation();
  const currentPath = location.pathname;

  // CONTEXT DATA
  const { loggedinUserData } = useContext(authDataContext);

  return (
    <>
      {
        currentPath !== "/auth" && <ExploreMore /> 
      }
      <div className='
        w-full
        px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20
        pt-12 md:pt-16 lg:pt-20
        pb-8 md:pb-12
        bg-[var(--bg-footer)]
      '>
        <div className='
          grid 
          grid-cols-1 
          lg:grid-cols-[1fr_auto]
          gap-8 lg:gap-12 xl:gap-16
        '>
          {/* LEFT SECTION - Links Grid */}
          <div className='
            grid 
            grid-cols-2 
            sm:grid-cols-3 
            md:grid-cols-4
            gap-6 md:gap-8
          '>
            {/* Account Column */}
            <div>
              <h3 className='
                text-base md:text-lg
                font-semibold 
                text-(--color-primary)
                mb-4
              '>
                Account
              </h3>
              <ul className='
                text-(--text-secondary) 
                space-y-2
                text-sm md:text-base
              '>
                <li onClick={() => {
                  if (loggedinUserData) {
                    navigate('/profile');
                  } else {
                    navigate('/auth')
                  }
                }} className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>My Account</li>
                <li onClick={() => navigate('/auth')} className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Login / Register</li>
                <li onClick={() => {
                  if (loggedinUserData) {
                    navigate('/cart');
                  } else {
                    navigate('/auth')
                  }
                }} className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Cart</li>
                <li onClick={() => {
                  if (loggedinUserData) {
                    navigate('/wishlist');
                  } else {
                    navigate('/auth')
                  }
                }} className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Wishlist</li>
                <li onClick={() => navigate('/collections')} className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Shop</li>
              </ul>
            </div>

            {/* Company Column */}
            <div>
              <h3 className='
                text-base md:text-lg
                font-semibold 
                text-(--color-primary)
                mb-4
              '>
                Company
              </h3>
              <ul className='
                text-(--text-secondary) 
                space-y-2
                text-sm md:text-base
              '>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>About Us</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Delivery</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Legal Notice</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Terms of Service</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Privacy Policy</li>
              </ul>
            </div>

            {/* Get Help Column */}
            <div>
              <h3 className='
                text-base md:text-lg
                font-semibold 
                text-(--color-primary)
                mb-4
              '>
                Get Help
              </h3>
              <ul className='
                text-(--text-secondary) 
                space-y-2
                text-sm md:text-base
              '>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>FAQ</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Shipping</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Returns</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Order Status</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Payment Options</li>
              </ul>
            </div>

            {/* Connect Column */}
            <div>
              <h3 className='
                text-base md:text-lg
                font-semibold 
                text-(--color-primary)
                mb-4
              '>
                Connect
              </h3>
              <ul className='
                text-(--text-secondary) 
                space-y-2
                text-sm md:text-base
              '>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Facebook</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Twitter</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>Instagram</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>LinkedIn</li>
                <li className='hover:text-(--color-primary) transition-colors duration-200 cursor-pointer'>YouTube</li>
              </ul>
            </div>
          </div>

          {/* RIGHT SECTION - Newsletter */}
          <div className='lg:w-80 xl:w-96'>
            <h3 className='
              text-base md:text-lg
              font-semibold 
              text-(--color-primary)
              mb-4
            '>
              Subscribe to Newsletter
            </h3>
            <p className='
              text-(--text-secondary)
              text-sm md:text-base
              mb-4
            '>
              Get updates about our latest products and offers.
            </p>
            <div className='flex h-12 md:h-14'>
              <input
                type="email"
                placeholder='Email Address'
                className='
                  flex-1
                  px-4
                  border border-zinc-300
                  outline-none
                  bg-white
                  text-sm md:text-base
                  focus:ring-2 focus:ring-(--color-primary)
                  transition-all duration-200
                '
              />
              <button
                className="
                  w-12 md:w-14
                  h-full
                  text-lg md:text-xl
                  flex items-center justify-center
                  bg-(--color-primary)
                  text-(--text-secondary)
                  hover:bg-rose-600
                  transition-colors duration-200
                  cursor-pointer
                "
                aria-label="Subscribe"
              >
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <FooterSecondary />
    </>
  )
}

export default Footer