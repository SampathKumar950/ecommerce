import React, { useState,useEffect } from "react";
import VendorCard from "./VendorCard";
import axios from 'axios';
import Api from "../../../assets/Api";

const VendorList = () => {
  const token = localStorage.getItem('authtoken');

  const [vendors, setVendors] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async()=>{
    const data = await Api.get('/api/admins/vendors',{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    })
    const vendorsData = data.data.vendors;
    console.log(vendorsData);
    setVendors(vendorsData);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const vendorsPerPage = 3; // Number of vendors to display per page

  // Filter vendors based on search term
  const filteredVendors = vendors.filter((vendor) =>
    vendor.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate the vendors to display for the current page
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);

  // Handle search input change
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to the first page whenever search term changes
  };

   // Handle user removal
   const handleRemove = async(id) => {
    try{
      const res = await Api.delete('/api/admins/deleteVendor',{
        headers:{
          Authorization : `Bearer ${token}`,
        },
        params:{
          vendorId: id
        }
      });
      setVendors(vendors.filter((user) => user._id !== id));
    }catch(err){
      console.log(err.message);
    }
  };

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate the total number of pages
  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);
  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl text-center font-semibold mb-4 ">Search a Vendor</h1>
      
      {/* Search Bar with Search Button */}
      <div className="flex justify-center mb-6">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search Order..."
            value={searchTerm}
            onChange={(e) => handleSearch(e)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setSearchTerm(searchTerm)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>
      {/* Vendors Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentVendors.length > 0 ? (
          currentVendors.map((vendor) => (
            <VendorCard vendor={vendor} setDeleteVendor = {handleRemove}  />
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">No vendors found</p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VendorList;
