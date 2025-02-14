// InventoryCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPencil } from '@fortawesome/free-solid-svg-icons';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-center items-center h-[250px]">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-[200px] w-[300px] object-contain"
        />
      </div>
      <div className="mt-4">
        <h3 className='text-gray-600 text-md'>{product.name.substring(0,16)}{product.name.length>=16?'...':''}</h3>
        <h3 className='text-lg font-semibold text-green-600'>Sold: {product.sold}</h3>
        <p className="text-gray-600">Brand: {product.brand}</p>
        <p className="text-gray-600">Category: {product.category[0]}...</p>
        <p className="text-gray-600">Price: &#8377; {product.price}</p>
        <p className="text-gray-500">Rating: {product.rating.toFixed(1)} / 5</p>
        <p className="text-gray-500">Stock: {product.stockQuantity} available</p>
      </div>
    </div>
  );
};

export default ProductCard;
