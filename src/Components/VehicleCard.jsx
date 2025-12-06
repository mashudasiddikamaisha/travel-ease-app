import React from "react";
import { Link } from "react-router";

const VehicleCard = ({ vehicle }) => {
    return (
    <div className="bg-[#6b756a] shadow-md rounded-lg overflow-hidden w-full max-w-sm transition hover:shadow-xl hover:bg-[#5e655e]">
        <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="h-48 w-full object-cover" />
        <div className="p-4 text-white">
            <h2 className="text-xl font-semibold mb-1">{vehicle.vehicleName}</h2>
            <p className="text-gray-200 text-sm">Category: <span className="font-medium">{vehicle.category}</span></p>
            <p className="text-gray-200 text-sm">Location: <span className="font-medium">{vehicle.location}</span></p>
            <p className="text-lg font-bold mt-2 text-[#a8c0a2]">${vehicle.pricePerDay} / day</p>
            <p className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium ${vehicle.availability === "Available" ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}>{vehicle.availability}</p>
            <Link to={`/vehicleDetails/${vehicle._id}`}>
                <button className="w-full mt-4 bg-[#5e655e] hover:bg-[#4f574f] transition text-white py-2 rounded-md font-medium">View Details</button>
            </Link>
        </div>
    </div>
    );


};

export default VehicleCard;
