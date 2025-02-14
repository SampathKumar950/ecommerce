import React, { useState } from 'react';

const Review = ({product}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 3;

  // Get the reviews for the current page
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = product.reviews.slice(indexOfFirstReview, indexOfLastReview);

  const nextPage = () => {
    if (currentPage < Math.ceil(product.reviews.length / reviewsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
        {currentReviews.map((review) => (
          <div key={review._id} className="border-b border-indigo-300 pb-4 my-4">
            <div className="flex items-center mb-2">
              <div className="font-semibold text-gray-900">{review.user}</div>
              <div className="ml-2 text-yellow-500">{'★'.repeat(review.rating)}</div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
            <p className="text-xs text-gray-500">Reviewed on {review.createdAt}</p>

            {/* Display Vendor's Reply if it exists */}
            {review.reply && (
              <div className="mt-4 p-4 border border-indigo-500 bg-indigo-50 rounded-md">
                <div className="font-semibold text-grey-800">Vendor's Reply:</div>
                <p className="text-sm text-indigo-700">{review.reply}</p>
              </div>
            )}
          </div>
        ))
      }
      <div className="flex justify-between mt-4">
        <button 
          onClick={prevPage} 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button 
          onClick={nextPage} 
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          disabled={currentPage === Math.ceil(product.reviews.length / reviewsPerPage)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Review;
