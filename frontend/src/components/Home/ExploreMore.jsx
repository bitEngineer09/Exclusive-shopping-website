import React from 'react'
import { useNavigate } from 'react-router-dom'

const ExploreMore = () => {

    const navigate = useNavigate();

  return (
    <section className="py-10 lg:py-20 px-4 sm:px-6 bg-slate-900 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-4">
            Ready to Experience Exclusive?
          </h2>
          <p className="text-sm sm:text-base md:text-lg mb-6">
            Join thousands of satisfied customers and discover what makes us different.
          </p>
          <button
            onClick={() => navigate('/collections')}
            className="bg-white cursor-pointer text-pink-600 font-bold py-3 px-8 sm:py-4 sm:px-12 rounded-full text-sm sm:text-base md:text-lg hover:scale-105 transition-transform"
          >
            Start Shopping Now
          </button>
        </div>
      </section>
  )
}

export default ExploreMore