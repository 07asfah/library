import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">BookLibrary</h3>
            <p className="text-gray-300">Your personal book collection manager</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <ul>
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/library" className="text-gray-300 hover:text-white">Library</Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400">
          <p>© {new Date().getFullYear()} BookLibrary. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;