import React, { use } from "react";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const AddVehicle = () => {
    const { user } = use(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            vehicleName: e.target.vehicleName.value,
            owner: e.target.owner.value,
            category: e.target.category.value,
            pricePerDay: Number(e.target.pricePerDay.value),
            location: e.target.location.value,
            availability: e.target.availability.value,
            description: e.target.description.value,
            ratings: Number(e.target.ratings.value),
            yearOfManufacture: e.target.yearOfManufacture.value,
            coverImage: e.target.coverImage.value,
            userEmail: user?.email,
            createdAt: new Date(),
        };

        fetch("http://localhost:3000/vehicles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then((data) => {
                toast.success("Vehicle added successfully!");

                e.target.reset();

                setTimeout(() => {
                }, 1500);
            })
            .catch((err) => {
                toast.error("Unexpected Error Occurred!");
                console.error(err);
            });
    };

    return (
        <div className="py-10">
            <h1 className="text-center text-3xl font-bold mb-6 text-[#6b756a] dark:text-[#9aa599]">Add Vehicle</h1>

            <div className="w-11/12 mx-auto p-8 bg-base-100 dark:bg-gray-900 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 mb-20">

                <form onSubmit={handleSubmit} className="flex flex-col justify-between">

                    <div className="grid grid-cols-12 gap-8">

                        <div className="col-span-12 md:col-span-6">
                            <h2 className="text-xl font-bold mb-4 text-[#6b756a] dark:text-[#9aa599]">Vehicle Information</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block mb-1 font-semibold">Vehicle Name</label>
                                    <input type="text" name="vehicleName" required className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white" />
                                </div>

                                <div>
                                    <label className="block mb-1 font-semibold">Description</label>
                                    <textarea name="description" rows="2" className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white"></textarea>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block mb-1 font-semibold">Category</label>
                                        <select name="category" required className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white">
                                            <option value="">Select Category</option>
                                            <option>Sedan</option>
                                            <option>SUV</option>
                                            <option>Electric</option>
                                            <option>Van</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block mb-1 font-semibold">Year</label>
                                        <input type="number" name="yearOfManufacture" className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white" />
                                    </div>

                                    <div>
                                        <label className="block mb-1 font-semibold">Ratings (0-5)</label>
                                        <input type="number" name="ratings" min="0" max="5" step="0.1" className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block mb-1 font-semibold">Cover Image URL</label>
                                    <input type="url" name="coverImage" className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white" />
                                </div>

                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6">

                            <h2 className="text-xl font-bold mb-4 text-[#6b756a] dark:text-[#9aa599]">Owner & Rental Details</h2>

                            <div className="space-y-4">

                                <div>
                                    <label className="block mb-1 font-semibold">Owner Name</label>
                                    <input type="text" name="owner" required className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white" />
                                </div>

                                <div>
                                    <label className="block mb-1 font-semibold">Owner Email</label>
                                    <input type="email" name="userEmail" value={user?.email || "Unknown"} readOnly className="w-full border rounded p-2 bg-gray-200 dark:bg-gray-700 dark:text-white cursor-not-allowed" />
                                </div>

                                <div>
                                    <label className="block mb-1 font-semibold">Price Per Day (BDT)</label>
                                    <input type="number" name="pricePerDay" min="0" required className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white" />
                                </div>

                                <div>
                                    <label className="block mb-1 font-semibold">Location</label>
                                    <input type="text" name="location" required className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white" />
                                </div>

                                <div>
                                    <label className="block mb-1 font-semibold">Availability</label>
                                    <select name="availability" className="w-full border rounded p-2 dark:bg-gray-800 dark:text-white">
                                        <option>Available</option>
                                        <option>Booked</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className="w-full flex justify-center mt-8">
                        <button type="submit" className="px-8 py-3 rounded-lg font-semibold text-white bg-[#6b756a] hover:bg-[#586158] transition">Add Vehicle</button>
                    </div>

                </form>

            </div>

            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default AddVehicle;
