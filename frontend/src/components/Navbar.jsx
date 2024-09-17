import React from 'react';

function Navbar({ isLoggedIn, onLogout, userName }) {
  return (
    <nav className="bg-indigo-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className='text-white '>{userName && `Welcome ${userName.toUpperCase()}`}</h1>
        <h1 className="text-2xl font-bold text-white mx-auto">TODO-APP</h1>
        {isLoggedIn && (
          <button
            onClick={onLogout}
            className="text-white bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
