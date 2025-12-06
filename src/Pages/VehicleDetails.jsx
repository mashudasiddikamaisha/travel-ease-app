import React, { use } from "react";
import { useLoaderData  } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import toast from "react-hot-toast";

const VehicleDetails = () => {
    const {result: vehicle} = useLoaderData();
    const { user } = use(AuthContext);

    const handleBooking = async () => {
        if (!user?.email) {
            toast.error("Please Login for booking");
            return;
        }

        const bookingData = {
            vehicleId: vehicle._id,
            vehicleName: vehicle.vehicleName,
            pricePerDay: vehicle.pricePerDay,
            image: vehicle.coverImage,
            userEmail: user.email,
            ownerEmail: vehicle.userEmail,
            ownerName: vehicle.owner,
            createdAt: new Date(),
        }

        try {
            const res = await fetch("http://localhost:3000/bookings", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(bookingData)
        });

        const data = await res.json();
        if (data.result?.insertedId) {
            toast.success("Vehicles Booked Successfully");
        }
        else {
            toast.error("Failed to book this vehicle");
        }
        }
        catch(err) {
            toast.error("Booking Failed. Try Again.");
        }
    }

    return (
        <div className="max-w-5xl mx-auto mt-5 p-6 rounded-lg shadow-md bg-[#f3f4f2] border border-[#d8ddd6]">
            <div className="flex flex-col md:flex-row gap-6">

                <img src={vehicle.coverImage} alt={vehicle.vehicleName} className="w-full md:w-1/2 h-auto rounded-lg object-cover border border-[#d8ddd6]" />

                <div className="flex-1 flex flex-col gap-4">

                    <h1 className="text-3xl font-bold text-[#6b756a]">{vehicle.vehicleName}</h1>

                    <p className="text-gray-700"><span className="font-bold text-[#6b756a]">Category:</span> {vehicle.category}</p>

                    <p className="text-gray-700"><span className="font-bold text-[#6b756a]">Location:</span> {vehicle.location}</p>

                    <p className="text-gray-700"><span className="font-bold text-[#6b756a]">Price:</span> ${vehicle.pricePerDay} / day</p>

                    <p className="text-gray-700"><span className="font-bold text-[#6b756a]">Availability:</span> {vehicle.availability}</p>

                    <p className="text-gray-700"><span className="font-bold text-[#6b756a]">Owner:</span> {vehicle.owner}</p>

                    <p className="text-[#596159] mt-4">{vehicle.description || "No additional description available."}</p>

                    <button onClick={handleBooking} className="mt-auto bg-[#6b756a] hover:bg-[#596159] text-white py-2 px-6 rounded-md font-semibold transition border border-[#596159]">Book Now</button>
                </div>
            </div>
        </div>
    )
};

export default VehicleDetails;
