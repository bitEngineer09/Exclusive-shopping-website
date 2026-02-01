import React from 'react';
import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import ModelSlider from '../components/Home/ModelSlider';
import LatestCollections from '../components/Home/LatestCollections';
import Footer from '../components/Footer/Footer';
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Home/Banner';

const Home = () => {

  const navigate = useNavigate();

  return (
    <div className='bg-(--bg-color) min-h-screen'>
      {/* NAV BAR */}
      <PrimaryNavbar />

      {/* MAIN CONTENT */}
      <div className='pb-12 md:pb-16 lg:pb-20'>

        <Banner />

        {/* MODEL SLIDER */}
        <h2 className='
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            text-(--text-secondary)
            font-semibold 
            text-center
             mt-7 md:my-8 lg:my-15
             mb-3
          '>
          Start <span className='text-rose-700'>Shopping </span>Now
        </h2>
        <div className='relative'>
          <ModelSlider />
          <button
            onClick={() => navigate('collections')}
            className="
              shopNow absolute
              left-3 top-4 sm:left-4 sm:top-6
              md:left-6 md:top-8 lg:left-8 lg:bottom-12
              xl:left-12 xl:bottom-16 2xl:left-16 2xl:bottom-20
              px-6 py-2.5 sm:px-8 sm:py-3
              lg:px-12 lg:py-4 h-11 sm:h-15
              text-sm sm:text-base lg:text-lg
              font-medium sm:font-semibold
              rounded-lg bg-black text-(--text-secondary) 
              hover:bg-white hover:text-(--color-primary)
              transition-all duration-200 cursor-pointer
              shadow-lg hover:shadow-xl hover:scale-105
          ">
            SHOP NOW
          </button>
        </div>

        {/* SLIDER END */}
        <div className='px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-45'>

          {/* LATEST COLLECTIONS */}
          <section className='mt-7 md:mt-16 lg:mt-20'>
            <LatestCollections navigate={navigate} />
          </section>

        </div>
      </div>

      {/* FOOTER SECTION */}
      <Footer />

    </div>
  )
}

export default Home