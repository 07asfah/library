import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";


function Navbar() {
    return (
        <nav className=" mb-0 bg-[#e6e6e6] position-fixed shadow p-4">
        <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center">
            <span className="text-xl font-medium text-black-500">
                <Link to="/">BookLibrary</Link>
            </span>
            </div>
            <div className="space-x-4 flex items-center justify-center gap-20">
            <NavLink to="/" className={({ isActive }) => isActive? "text-gray-700 font-medium": "text-black"}>Home</NavLink>
            <NavLink to="/library" className={({ isActive }) => isActive? "text-gray-700 font-medium": "text-black"}>My Books</NavLink>
            <NavLink to="/BookDetail" className={({ isActive }) => isActive? "text-gray-700 font-medium": "text-black"}>Browse</NavLink>
            </div>
            <div className="flex items-center space-x-4">
            <Link to="/login" className="bg-green-600 text-white border border-gray-300 rounded-lg px-4 py-2 hover:hover:bg-green-700 hover:text-white transition">Login</Link>
            <Link to="/signup" className="bg-green-600 text-white border border-gray-300 rounded-lg px-4 py-2 hover:hover:bg-green-700 hover:text-white transition">Sign Up</Link>
            </div>
            
        </div>
        </nav>
    );
}

export default Navbar;