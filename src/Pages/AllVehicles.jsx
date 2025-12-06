import React, { useState, useEffect } from "react";
import useVehicles from "../Hooks/useVehicles";
import VehicleCard from "../Components/VehicleCard";
import { FaSortDown } from "react-icons/fa6";
import Loading from "./Loading";

const AllVehiclesPage = () => {
const { vehicles, loading, error } = useVehicles();
const [filteredVehicles, setFilteredVehicles] = useState([]);
const [sortOption, setSortOption] = useState("");
// const [filters, setFilters] = useState({ category: "", location: "", price: "" });


// Update filtered vehicles whenever vehicles data changes  
useEffect(() => {  
    setFilteredVehicles(vehicles);  
}, [vehicles]);  

// Handle Sorting  
useEffect(() => {  
    const sortedVehicles = [...filteredVehicles];  

    if (sortOption === "LowToHigh") {  
        sortedVehicles.sort((a, b) => a.pricePerDay - b.pricePerDay);  
    } else if (sortOption === "HighToLow") {  
        sortedVehicles.sort((a, b) => b.pricePerDay - a.pricePerDay);  
    } 
    // else if (sortOption === "nameAsc") {  
    //     sortedVehicles.sort((a, b) => a.vehicleName.localeCompare(b.vehicleName));  
    // }  

    setFilteredVehicles(sortedVehicles);  
}, [sortOption]);  

// Handle Filters  
// const handleFilterChange = (e) => {  
//     const { name, value } = e.target;  
//     const newFilters = { ...filters, [name]: value };  
//     setFilters(newFilters);  

//     let tempVehicles = [...vehicles];  

//     if (newFilters.category) {  
//         tempVehicles = tempVehicles.filter(v => v.category === newFilters.category);  
//     }  
//     if (newFilters.location) {  
//         tempVehicles = tempVehicles.filter(v => v.location === newFilters.location);  
//     }  
//     if (newFilters.price) {  
//         tempVehicles = tempVehicles.filter(v => v.pricePerDay <= parseFloat(newFilters.price));  
//     }  

//     setFilteredVehicles(tempVehicles);  
// };  

if (loading) return <Loading></Loading>;  
if (error) return <p className="p-6 text-red-600">Error loading vehicles.</p>;  

return (  
    <div className="p-6">  
        <h1 className="text-3xl font-bold mb-4">All Vehicles</h1>  

        {/* Filters & Sort */}  
        <div className="flex flex-wrap gap-4 mb-6">  
            {/* <select name="category" onChange={handleFilterChange} className="p-2 border rounded">  
                <option value="">All Categories</option>  
                <option value="Car">Car</option>  
                <option value="Bike">Bike</option>  
                <option value="SUV">SUV</option>  
            </select>   */}

            {/* <select name="location" onChange={handleFilterChange} className="p-2 border rounded">  
                <option value="">All Locations</option>  
                <option value="Dhaka">Dhaka</option>  
                <option value="Chittagong">Chittagong</option>  
                <option value="Sylhet">Sylhet</option>  
            </select>   */}

            {/* <input  
                type="number"  
                name="price"  
                placeholder="Max Price"  
                onChange={handleFilterChange}  
                className="p-2 border rounded"  
            />   */}

            <select onChange={(e) => setSortOption(e.target.value)} className="p-2 border rounded">  
                <option value="">Sort By <FaSortDown size={24} /></option>  
                <option value="LowToHigh">Price: Low to High</option>  
                <option value="HighToLow">Price: High to Low</option>  
                {/* <option value="nameAsc">Name: A-Z</option>   */}
            </select>  
        </div>  

        {/* Vehicles Grid */}  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">  
            {filteredVehicles.map(vehicle => (  
                <VehicleCard key={vehicle._id} vehicle={vehicle} />  
            ))}  
        </div>  
    </div>  
)};

export default AllVehiclesPage;
