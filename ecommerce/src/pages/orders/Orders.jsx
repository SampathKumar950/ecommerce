import React, { useState,useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import Api from '../../assets/Api';
const Orders = () => {
  // Example orders data
  const navigate = useNavigate();
  const token = localStorage.getItem('authtoken');
  useEffect(() => {
    fetchData();
  }, []);
  const [orderList, setOrderList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await Api.get('/api/users/orders', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      setOrderList(response.data.orders);
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");

  // Handle star rating
  const handleRating = (orderId, newRating) => {
    setOrderList(orderList.map(order =>
      order._id === orderId ? { ...order, rating: newRating } : order
    ));
  };

  // Handle review input (display the review box for delivered orders)
  const handleWriteReview = (orderId) => {
    setOrderList(orderList.map(order =>
      order._id === orderId ? { ...order, showReviewBox: true } : order
    ));
  };

  // Handle review text change
  const handleReviewChange = (orderId, reviewText) => {
    setOrderList(orderList.map(order =>
      order._id === orderId ? { ...order, review: reviewText } : order
    ));
}

  // Handle review submission
  const handleReviewSubmit = async(orderId) => {
    setOrderList(orderList.map(order =>
      order._id === orderId ? (order.review.length === 0 ? order : { ...order, reviewSubmitted: true, showReviewBox: false } ) : order
    ));
    const orderToUpdate = orderList.find(order => order._id === orderId);

    // Make sure the order has a valid review before sending
    if (orderToUpdate && orderToUpdate.review.length > 0) {
      try {
        console.log("hi");
        
        // Make the PATCH request with the appropriate structure
        const response = await Api.patch('/api/users/order', 
          // No body here, you can use params to send data
          null, 
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
            params: {
              id: orderToUpdate._id,
              review: orderToUpdate.review,
              reviewSubmitted: true,
              pid: orderToUpdate.productId,
              rating:orderToUpdate.rating,
              vendorId:orderToUpdate.vendor,
            },
          });
      
        if (response.status === 200) {
          // Handle the successful update here (you could show a success message)
          console.log('Review successfully submitted!');
        } else {
          // Handle any errors that might occur
          console.error('Failed to update the review.');
        }
      
      } catch (error) {
        // Catch any errors (network, API issues)
        console.error('Error updating the review:', error);
      }
  }
  };

  // Handle cancel review (hide the review box without submitting)
  const handleReviewCancel = (orderId) => {
    setOrderList(orderList.map(order =>
      order._id === orderId ? { ...order, showReviewBox: false } : order
    ));
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Filter orders based on the search query
  const filteredOrders = orderList.filter(order =>
    order.product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle search button click
  const handleSearch = () => {
    // Just ensure the search works on button click
    // You can also manage additional logic if needed
  };

  // Conditional rendering for empty cart message
  const renderCartEmpty = () => {
    return (
      <div className="flex flex-col items-center justify-center h-screen m-0">
        <h2 className="text-4xl font-semibold text-gray-700 mb-4">You Have no Orders</h2>
        <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600" onClick={()=>navigate('/')}>
          Shop Now
        </button>
      </div>
    );
  };

  return (
    <>
    <Navbar />
      {/* Render the cart empty message if the cart is empty */}
      {orderList.length === 0 ? (
        renderCartEmpty()
      ) : (
        <>
        <div className="p-8 bg-gray-100">
          {/* Search Bar and Button in the Same Row as "Your Orders" */}
          <div className="block md:flex  items-center justify-between mb-6 mt-20">
            <h1 className="mb-[25px] md:mb-[0px] text-3xl font-semibold">Your Orders</h1>
            
            {/* Search Section (Centered) */}
            <div className="flex-1 flex ml-[25px] md:ml-[0px] justify-center ">
              <input
                type="text"
                placeholder="Search for orders..."
                className="w-full ml-8 p-2 border border-gray-300 rounded-sm focus:outline-none "
                style={{maxWidth:'400px',minWidth:'200px'}}
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {/* Search Button (Align right) */}
              <button
                onClick={handleSearch}
                className="px-4 py-1 bg-blue-500 text-white rounded-sm hover:bg-blue-600 mr-16"
              >
                Search
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div>
            {filteredOrders.map(order => (
              <div key={order._id} className="bg-white shadow-md rounded-lg p-6 mb-6">
                <div className="block md:flex items-center space-x-6">
                  {/* Product Image */}
                  <div className="flex justify-center"  onClick = {()=>{navigate('/productPage',{state:{pid:order.product}})}}>
                    <img src={order.productImage} alt={"alternative"} className="w-32 h-32 object-bit rounded" />
                  </div>

                  <div className="flex-1">
                    {/* Product Name and Show More Details */}
                    <div className="flex justify-between align-center">
                      <h2 className="text-lg md:text-2xl font-medium w-1/2 truncate">{order.productName}</h2>
                      <div className="ml-6 text-blue-600 cursor-pointer hover:underline" onClick={()=>navigate('/orderPage',{state:{orderId:order._id}})}>
                        <span>&gt;</span> Show More
                      </div>
                    </div>

                    <p className="text-lg text-gray-600">Status: {order.orderStatus}</p>

                    {/*  Review Button (only for Delivered products) */}
                    <div className="flex items-center mt-2">
                      {order.orderStatus === "delivered" && !order.reviewSubmitted ? (
                        // Display rating stars for delivered products
                        <>
                        <span className="mr-2">Rating:</span>{
                        [1, 2, 3, 4, 5].map(star => (
                          <FontAwesomeIcon
                            key={star}
                            icon={faStar}
                            className={`cursor-pointer ${order.rating >= star ? 'text-green-500' : 'text-gray-600'}`}
                            onClick={() => handleRating(order._id, star)}
                          />
                        )) }
                        </>
                      ) : (
                        <div>
                        {order.reviewSubmitted && <> 
                          <span className="mr-2">Your Rating:</span>
                        <span className="text-gray-600">{order.rating}</span>
                        </> }
                        </div>
                      )}
                    </div>
                    {order.orderStatus === "delivered" && !order.showReviewBox && !order.reviewSubmitted && (
                      <button
                        onClick={() => handleWriteReview(order._id)}
                        className="text-blue-600 hover:underline mt-4"
                      >
                        Write a Review
                      </button>
                    )}

                    {/* Review Textbox (only if clicked Write a Review) */}
                    {order.showReviewBox && (
                      <div className="mt-4">
                        <textarea
                          className="w-full p-4 border rounded-lg"
                          placeholder="Write your review here..."
                          rows="4"
                          value={order.review}
                          onChange={(e) => handleReviewChange(order._id, e.target.value)}
                        />
                        <div className="mt-4 flex justify-between">
                          <button
                            onClick={() => handleReviewSubmit(order._id)}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                          >
                            Submit
                          </button>
                          <button
                            onClick={() => handleReviewCancel(order._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Thank you message */}
                    {order.reviewSubmitted && (
                      <p className="mt-4 text-green-600 font-semibold">Thank you for your review!</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          </div>
        </>
      )}
    </>
  );
};

export default Orders;
