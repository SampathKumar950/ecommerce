// Navbar.js
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faCommentDots, faHome, faSun, faLightbulb, faShoppingCart, faBoxes, faTachometerAlt, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const VNavbar = (props) => {
  const setCurPage = props.value;
  const navigate = useNavigate();
  const [isMobileMenuOpen,setIsMobileMenuOpen] = useState(false);
  return (
    <div  className={` fixed top-0 left-0 w-full bg-white bg-opacity-100`}>
    <nav className="w-full py-5 ">
      {/* Left: Profile with icon */}
        <div className='container w-full mx-auto flex justify-between items-center text-black'>
        <button
          className="md:hidden "
          onClick={()=>setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
       <div className="flex items-center">
        {/* Menu Button for Mobile */}
        <div onClick={()=>navigate('/')}>
        <FontAwesomeIcon icon={faHome} className="h-6 w-6 mr-2" />
        <a href="#" className="text-lg hover:text-gray-400 mr-2">Home</a>
        </div>
        <div onClick={()=>navigate('/profile')}>
        <FontAwesomeIcon icon={faUser} className="h-6 w-6 mr-2" />
        <a href="#" className="text-lg hover:text-gray-400">Profile</a>
        </div>
      </div>

      {/* Center: Vendor Dashboard */}
      <div className="flex items-center">
        <a href="#" className="text-2xl font-semibold hover:text-gray-400">Vendor Dashboard</a>
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
      </div>
      {/* Mobile Navbar Links (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden p-4 space-y-2 mt-2">
        <button onClick={()=>setCurPage(0)} className="block">
          <FontAwesomeIcon icon={faTachometerAlt} />
          Track Sales
        </button>
        <button onClick={()=>setCurPage(1)} className="block">
          <FontAwesomeIcon icon={faBoxes} />
          Inventory
        </button>
        <button onClick={()=>setCurPage(2)} className="block">
         <FontAwesomeIcon icon={faShoppingCart}/>
         Orders
       </button>
       <button onClick={()=>setCurPage(3)} className="block">
         <FontAwesomeIcon icon={faUsers}  />
         Customer
       </button>
        </div>
      )}
    </nav>
    </div>
  );
}

export default VNavbar;
