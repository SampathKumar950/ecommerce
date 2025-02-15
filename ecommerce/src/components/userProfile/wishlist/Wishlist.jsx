import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../../assets/Api';



const Wishlist = () => {

  const token = localStorage.getItem('authtoken');
  const [wishlist,setWishlist] = useState([]);
  const navigate = useNavigate();
  useEffect(()=>{
     fetchData();
  },[])
 
  const fetchData = async()=>{
    const data = await Api.get('/api/users/wishlist',{
        headers:{
          Authorization: `Bearer ${token}`,
        },
    });
    const wishlistData = data.data.wishlist;
    setWishlist(wishlistData);

  }


  const itemsPerPage = 3; // Number of items per page
  const [currentPage, setCurrentPage] = useState(1); // Current page (starting at 1)

  // Calculate the total number of pages
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  // Slice the wishlist based on the current page and items per page
  const displayedProducts = wishlist.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination - Next and Previous page buttons
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      
        {wishlist.length==0?<div className='flex justify-center mx-auto '><h2>Your WishList is Empty</h2></div>:
        <>
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Wishlist</h2>
          <button
            // onClick={navigate('/wishlist')}
            className="text-lg text-indigo-600 hover:text-indigo-800 font-medium"
            onClick={()=>navigate('/wishlist')}
          >
            See More &gt;
          </button>
      </div>

      {/* Wishlist Items */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayedProducts.map((product) => (
          <div
            key={product._id}
            className="bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
          >
            {/* <img
              src={product.images[0]}
              alt={product.name}
              className="w-80 h-90 object-fit rounded-md mb-4"
            /> */}
            <h3 className="text-lg font-semibold text-gray-900">{product.name} <span className='text-white text-sm bg-green-900 p-1 rounded-lg ml-2'>{product.rating.toFixed(1)}<FontAwesomeIcon icon={faStar} /></span> </h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <p className="text-lg font-semibold text-gray-900">&#8377;{product.price}</p>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={currentPage === 1} // Disable Previous button on first page
        >
          Previous
        </button>
        <div className="text-lg p-2">
           {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          disabled={currentPage === totalPages} // Disable Next button on last page
        >
          Next
        </button>
        </div>
        </>}
    </div>
  );
};

export default Wishlist;
