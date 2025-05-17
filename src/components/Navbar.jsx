import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-black shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold text-blue-600">
        <Link to="/">BookLibrary</Link>
      </div>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
        <Link to="/library" className="text-gray-700 hover:text-blue-600">Library</Link>
        <Link to="/login" className="text-gray-700 hover:text-blue-600">Login</Link>
        <Link to="/signup" className="text-gray-700 hover:text-blue-600">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;