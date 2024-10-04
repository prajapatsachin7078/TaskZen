import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

function Navbar({ isLoggedIn, onLogout, userName }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMyTasksClick = () => {
    if (isLoggedIn) {
      navigate('/todos'); // Navigate to My Tasks if logged in
    } else {
      navigate('/signin'); // Redirect to sign-in if not logged in
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-indigo-600 shadow-lg">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center">
          <div className="logo-container">
            <FaCheckCircle className="logo-icon text-indigo-600 text-3xl" />
          </div>
          <span className="ml-2 text-white text-2xl font-bold">TaskZen</span>
        </div>
        {/* Hamburger icon for mobile view */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isMenuOpen ? (
              <span>&times;</span> // Close icon
            ) : (
              <span>&#9776;</span> // Hamburger icon
            )}
          </button>
        </div>
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" className="text-white hover:underline">Home</Link>
          <button
            onClick={handleMyTasksClick}
            className="text-white hover:underline"
          >
            My Tasks
          </button>
          <Link to="/learn-more" className="text-white hover:underline">Learn More</Link>
          <div className="hidden md:flex items-center md:ml-auto">
            {isLoggedIn ? (
                <button
                  onClick={onLogout}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
                >
                  Log Out
                </button>
            ) : (
              <Link to="/signin" className="ml-4 text-white bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition duration-300">
                Sign In
              </Link>
            )}
          </div>
        </div>
        
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 p-4">
          <Link to="/" className="block text-white hover:underline py-2">Home</Link>
          <button
            onClick={handleMyTasksClick}
            className="block text-white hover:underline py-2"
          >
            My Tasks
          </button>
          <Link to="/learn-more" className="block text-white hover:underline py-2">Learn More</Link>

          {/* User Info and Logout in Mobile Menu */}
          {isLoggedIn && (
            <>
              <div className="text-white font-semibold mt-4">
                {userName ? `Welcome, ${userName.toUpperCase()}` : "Welcome"}
              </div>
              <button
                onClick={onLogout}
                className="mt-2 text-white bg-red-500 w-full px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                Log Out
              </button>
            </>
          )}
        </div>
      )}

      {/* User Info and Logout Button for Desktop */}
      
    </nav>
  );
}

export default Navbar;
