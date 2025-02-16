import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, likedProducts, handleLikeToggle }) => {
  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const isLiked = (likedProducts?likedProducts.some((likedProduct) => likedProduct._id === product._id):false); // Check if the product is liked by comparing the _id
  const navigate = useNavigate();

  return (
    <div key={product._id} className="bg-white rounded-lg shadow-xl relative p-2">
      <span
        className={`absolute top-4 right-2 text-xl cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-200'}`}
        onClick={() => handleLikeToggle(product)} // Pass the entire product object
      >
        <FontAwesomeIcon icon={faHeart} />
      </span>

      <div className="flex justify-center items-center h-[200px] lg:h-[350px]"
      onClick = {()=>{navigate('/productPage',{state:{pid:product._id}})}}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-[150px] w-[300px] lg:h-[300px]  object-contain"
        />
      </div>
      <div className="flex justify-between items-center">
          <h3 className="truncate w-3/4 text-lg font-semibold">{product.name}</h3>
          <h2 className="bg-green-700 text-white p-1 text-sm rounded-md">
            {product.rating} <FontAwesomeIcon icon={faStar} style={{ color: 'white' }} />
          </h2>
        </div>
      <div className="hidden p-3 lg:flex flex-col justify-between h-51">
        <p className="text-sm text-gray-500">{product.brand}</p>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-400 line-through">&#8377; {`${product.price.toFixed(2)}`}</span>
          <span className="text-green-500">{`${product.discount}% Off`}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold">&#8377; {`${discountedPrice.toFixed(2)}`}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{`Available: ${product.stockQuantity}`}</p>
      </div>
    </div>
  );
};

export default ProductCard;
