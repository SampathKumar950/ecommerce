import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import { FaCommentAlt, FaStar, FaTag } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import Review from './Review';
import Api from '../../assets/Api';

const ProductPage = () => {
  const token = localStorage.getItem('authtoken');
  const [newQuestion, setNewQuestion] = useState('');
  const location = useLocation();
  const { pid } = location.state;
  const [product, setProduct] = useState({});
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await Api.get('/api/products/getProduct', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          id: pid,
        },
      });

      const d = data.data.product;
      setProduct(d);
      // Initialize selectedImage with the first image if available
      setSelectedImage(d.images && d.images.length > 0 ? d.images[0] : '');
      console.log(d);
    } catch (err) {
      console.log(err.response ? err.response.data : err.message);
    }
  };
  const [isLiked,setIsLiked] = useState(false);
  const handleLikeToggle = async (product) => {
    console.log(product.reviews);
    if(!token){
      navigate('/login');
    }
    if (isLiked) {
      setIsLiked(false);
      await Api.delete(`/api/users/wishlist?productId=${product._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      setIsLiked(true);
      await Api.post('/api/users/wishlist', { productId: product._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };
  const [addedToCart, setAddedToCart] = useState(false);
  const handleAddToCart = async (productId) => {
    if(!token){
      navigate('/login');
    }
    try {
      await Api.post('/api/users/cart', { productId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddedToCart(true);
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };

  const handleSubmitQuestion = () => {
    alert(`Your question: "${newQuestion}" has been submitted.`);
    setNewQuestion('');
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <>
      <div className="mx-auto relative p-4 h-screen lg:overflow-hidden">
        <Navbar />
        {product?<div className="lg:flex justify-center align-center gap-8" style={{ marginTop: '60px' }}>
          {/* Left Section: Image Gallery */}
          <div className="hidden md:flex flex-col items-start space-y-4">
            <div className="flex lg:w-[500px]">
              <div className="flex flex-col space-y-4 w-32 mr-2 mt-4 mb-4">
                {product && product.images && product.images.length > 0 && product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-28 object-contain cursor-pointer rounded-lg border border-gray-300"
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>

              {/* Large Image Display */}
              <div className="rounded-lg overflow-hidden relative">
                <span
                  className={`absolute top-4 right-2 text-xl cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-200'}`}
                  onClick={() => handleLikeToggle(product)} // Pass the entire product object
                >
                <FontAwesomeIcon icon={faHeart} />
                </span>
                <img
                  src={selectedImage}
                  alt="Selected Product"
                  className="w-[290px] h-[460px] md:w-[600px] md:h-[480px] object-contain"
                  // style={{ width: '600px', height: '490px' }}
                />
                {/* Add to Cart Button */}
                <button
                  className={`mt-4 py-2 w-full bg-blue-500 text-white rounded-lg transition ${addedToCart?'bg-indigo-600':'bg-blue-500'}`}
                  onClick={()=>handleAddToCart(product._id)}
                >
                  {addedToCart? 'Added to Cart':'Add to Cart'}
                </button>
              </div>
            </div>
          </div>

          <div className="block md:hidden items-center space-y-4">
            <div className="block">
              {/* Large Image Display */}
              <div className="flex align-center justify-center rounded-lg overflow-hidden relative">
                <span
                  className={`absolute top-4 right-2 text-xl cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-200'}`}
                  onClick={() => handleLikeToggle(product)} // Pass the entire product object
                >
                <FontAwesomeIcon icon={faHeart} />
                </span>
                <img
                  src={selectedImage}
                  alt="Selected Product"
                  className="w-[290px] h-[460px] md:w-[600px] md:h-[480px] object-contain"
                  // style={{ width: '600px', height: '490px' }}
                />
              </div>
              <div className="flex justify-center align-center w-[400px] space-x-2  mr-2">
                {product && product.images && product.images.length > 0 && product.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product ${index + 1}`}
                    className="w-full h-[95px] object-contain cursor-pointer rounded-lg border border-gray-300"
                    onClick={() => handleImageClick(image)}
                  />
                ))}
              </div>
               {/* Add to Cart Button */}
               <button
                  className={`my-4 py-2 w-full bg-blue-500 text-white rounded-lg transition ${addedToCart?'bg-indigo-600':'bg-blue-500'}`}
                  onClick={()=>handleAddToCart(product._id)}
                >
                  {addedToCart? 'Added to Cart':'Add to Cart'}
                </button>
            </div>
          </div>
          {/* Right Section: Product Details, Description, Features, Reviews, Q&A */}
          <div className="w-full lg:overflow-y-scroll h-screen">
            {/* Product Title */}
            <div className="flex items-center">
            <h2 className="text-3xl font-bold text-gray-900">{product.name || 'Product Name'}</h2>
            <h2 className="ml-5 bg-green-700 text-white p-1 text-sm rounded-md">
                        {product.rating?product.rating.toFixed(2):0} <FontAwesomeIcon icon={faStar} style={{ color: 'white' }} />
            </h2>
            </div>
            {/* Price and Discount */}
            <div className="flex items-center mt-4">
              <span className="text-2xl font-semibold text-gray-900">
              &#8377;{(product.price-(product.price*(product.discount/100)) || 0).toFixed(2)}
              </span>
              {product && product.price && (
                <span className="ml-4 text-md line-through text-gray-500">
                  &#8377;{(product.price || 0).toFixed(2)}
                </span>
              )}
              <span className="ml-2 text-green-700">{`${product.discount}% Off`}</span>
            </div>

            {/* Product Description */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">Description</h3>
              <p className="mt-4 text-gray-700">{product.description || 'No description available'}</p>
            </div>

            {/* Product Features */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">Product Features</h3>
              <ul className="list-disc pl-5 mt-4 text-gray-700">
                {product && product.features && product.features.length > 0 ? (
                  product.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))
                ) : (
                  <li>No features available</li>
                )}
              </ul>
            </div>

            {/* Customer Reviews */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">Customer Reviews</h3>
              {product && product.reviews && product.reviews.length > 0 ? (
               <Review product={product}/>
              ) : (
                <p>No reviews yet.</p>
              )}
            </div>

            {/* Q&A Section */}
            <div className="mt-6">
              <h3 className="text-2xl font-semibold">Q&A</h3>
              { product && product.qA && product.qA.length > 0 ? (
                product.qA.map((qa, idx) => (
                  <div key={idx} className="mt-4">
                    <p className="font-semibold text-gray-800">Q: {qa.question}</p>
                    <p className="mt-2 text-gray-700">A: {qa.answer}</p>
                  </div>
                ))
              ) : (
                <p>No questions asked yet.</p>
              )}

              {/* Add Question Form */}
              <div className="mt-6" style={{ paddingBottom: '100px' }}>
                <h4 className="text-lg font-semibold text-gray-800">Ask a Question</h4>
                <textarea
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                  rows="4"
                  placeholder="Enter your question"
                  value={newQuestion}
                  onChange={(e) => setNewQuestion(e.target.value)}
                />
                <button
                  onClick={handleSubmitQuestion}
                  className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 flex items-center justify-center"
                >
                  <FaCommentAlt className="mr-2" />
                  Submit Question
                </button>
              </div>
            </div>
          </div>
        </div>:
        <div className='flex align-center justify-center'>
          Loading Product...
        </div>
        }
      </div>
    </>
  );
};

export default ProductPage;
