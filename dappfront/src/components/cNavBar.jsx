// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const CNavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto">
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link to="/consumer" className="text-white hover:text-gray-300">
              Visit Shop
            </Link>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </nav>
  );
};

export default CNavBar;