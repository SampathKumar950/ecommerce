import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const OrderDetailPage = () => {
  const token = localStorage.getItem('authtoken');
  const location = useLocation();
  const { orderId } = location.state || {};
  const [order, setOrder] = useState();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [showReviewBox, setShowReviewBox] = useState(false);
  const [userReview,setUserReview] = useState({rating:0,comment:''});
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log(location.state);
    console.log(orderId);
    try {
      const res = await axios.get('http://localhost:3000/api/users/orderDetail', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { orderId: orderId },
      });
      const data = res.data.order;
      setOrder(data);
      if(data.reviewSubmitted){
        fetchReview(data.review);
      }
    } catch (err) {
      console.log(err.message);
    }
  };
  const fetchReview = async(reviewId)=>{
    try {
      const res = await axios.get('http://localhost:3000/api/users/review', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: { reviewId: reviewId },
      });
      const data = res.data.review;
      console.log(data);
      setUserReview(data);
    } catch (err) {
      console.log(err.message);
    }
  }
  const orderStatus = ['confirmed', 'packed', 'shipped', 'delivered'];

  // Function to handle rating stars click
  const handleRating = (newRating) => {
    setRating(newRating);
  };

  // Function to handle review text change
  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  // Function to handle review submission
  const handleReviewSubmit = async () => {
    if (review.length > 0) {
      try {
        const response = await axios.patch('http://localhost:3000/api/users/order', null, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id: order._id,
            review: review,
            rating: rating,
          },
        });

        if (response.status === 200) {
          setReviewSubmitted(true);
        }
      } catch (error) {
        console.error('Error submitting review', error);
      }
    }
  };

  // Function to cancel review and hide the review box
  const handleReviewCancel = () => {
    setShowReviewBox(false);
  };

  return (
    <>
      <Navbar />
      {!order ? (
        <div className="mx-auto">Loading...</div>
      ) : (
        <div className="mx-auto px-6 max-w-screen-lg" style={{ marginTop: '100px' }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Section: Product Details */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md"
              onClick={()=>navigate('/productPage',{state:{pid:order.product}})}>
                <img
                  src={order.product.images[0]}
                  alt={order.product.name}
                  className="w-full h-60 object-contain mb-4"
                />
                <h2 className="text-2xl font-semibold">{order.product.name}</h2>
                <p className="text-xl text-gray-600">{order.product.price}</p>
                <p className="mt-4 text-gray-700">{order.product.description}</p>
                <p className="mt-4 font-semibold">Quantity: {order.quantity}</p>
                <p className="mt-4 font-semibold">Payment Status: {order.paymentStatus}</p>
                <p className="mt-4 font-semibold">Vendor: {order.vendor.businessName}</p>
              </div>
            </div>

            {/* Right Section: Order Status */}
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold">Order Summary</h2>
                <div className="mt-4">
                  <p><strong>Order ID:</strong> {order._id}</p>
                  <p><strong>Order Date:</strong> {order.createdAt}</p>
                  <p><strong>Order Status:</strong> {order.orderStatus}</p>
                </div>
              </div>

              {/* Review Box (only if the order is delivered and no review is submitted) */}
              {order.orderStatus === 'delivered' && !order.reviewSubmitted && !showReviewBox && (
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
                  <div className="flex items-center mb-4">
                    <span className="mr-2">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer ${rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                        onClick={() => handleRating(star)}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <textarea
                    className="w-full p-4 border rounded-lg"
                    placeholder="Write your review here..."
                    rows="4"
                    value={review}
                    onChange={handleReviewChange}
                  />
                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={handleReviewSubmit}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                    >
                      Submit
                    </button>
                    <button
                      onClick={handleReviewCancel}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Thank You message after review submission */}
              {order.reviewSubmitted && (<>
                <p className=" text-green-600 font-semibold" style={{marginTop:'40px'}}>Thank you for your review!</p>
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-semibold mb-4">Your Review</h3>
                  <div className="flex items-center mb-4">
                    <span className="mr-2">Rating:</span>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={`cursor-pointer ${userReview.rating >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <textarea
                    className="w-full p-4 border rounded-lg"
                    placeholder="Write your review here..."
                    rows="4"
                    value={userReview.comment}
                    disabled
                  />
                  </div></>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderDetailPage;
