import React from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { FiInstagram } from 'react-icons/fi';
import { Link } from 'react-router';

const Footer = () => {
    return (
        <footer className="w-full bg-[#788475] text-white py-10 mt-10">
            <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Website Name */}
                <div className="text-4xl font-bold text-center md:text-left">
                    TravelEase
                </div>

                {/* Copyright */}
                <div className="text-sm opacity-90 text-center md:text-left">
                    © {new Date().getFullYear()} TravelEase. All rights reserved.
                </div>

                {/* Social Links */}
                <div className="flex gap-6">
                    <Link
                        to="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition"
                    >
                        <FaFacebook size={28} />
                    </Link>

                    <Link
                        to="https://twitter.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition"
                    >
                        <FaTwitter size={28} />
                    </Link>

                    <Link
                        to="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition"
                    >
                        <FiInstagram size={28} />
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
