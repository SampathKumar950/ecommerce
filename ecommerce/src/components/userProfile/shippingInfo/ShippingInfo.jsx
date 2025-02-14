import React, { useState } from 'react';

const ShippingInfo = () => {
  const [address, setAddress] = useState('123 Main St, Springfield, IL, 62701');

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Shipping Information</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
        <input
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
      <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700">Save Changes</button>
    </div>
  );
};

export default ShippingInfo;
