import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { models } from "../../helpers/modelSlider.js";
import "react-lazy-load-image-component/src/effects/blur.css";

const ModelSlider = () => {

  // USE STATES
  const [currentIndex, setCurrentIndex] = useState(0);


  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? models.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === models.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      className="
        relative 
        w-full 
        h-[17rem] sm:h-[22rem] md:h-[28rem] lg:h-[40rem] 2xl:h-[51.5rem]
        max-h-[56rem]
        overflow-hidden 
        mx-auto
      "
    >
      {/* Images */}
      <div
        className="flex transition-transform ease-in-out duration-700 w-full h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {models.map((model, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
          >
            <LazyLoadImage
              src={model.url}
              effect="blur"
              alt=""
              className="
                w-full h-[17rem] sm:h-full
                object-cover 
              "/>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      <button
        onClick={handlePrev}
        className="
          hidden md:block 
          absolute 
          text-[2rem] lg:text-[3rem]
          top-1/2 left-[0.5rem] -translate-y-1/2  
          text-(--text-secondary) 
          p-[0.5rem] rounded-full cursor-pointer
          hover:bg-black/20 active:bg-black/30
          transition-all duration-200
        "
      >
        <IoIosArrowBack />
      </button>

      {/* Right Arrow */}
      <button
        onClick={handleNext}
        className="
          hidden md:block 
          absolute 
          text-[2rem] lg:text-[3rem]
          top-1/2 right-[0.5rem] -translate-y-1/2  
          text-(--text-secondary) 
          p-[0.5rem] rounded-full cursor-pointer
          hover:bg-black/20 active:bg-black/30
          transition-all duration-200
        "
      >
        <IoIosArrowForward />
      </button>

      {/* Dots */}
      <div className="hidden md:flex absolute bottom-[1rem] left-1/2 -translate-x-1/2 gap-[0.5rem]">
        {models.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`
              w-[0.6rem] h-[0.6rem] lg:w-[1rem] lg:h-[1rem]
              rounded-full cursor-pointer 
              transition-all duration-300
              ${currentIndex === index ? "bg-white scale-110" : "bg-gray-400 hover:bg-gray-300"}
            `}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ModelSlider;
