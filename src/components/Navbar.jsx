import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Navbar() {
  return (
    <nav className="bg-gray-800 shadow p-4 flex justify-between items-center">
        <div className="container mx-auto flex items-center">
        <img src={logo} alt="Logo" className="h-10 w-10 mr-2" />

        </div>
      {/* <div className="text-xl font-bold text-blue-500">
        <Link to="/">BookLibrary</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="text-white hover:text-blue-300">Home</Link>
        <Link to="/library" className="text-white hover:text-blue-300">Library</Link>
        <Link to="/login" className="text-white hover:text-blue-300">Login</Link>
        <Link to="/signup" className="text-white hover:text-blue-300">Sign Up</Link>
      </div> */}
    </nav>
  );
}

export default Navbar;