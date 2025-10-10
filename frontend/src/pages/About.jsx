import React from 'react';
import { FaBagShopping } from "react-icons/fa6";
import PrimaryNavbar from '../components/nav/PrimaryNavbar';
import { FaTruck } from "react-icons/fa";
import { MdOutlineSecurity } from "react-icons/md";
import { FaRegStar } from "react-icons/fa";
import { LiaAwardSolid } from "react-icons/lia";
import { stats } from '../helpers/aboutStats';
import { BsBagHeartFill } from "react-icons/bs";
import Footer from '../components/Footer/Footer';

const About = () => {

  const features = [
    {
      icon: <FaBagShopping className="size-7 md:size-8" />,
      title: "Unbeatable Deals",
      description: "Discover exclusive offers and discounts on trending products that you won't find anywhere else."
    },
    {
      icon: <FaTruck className="size-7 md:size-8" />,
      title: "Fast Delivery",
      description: "Lightning-fast shipping to get your favorite products to your doorstep in record time."
    },
    {
      icon: <MdOutlineSecurity className="size-7 md:size-8" />,
      title: "Secure Shopping",
      description: "Shop with confidence knowing your data and transactions are protected with industry-leading security."
    },
    {
      icon: <FaRegStar className="size-7 md:size-8" />,
      title: "Premium Quality",
      description: "Every product is carefully curated and quality-tested to ensure you get the best value for your money."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <PrimaryNavbar />

      {/* Hero Section */}
      <section className="relative my-8 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="flex items-center justify-center gap-2 md:gap-4 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4">
            About exclusive{" "}
            <BsBagHeartFill className="text-rose-700 text-2xl sm:text-3xl lg:text-4xl" />
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 mb-6">
            Discover unbeatable deals, trending products, and fast delivery—shop smart,
            live better, and enjoy every moment with effortless online shopping.
          </p>
          <div className="w-3/4 sm:w-1/2 md:w-1/3 h-1 bg-gradient-to-r from-rose-500 to-pink-500 mx-auto rounded-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="my-6 sm:my-10 py-8 sm:py-12 bg-stone-900 px-4 sm:px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-pink-500 mb-2 group-hover:text-pink-400">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-xs sm:text-sm md:text-base font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="px-4 sm:px-6 lg:px-10 py-10 lg:py-20 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            {/* Left */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-center lg:text-left">
                Our <span className="text-rose-500">Story</span>
              </h2>
              <div className="space-y-4 sm:space-y-6 text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed text-center lg:text-left">
                <p>
                  Founded with a vision to revolutionize online shopping, Exclusive has grown from a small startup
                  to a trusted platform serving hundreds of thousands of customers worldwide.
                </p>
                <p>
                  We believe that shopping should be an experience that brings joy, convenience, and value to your life.
                  That's why we've built a platform that combines cutting-edge technology with human-centered design.
                </p>
              </div>
            </div>

            {/* Right */}
            <div className="relative text-white">
              <div className="bg-slate-900 rounded-xl lg:rounded-3xl p-6 sm:p-8">
                <div className="flex items-center justify-center h-48 sm:h-56 lg:h-64">
                  <div className="text-center">
                    <LiaAwardSolid className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 text-pink-500 mx-auto mb-4" />
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold mb-2">Excellence Awarded</h3>
                    <p className="text-gray-300 text-sm sm:text-base">Recognized for outstanding customer service and innovation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      
      {/* Features Section */}
      <section className="py-10 lg:py-20 px-4 sm:px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              Why Choose <span className="text-rose-500">exclusive</span>
            </h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg">
              Experience the difference with our commitment to excellence
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-black/50 rounded-2xl p-6 sm:p-8 border border-gray-800 hover:border-pink-500/50 transition-all duration-300"
              >
                <div className="text-rose-500 mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default About;