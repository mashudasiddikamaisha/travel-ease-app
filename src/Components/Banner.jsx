import React from "react";
import { Link } from "react-router";
import travel from '../assets/car_rent.jpeg'

const Banner = () => {
  return (
    <section className="relative w-full h-[90vh] flex items-center justify-center text-center overflow-hidden">
      
      <img
        src={travel} alt="Hero Background"
        className="absolute w-full h-full object-cover -z-10"
      />

      <div className="absolute inset-0 bg-black/40 -z-10"></div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 text-white max-w-2xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
          Welcome to TravelEase
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          Find the best vehicles for your journey, anytime, anywhere.
        </p>

        <Link to="/vehicles">
          <button className="btn bg-[#788475] hover:bg-[#657064] text-white px-6 py-3 rounded-lg text-lg transition">
            All Vehicles
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Banner;
