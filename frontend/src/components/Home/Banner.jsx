import React from 'react';
import TextPressure from '../../reactBits/TextPressure/TextPressure';

const Banner = () => {
    return (
        <>
      <TextPressure />
      <h2 className='
        text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl
        text-(--text-secondary)
        font-semibold 
        text-center
        mt-2 sm:mt-3 md:mt-5 lg:mt-7
        mb-6 sm:mb-8 md:mb-10 lg:mb-12
      '>
        Our <span className='text-rose-700'>Gallery</span>
      </h2>
      
      <div className='w-full grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10'>
        <img 
          src="https://res.cloudinary.com/dapak9w0a/image/upload/v1759754427/blackAndWhiteGirl_fqnhei.webp" 
          loading="lazy"
          alt="Black and white fashion"
          className='w-full h-64 sm:h-72 md:h-80 lg:h-full object-cover hover:scale-105  duration-300 rounded-lg' 
        />
        <img 
          src="https://res.cloudinary.com/dapak9w0a/image/upload/v1759754428/gucciPurseGirl_pezujt.webp" 
          loading="lazy"
          alt="Gucci purse style" 
          className='w-full h-64 sm:h-72 md:h-80 lg:h-full object-cover hover:scale-105  duration-300 rounded-lg' 
        />
        <img 
          src="https://res.cloudinary.com/dapak9w0a/image/upload/v1759754428/specsGirl_uzbb6x.webp" 
          loading="lazy"
          alt="Stylish eyewear" 
          className='w-full h-64 sm:h-72 md:h-80 lg:h-full object-cover hover:scale-105  duration-300 rounded-lg' 
        />
        <img 
          src="https://res.cloudinary.com/dapak9w0a/image/upload/v1759754428/twoGirlsLehanga_hfkmog.webp" 
          alt="Traditional lehanga" 
          className='w-full h-64 sm:h-72 md:h-80 lg:h-full object-cover hover:scale-105  duration-300 rounded-lg' 
        />
      </div>
    </>
    )
}

export default Banner