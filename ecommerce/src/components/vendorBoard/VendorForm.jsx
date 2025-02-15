import React, { useState , useEffect} from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import Navbar from '../navbar/Navbar';
import axios from 'axios';
import Api from '../../assets/Api';

const VendorForm = () => {
  const [vendorDetails, setVendorDetails] = useState({
    businessName: '',
    email: '',
    phone: '',
    address: '',
    category: '',
    logo: null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = localStorage.getItem('authtoken');
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async()=>{
    try{
      const response = await Api.get('/api/users/request',{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      const data = response.data.vendor;
      if(data!=null){
        setIsSubmitted(true);
      }
    }catch(error){
      console.log(error);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVendorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    setVendorDetails((prevDetails) => ({
      ...prevDetails,
      logo: file,
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const response = await Api.post('/api/users/request',vendorDetails,{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      setIsSubmitted(true);
      console.log('Vendor details submitted:', vendorDetails);
    }catch(error){
      console.log(error);
    }
  };

  const handleCancel = () => {
    setVendorDetails({
      businessName: '',
      email: '',
      phone: '',
      address: '',
      category: '',
      logo: null,
    });
    setIsSubmitted(false); // Reset the confirmation message if canceled
  };

  return (
    <>
    <Navbar />
      {isSubmitted ? (
         <div className="flex items-center justify-center h-screen flex-col text-center ">
            {/* bg-opacity-50 bg-gray-800 */}
         <FaCheckCircle className="text-green-500 text-8xl mb-4" />
         <p className="text-3xl font-semibold ">Your Request is In Process</p>
       </div>
      ) : (
        <div className="p-6 max-w-3xl mx-auto mt-20">
        {!isSubmitted && <h1 className="text-3xl font-bold mb-6 text-center">Become a Vendor</h1>}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-lg">
          {/* Business Name */}
          <div>
            <label className="block text-gray-700">Business Name</label>
            <input
              type="text"
              name="businessName"
              value={vendorDetails.businessName}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            //   required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={vendorDetails.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            //   required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={vendorDetails.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            //   required
            />
          </div>

          {/* Business Address */}
          <div>
            <label className="block text-gray-700">Business Address</label>
            <textarea
              name="address"
              value={vendorDetails.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            //   required
            />
          </div>

          {/* Business Category */}
          <div>
            <label className="block text-gray-700">Business Category</label>
            <select
              name="category"
              value={vendorDetails.category}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            //   required
            >
              <option value="">Select Category</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="home_appliances">Home Appliances</option>
              <option value="beauty">Beauty</option>
            </select>
          </div>

          {/* Store Logo */}
          <div>
            <label className="block text-gray-700">Store Logo</label>
            <input
              type="file"
              name="logo"
              onChange={handleLogoChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
        </div>
      )}
    </>
  );
};

export default VendorForm;
