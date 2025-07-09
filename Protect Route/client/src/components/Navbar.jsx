import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('user'); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/'); // go back to login
  };

  return (
    <nav 
    className="flex justify-between items-center px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-500 text-white">
      <div className="text-xl font-bold">
        <Link to="/dashboard">MyApp</Link>
      </div>

      <div className="space-x-4">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200 transition font-semibold "
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:underline">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
