import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const OrderDetailPage1 = ({ order }) => {
  const [rating, setRating] = useState(order.rating);
  const [review, setReview] = useState(order.review);
  const [showReviewBox, setShowReviewBox] = useState(false);

  const handleRating = (newRating) => {
    setRating(newRating);
  };

  const handleReviewChange = (e) => {
    setReview(e.target.value);
  };

  const handleSubmitReview = () => {
    order.review = review;
    order.rating = rating;
    setShowReviewBox(false);
  };

  const handleCancelReview = () => {
    setShowReviewBox(false);
  };

  // Utility function to check the order status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-500';
      case 'Packed':
        return 'bg-green-500';
      case 'Shipped':
        return 'bg-green-500';
      case 'Delivered':
        return 'bg-green-500';
      case 'Cancelled':
        return 'text-red-500';
      default:
        return 'bg-gray-400';
    }
  };

  return (
    <div className="p-8 bg-gray-100">
      <div className="flex justify-between">
        {/* Left Block - Product Details */}
        <div className="w-2/3 bg-white p-6 rounded-lg shadow-md">
          <div className="flex mb-6">
            <img
              src={order.productImage}
              alt={order.productName}
              className="w-36 h-36 object-cover rounded"
            />
            <div className="ml-6">
              <h2 className="text-2xl font-semibold">{order.productName}</h2>
              <p className="text-gray-600 mt-2">{order.productDescription}</p>
              <p className="text-lg font-bold mt-2">${order.price}</p>
              {order.discount && (
                <p className="text-red-500 mt-1">Discount: {order.discount}%</p>
              )}
              <div className="flex items-center mt-4">
                <span className="mr-2">Rating:</span>
                {[1, 2, 3, 4, 5].map((star) => (
                  <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className={`cursor-pointer ${
                      rating >= star ? 'text-green-500' : 'text-gray-400'
                    }`}
                    onClick={() => handleRating(star)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Block - Order Status */}
        <div className="w-1/3 bg-white p-6 rounded-lg shadow-md">
          {order.status === 'Cancelled' ? (
            <h2 className="text-3xl font-semibold text-center text-red-500">
              Your Order Has been Cancelled
            </h2>
          ) : (
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 bg-gray-300 h-full"></div>
              </div>
              <div className="flex justify-between absolute inset-0">
                <div className={`w-4 h-4 rounded-full ${getStatusColor('Confirmed')}`} />
                <div className={`w-4 h-4 rounded-full ${getStatusColor('Packed')}`} />
                <div className={`w-4 h-4 rounded-full ${getStatusColor('Shipped')}`} />
                <div className={`w-4 h-4 rounded-full ${getStatusColor('Delivered')}`} />
              </div>
              <div className="flex justify-between mt-4">
                <p className="text-sm">Confirmed</p>
                <p className="text-sm">Packed</p>
                <p className="text-sm">Shipped</p>
                <p className="text-sm">Delivered</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Rating and Review Section */}
      {order.status !== 'Cancelled' && (
        <div className="mt-6">
          <div className="flex justify-center items-center">
            <span className="text-lg mr-4">Rate this Product:</span>
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                icon={faStar}
                className={`cursor-pointer ${
                  rating >= star ? 'text-green-500' : 'text-gray-400'
                }`}
                onClick={() => handleRating(star)}
              />
            ))}
          </div>

          {!showReviewBox ? (
            <button
              onClick={() => setShowReviewBox(true)}
              className="mt-4 block mx-auto text-blue-600 underline"
            >
              Write a Review
            </button>
          ) : (
            <div className="mt-4">
              <textarea
                className="w-full p-4 border rounded-lg"
                placeholder="Write your review here..."
                rows="4"
                value={review}
                onChange={handleReviewChange}
              />
              <div className="mt-4 flex justify-between">
                <button
                  onClick={handleSubmitReview}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                >
                  Submit Review
                </button>
                <button
                  onClick={handleCancelReview}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderDetailPage1;
