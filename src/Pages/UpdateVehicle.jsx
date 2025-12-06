import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import Loading from "./Loading";

const UpdateVehicle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [vehicle, setVehicle] = useState(null);
    const [formData, setFormData] = useState({
        vehicleName: "",
        owner: "",
        category: "",
        pricePerDay: "",
        coverImage: "",
        location: "",
    });

    useEffect(() => {
        fetch(`http://localhost:3000/vehicles/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setVehicle(data.result);
                setFormData({
                    vehicleName: data.result.vehicleName || "",
                    owner: data.result.owner || "",
                    category: data.result.category || "",
                    pricePerDay: data.result.pricePerDay || "",
                    coverImage: data.result.coverImage || "",
                    location: data.result.location || "",
                });
            })
            .catch((err) => {
                toast.error("Failed to fetch vehicle data.");
                console.error(err);
            });
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`http://localhost:3000/vehicles/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.modifiedCount > 0) {
                toast.success("Vehicle updated successfully!");
                setTimeout(() => navigate("/my-vehicles"), 1500);
            } else {
                toast.error("No changes were made.");
            }
        } catch (err) {
            toast.error("Failed to update vehicle.");
            console.error(err);
        }

    };

    if (!vehicle) {
        return <Loading></Loading>
    }

    return (<div className="max-w-xl mx-auto p-6"> <h2 className="text-2xl font-bold mb-4 text-[#6b756a]">Update Vehicle</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label> Vehicle Name
                <input type="text" name="vehicleName" value={formData.vehicleName} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
            </label>

            <label> Owner Name
                <input type="text" name="owner" value={formData.owner} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
            </label>

            <label> Category
                <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
            </label>

            <label> Price per Day
                <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
            </label>

            <label> Cover Image URL
                <input type="text" name="coverImage" value={formData.coverImage} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
            </label>

            <label> Location
                <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full px-3 py-2 border rounded-md" required />
            </label>

            <button type="submit" className="bg-[#6b756a] text-white py-2 rounded-md hover:bg-[#586158] transition">Save Updates</button>
        </form>

        <ToastContainer position="top-right" autoClose={2000} hideProgressBar />
    </div>

    );
};

export default UpdateVehicle;
