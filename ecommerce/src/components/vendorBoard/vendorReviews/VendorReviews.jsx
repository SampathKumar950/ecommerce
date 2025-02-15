import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Api from '../../../assets/Api';

const VendorReviews = () => {
  const itemsPerPage = 3; // Number of reviews per page
  const [currentPage, setCurrentPage] = useState(1); // Current page (starting at 1)
  const [reviews, setReviews] = useState([]);
  const [replyText, setReplyText] = useState({}); // Track replies dynamically for each review
  const [isEditingReply, setIsEditingReply] = useState({}); // Track which review is in edit mode

  useEffect(() => {
    fetchData();
  }, []);

  const token = localStorage.getItem('authtoken');

  const fetchData = async () => {
    try {
      const res = await Api.get('/api/vendors/reviews', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = res.data.reviews;
      console.log(data);
      setReviews(data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // Calculate the total number of pages
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  // Slice the reviews based on the current page and items per page
  const displayedReviews = reviews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination - Next and Previous page buttons
  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return; // Prevent invalid page numbers
    setCurrentPage(pageNumber);
  };

  // Handle submitting a reply
  const handleReplySubmit = async(reviewId) => {
    const replyTextValue = replyText[reviewId];

    if (!replyTextValue.trim()) return; // Prevent empty replies
    try{
      const res = await Api.put('/api/vendors/editReply',{reviewId,replyTextValue},{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId
          ? { ...review, reply: replyTextValue }
          : review
      );
      setReviews(updatedReviews);
      setReplyText({ ...replyText, [reviewId]: '' }); // Reset the reply input field
    }catch(err){
      console.log(err.message);
    }
  };

  // Handle editing a reply
  const handleEditReplySubmit = async (reviewId) => {
    const updatedReplyText = replyText[reviewId];
    if (!updatedReplyText.trim()) return; // Prevent empty replies
   try{
      const res = await Api.put('/api/vendors/editReply',{reviewId,replyTextValue:updatedReplyText},{
        headers:{
          Authorization: `Bearer ${token}`,
        }
      })
      const updatedReviews = reviews.map((review) =>
        review._id === reviewId ? { ...review, reply: updatedReplyText } : review
      );
      setReviews(updatedReviews);
      setIsEditingReply({ ...isEditingReply, [reviewId]: false }); // Switch off editing mode
    }catch(err){
      console.log(err.message);
    }
  };

  // Handle reply text input change
  const handleReplyChange = (reviewId, newText) => {
    setReplyText({ ...replyText, [reviewId]: newText });
  };

  // Toggle the edit mode for a specific review
  const toggleEditReply = (reviewId) => {
    setIsEditingReply({ ...isEditingReply, [reviewId]: !isEditingReply[reviewId] });
    // If switching to edit mode, pre-fill the current reply text
    if (!isEditingReply[reviewId]) {
      setReplyText({ ...replyText, [reviewId]: reviews.find((review) => review._id === reviewId).reply });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Customer Reviews</h2>

      {/* Reviews List */}
      <div>
        {displayedReviews.map((review) => (
          <div key={review._id} className="border-b border-indigo-300 pb-4 mb-4">
            <div className="flex items-center mb-2">
              <div className="font-semibold text-gray-900">{review.product}</div>
              <div className="ml-2 text-yellow-500">{'★'.repeat(review.rating)}</div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{review.comment}</p>
            <p className="text-xs text-gray-500">Reviewed on {review.date}</p>

            {/* Display Reply */}
            {review.reply ? (
              <div className="mt-4 p-4 border border-indigo-500 bg-indigo-50 rounded-md">
                <div className="font-semibold text-grey-800">Vendor's Reply:</div>
                {isEditingReply[review._id] ? (
                  <div>
                    <textarea
                      value={replyText[review._id]}
                      onChange={(e) => handleReplyChange(review._id, e.target.value)}
                      className="w-full p-3 border border-indigo-300 rounded-md"
                    ></textarea>
                    <button
                      onClick={() => handleEditReplySubmit(review._id)}
                      className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                    >
                      Save Edit
                    </button>
                  </div>
                ) : (
                  <p className="text-sm text-indigo-700">{review.reply}</p>
                )}
                <button
                  onClick={() => toggleEditReply(review._id)}
                  className="text-indigo-500 mt-2"
                >
                  {isEditingReply[review._id] ? 'Cancel' : 'Edit Reply'}
                </button>
              </div>
            ) : (
              // Add reply if none exists
              <div className="mt-4">
                <textarea
                  rows="3"
                  placeholder="Reply to this review..."
                  className="w-full p-3 border border-indigo-100 rounded-md"
                  value={replyText[review._id] || ''}
                  onChange={(e) => handleReplyChange(review._id, e.target.value)}
                ></textarea>
                <button
                  onClick={() => handleReplySubmit(review._id)}
                  className="mt-2 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                  disabled={!replyText[review._id]?.trim()} // Disable button if reply is empty
                >
                  Submit Reply
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={currentPage === 1} // Disable Previous button on first page
        >
          Previous
        </button>
        <div className="text-sm text-indigo-600">
          Page {currentPage} of {totalPages}
        </div>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          disabled={currentPage === totalPages} // Disable Next button on last page
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default VendorReviews;
