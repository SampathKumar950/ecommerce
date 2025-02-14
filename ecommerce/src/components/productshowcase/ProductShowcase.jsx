import React, { useState } from 'react';
import { FaShoppingCart, FaCreditCard, FaStar, FaCommentAlt, FaTag, FaShippingFast } from 'react-icons/fa';

const ProductShowcase = () => {
  const [selectedImage, setSelectedImage] = useState('https://via.placeholder.com/500x500/000000/FFFFFF?text=Main+Image');
  const [newQuestion, setNewQuestion] = useState('');
  
  const product = {
    title: "Men's Black Leather Wallet",
    price: 49.99,
    oldPrice: 59.99,
    rating: 4.5,
    description: "A slim, RFID-blocking leather wallet perfect for daily use.",
    images: [
      'https://via.placeholder.com/500x500/000000/FFFFFF?text=Main+Image',
      'https://via.placeholder.com/500x500/333333/FFFFFF?text=Side+View',
      'https://via.placeholder.com/500x500/555555/FFFFFF?text=Back+View',
      'https://via.placeholder.com/500x500/777777/FFFFFF?text=Detail+Shot',
    ],
    variants: {
      color: ['Black', 'Brown', 'Blue'],
      size: ['S', 'M', 'L'],
    },
    features: [
      'RFID blocking technology',
      'Premium leather construction',
      'Slim and lightweight design',
    ],
    reviews: [
      { rating: 5, text: 'Great quality wallet!', image: 'https://via.placeholder.com/50' },
      { rating: 4, text: 'Good, but could be thinner.', image: 'https://via.placeholder.com/50' },
    ],
    qA: [
      { question: 'Is this wallet RFID blocking?', answer: 'Yes, it is RFID-blocking.' },
      { question: 'What is the material of the wallet?', answer: 'It is made from premium leather.' },
    ],
    stock: 12,
    shipping: "Free shipping on orders over $50. Delivery within 5-7 business days.",
    returnPolicy: "Easy returns within 30 days. No questions asked.",
    discount: "10% off on your first purchase!",
  };

  const handleAddToCart = () => {
    alert('Added to cart');
  };

  const handleBuyNow = () => {
    alert('Proceeding to checkout');
  };

  const handleSubmitQuestion = () => {
    alert(`Your question: "${newQuestion}" has been submitted.`);
    setNewQuestion('');
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row">
       

        {/* Right Section: Product Details, Description, Features, Reviews, Q&A */}
        <div className="w-full left:35 md:w-2/3 md:pl-12 mt-6 md:mt-0 md:ml-1/3 overflow-y-scroll h-screen">
          {/* Product Title */}
          <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>
          
          {/* Rating */}
          <div className="flex items-center mt-2">
            <span className="text-xl text-yellow-500">
              {Array.from({ length: 5 }, (_, idx) => (
                <FaStar key={idx} className={idx < product.rating ? 'text-yellow-500' : 'text-gray-300'} />
              ))}
            </span>
            <span className="ml-2 text-gray-600">({product.reviews.length} reviews)</span>
          </div>

          {/* Price and Discount */}
          <div className="flex items-center mt-4">
            <span className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</span>
            {product.oldPrice && (
              <span className="ml-4 text-sm line-through text-gray-500">${product.oldPrice.toFixed(2)}</span>
            )}
          </div>

          {/* Discount Badge */}
          {product.discount && (
            <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-md flex items-center">
              <FaTag className="mr-2" />
              <span>{product.discount}</span>
            </div>
          )}

          {/* Product Variants */}
          <div className="mt-4">
            <label htmlFor="color" className="block text-gray-700">Choose Color:</label>
            <select
              id="color"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
            >
              {product.variants.color.map((variant, idx) => (
                <option key={idx} value={variant}>{variant}</option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <label htmlFor="size" className="block text-gray-700">Choose Size:</label>
            <select
              id="size"
              className="mt-2 px-4 py-2 border border-gray-300 rounded-md w-full"
            >
              {product.variants.size.map((variant, idx) => (
                <option key={idx} value={variant}>{variant}</option>
              ))}
            </select>
          </div>

          {/* Product Description */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Description</h3>
            <p className="mt-4 text-gray-700">{product.description}</p>
          </div>

          {/* Product Features */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Product Features</h3>
            <ul className="list-disc pl-5 mt-4 text-gray-700">
              {product.features.map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
            </ul>
          </div>

          {/* Customer Reviews */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Customer Reviews</h3>
            {product.reviews.map((review, idx) => (
              <div key={idx} className="mt-4 flex items-center space-x-4">
                <img
                  src={review.image}
                  alt="Reviewer"
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center">
                    <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
                    <p className="ml-2 text-gray-700">{review.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Q&A Section */}
          <div className="mt-6">
            <h3 className="text-2xl font-semibold">Q&A</h3>
            {product.qA.map((qa, idx) => (
              <div key={idx} className="mt-4">
                <p className="font-semibold text-gray-800">Q: {qa.question}</p>
                <p className="mt-2 text-gray-700">A: {qa.answer}</p>
              </div>
            ))}

            {/* Add Question Form */}
            <div className="mt-6">
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
      </div>
    </div>
  );
};

export default ProductShowcase;