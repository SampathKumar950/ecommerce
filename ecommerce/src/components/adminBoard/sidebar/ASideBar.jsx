// Sidebar.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faBoxes, faShoppingCart, faUsers, faMessage, faPerson } from '@fortawesome/free-solid-svg-icons';

const ASideBar = (props) => {
  const setCurPage = props.value;
  return (
    <div className="w-35 h-screen p-4 py-8">

      {/* Sidebar Links with spacing between them */}
      <ul className="space-y-6">
        <li>
          <button onClick={()=>setCurPage(0)} className="flex items-center space-x-3 text-lg hover:text-gray-400">
            <FontAwesomeIcon icon={faTachometerAlt} className="h-6 w-6" />
            <span>Track Sales</span>
          </button>
        </li>
        <li>
          <button onClick={()=>setCurPage(1)} className="flex items-center space-x-3 text-lg hover:text-gray-400">
            <FontAwesomeIcon icon={faBoxes} className="h-6 w-6" />
            <span>Products</span>
          </button>
        </li>
        <li>
          <button onClick={()=>setCurPage(2)} className="flex items-center space-x-3 text-lg hover:text-gray-400">
            <FontAwesomeIcon icon={faShoppingCart} className="h-6 w-6" />
            <span>Orders</span>
          </button>
        </li>
        <li>
          <button onClick={()=>setCurPage(3)} className="flex items-center space-x-3 text-lg hover:text-gray-400">
            <FontAwesomeIcon icon={faUsers} className="h-6 w-6" />
            <span>Users</span>
          </button>
        </li>
        <li>
          <button onClick={()=>setCurPage(4)} className="flex items-center space-x-3 text-lg hover:text-gray-400">
            <FontAwesomeIcon icon={faPerson} className="h-6 w-6" />
            <span>Vendor List</span>
          </button>
        </li>
        <li>
          <button onClick={()=>setCurPage(5)} className="flex items-center space-x-3 text-lg hover:text-gray-400">
            <FontAwesomeIcon icon={faMessage} className="h-6 w-6" />
            <span>Requests</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default ASideBar;
