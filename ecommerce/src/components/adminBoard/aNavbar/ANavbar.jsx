// Navbar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faCommentDots, faHome, faSun, faLightbulb } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const ANavbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="flex justify-between items-center p-6">
      {/* Left: Profile with icon */}
      <div className="flex items-center">
      <div className="flex items-center" onClick={()=>navigate('/')}>
        <FontAwesomeIcon icon={faHome} className="h-6 w-6 mr-2" />
        <a href="#" className="text-lg hover:text-gray-400">Home</a>
        </div>

       <div className="flex ml-2 items-center" onClick={()=>navigate('/profile')}>
        <FontAwesomeIcon icon={faUser} className="h-6 w-6 mr-2" />
        <a href="#" className="text-lg hover:text-gray-400">Profile</a>
        </div>
        
      </div>
      {/* Center: Vendor Dashboard */}
      <div className="flex items-center">
        <a href="#" className="text-2xl font-semibold hover:text-gray-400">Admin Dashboard</a>
      </div>

      {/* Right: Messages & Notifications with icons */}
      <div className="flex items-center space-x-4">
        <a href="#" className="relative text-lg hover:text-gray-400">
          <FontAwesomeIcon icon={faSun} className="h-6 w-6" />
          {/* <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-500 rounded-full"></span> */}
        </a>
        <a href="#" className="relative text-lg hover:text-gray-400">
          <FontAwesomeIcon icon={faCommentDots} className="h-6 w-6" />
          <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </a>
        <a href="#" className="relative text-lg hover:text-gray-400">
          <FontAwesomeIcon icon={faBell} className="h-6 w-6" />
          <span className="absolute top-0 right-0 inline-block w-2.5 h-2.5 bg-red-500 rounded-full"></span>
        </a>
      </div>
    </nav>
  );
}

export default ANavbar;
