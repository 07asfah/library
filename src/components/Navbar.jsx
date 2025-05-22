import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAdmin } from '../context/AdminContext';

function Navbar() {
    const { isAdmin } = useAdmin();
    const [user, setUser] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        // Check if user is logged in
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            setUser(JSON.parse(currentUser));
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('userToken');
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem('userToken');
        window.location.reload();
    };

    return (
        <nav className="mb-0 bg-[#e6e6e6] position-fixed shadow p-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center">
                    <span className="text-xl font-medium text-black-500">
                        <Link to="/">BookLibrary</Link>
                    </span>
                </div>
                <div className="space-x-4 flex items-center justify-center gap-20">
                    <NavLink to="/" className={({ isActive }) => isActive ? "text-gray-700 font-medium" : "text-black"}>
                        Home
                    </NavLink>
                    <NavLink to="/library" className={({ isActive }) => isActive ? "text-gray-700 font-medium" : "text-black"}>
                        My Books
                    </NavLink>
                    {isAdmin && (
                        <NavLink to="/BookDetail" className={({ isActive }) => isActive ? "text-gray-700 font-medium" : "text-black"}>
                            Add Books
                        </NavLink>
                    )}
                </div>
                <div className="flex items-center space-x-4">
                    {isAdmin ? (
                        <>
                            <Link 
                                to="/BookDetail" 
                                className="bg-slate-700 text-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-slate-600 transition"
                            >
                                Add Books
                            </Link>
                            <button 
                                onClick={() => {
                                    localStorage.removeItem('adminToken');
                                    window.location.reload();
                                }}
                                className="bg-rose-600 text-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-rose-700 transition"
                            >
                                Logout
                            </button>
                        </>
                    ) : user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowDropdown(!showDropdown)}
                                className="flex items-center space-x-2 bg-white rounded-lg px-4 py-2 hover:bg-gray-50 transition border border-gray-300"
                            >
                                <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center">
                                    <span className="text-white font-medium">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-gray-700">{user.name}</span>
                                <svg 
                                    className={`w-4 h-4 text-gray-500 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1">
                                    <div className="px-4 py-2 border-b border-gray-100">
                                        <p className="text-sm text-gray-500">Signed in as</p>
                                        <p className="text-sm font-medium text-gray-900">{user.email}</p>
                                    </div>
                                    <Link
                                        to="/library"
                                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        My Library
                                    </Link>
                                    <button
                                        onClick={handleLogout}
                                        className="block w-full text-left px-4 py-2 text-sm text-rose-600 hover:bg-gray-50"
                                    >
                                        Sign out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="bg-slate-700 text-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-slate-600 transition">
                                Login
                            </Link>
                            <Link to="/signup" className="bg-slate-700 text-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-slate-600 transition">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;