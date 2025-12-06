import React from "react";
import { Link } from "react-router";

const StaticSection = () => {
  return (
    <div className="w-full px-6 md:px-12 lg:px-20 py-16 space-y-20">

      <section>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
          Top Categories
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {[
            { name: "SUVs", img: "/src/assets/SUV.jpg" },
            { name: "Electric", img: "/src/assets/electric_car.jpeg" },
            { name: "Vans", img: "/src/assets/van.jpeg" },
            { name: "Sedans", img: "/src/assets/sedan.jpg" },
          ].map((category) => (
            <Link
              key={category.name}
              to="/vehicles"
              className="relative rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <img
                src={category.img}
                alt={category.name}
                className="w-full h-40 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <span className="text-white text-lg font-semibold">{category.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[#788475] rounded-lg p-8 text-white flex flex-col md:flex-row items-center gap-6">
        <img
          src="/src/assets/car_rent.jpeg"
          alt="About TravelEase"
          className="w-full md:w-1/3 rounded-lg shadow-lg"
        />
        <div className="md:w-2/3">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">About TravelEase</h2>
          <p className="text-sm md:text-base">
            TravelEase is your one-stop platform to find and book vehicles for any journey. Whether you're looking for SUVs, electric cars, vans, or sedans, we make it easy to explore and travel with confidence.
          </p>
          <Link to="/vehicles">
            <button className="btn mt-4 bg-white text-[#788475] hover:bg-gray-200 transition px-6 py-2 rounded-lg">
              Explore Vehicles
            </button>
          </Link>
        </div>
      </section>

    </div>
  );
};

export default StaticSection;
