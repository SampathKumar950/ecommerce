// InventoryCard.js
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { VendorRemoveCard } from './VendorRemoveCard';

const VendorCard = ({ vendor,setDeleteVendor}) => {
  const [remove,setRemove] = useState(null);
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
     {remove && <VendorRemoveCard user={vendor} setUser={setRemove} handleRemove={setDeleteVendor} />}
      <img src={vendor.user.image} alt={vendor.user.username} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{vendor.user.username}</h3>
        <p className="text-gray-600">Business Name: {vendor.businessName}</p>
        <p className="text-gray-600">Email: {vendor.user.email}</p>
        <p className="text-gray-600">Phone No: {vendor.user.phone}</p>
        <p className="text-gray-600">address: {vendor.user.address}</p>
        <div className='flex'>
          <button className='mx-auto bg-red-600 text-white p-2 m-2 rounded-lg transition-shadow'
           onClick={()=>
            setRemove(vendor)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default VendorCard;
