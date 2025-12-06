import React, { use, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { IoSunnyOutline } from "react-icons/io5";
import { FaBars, FaMoon } from "react-icons/fa6";

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const { user, logOut } = use(AuthContext);
    const [theme, setTheme] = useState("light");

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        document.querySelector("html").setAttribute("data-theme", newTheme);
    };

    const handleLogout = () => {
        logOut()
            .then(() => toast.success("You logged out successfully"))
            .catch(() => toast.error("Logout Failed"));
    };

    return (
        <nav className="w-full bg-[#788475] shadow-md px-6 py-3">
            <div className="flex justify-between items-center">
                <div className="text-3xl font-bold text-white">
                    <Link to="/">TravelEase</Link>
                </div>

                <button
                    className="md:hidden text-white text-3xl"
                    onClick={() => setOpen(!open)}
                >
                    <FaBars />
                </button>

                <div className="hidden md:flex gap-6 text-white text-lg">
                    <Link to="/">Home</Link>
                    <Link to="/vehicles">All Vehicles</Link>
                    <Link to="/add-vehicle">Add Vehicle</Link>
                    <Link to="/my-vehicles">My Vehicles</Link>
                    <Link to="/my-bookings">My Bookings</Link>
                </div>

                <div className="hidden md:flex items-center gap-3 text-white">
                    <button
                        onClick={toggleTheme}
                        className="px-3 py-1 rounded bg-white text-[#788475] hover:bg-gray-300 transition"
                    >
                        {theme === "light" ? (
                            <>
                                <FaMoon className="inline mr-1" /> Dark
                            </>) : (<>
                                <IoSunnyOutline className="inline mr-1" /> Light
                            </>)}
                    </button>

                    {!user ? (
                        <>
                            <Link to="/login" className="px-3 py-1 rounded hover:bg-white hover:text-[#788475] transition">Login</Link>
                            <Link to="/register" className="px-3 py-1 rounded hover:bg-white hover:text-[#788475] transition">Register</Link>
                        </>
                    ) : (
                        <>
                            <div className="relative group cursor-pointer">
                                <img alt="user" src={user.photoURL} className="w-10 h-10 rounded-full border" />
                                <div className="absolute hidden group-hover:block bg-white text-black p-2 rounded shadow-md text-sm mt-1 whitespace-nowrap">
                                    {user.displayName}
                                </div>
                            </div>
                            <button onClick={handleLogout} className="text-white px-3 py-1 rounded hover:bg-white hover:text-[#788475] transition">Log Out</button>
                        </>
                    )}
                </div>
            </div>

            {open && (
                <div className="md:hidden mt-3 flex flex-col gap-3 text-white text-lg bg-[#6b756a] p-4 rounded-lg animate-slideDown">
                    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="/vehicles" onClick={() => setOpen(false)}>All Vehicles</Link>
                    <Link to="/add-vehicle" onClick={() => setOpen(false)}>Add Vehicle</Link>
                    <Link to="/my-vehicles" onClick={() => setOpen(false)}>My Vehicles</Link>
                    <Link to="/my-bookings" onClick={() => setOpen(false)}>My Bookings</Link>
                    <button
                        onClick={toggleTheme}
                        className="px-3 py-1 rounded bg-white text-[#788475] hover:bg-gray-300 transition"
                    >
                        {theme === "light" ? (
                            <>
                                <FaMoon className="inline mr-1" /> Dark
                            </>) : (<>
                                <IoSunnyOutline className="inline mr-1" /> Light
                            </>)}
                    </button>

                    {!user ? (
                        <>
                            <Link to="/login" onClick={() => setOpen(false)}>Login</Link>
                            <Link to="/register" onClick={() => setOpen(false)}>Register</Link>
                        </>
                    ) : (
                        <div className="flex items-center gap-3 mt-3">
                            <img alt="user" src={user.photoURL} className="w-10 h-10 rounded-full border" />
                            <span>{user.displayName}</span>
                            <button onClick={handleLogout} className="ml-auto">Log Out</button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
