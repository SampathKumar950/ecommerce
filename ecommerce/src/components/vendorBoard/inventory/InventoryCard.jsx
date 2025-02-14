// InventoryCard.js
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const InventoryCard = ({ product,setProductEdit,setDeleteProduct }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex justify-center items-center h-[250px]"
      onClick={()=>navigate('/productPage',{state:{pid:product._id}})}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-[200px] w-[300px] object-contain"
        />
      </div>
      <div className="mt-4">
        <div className='flex justify-between'>
        <h3 className="text-xl font-semibold">{product.name.substring(0,18)}{product.name.length>=18?'...':''}</h3>
        <FontAwesomeIcon icon={faEdit} onClick={()=>setProductEdit(product)} />
        </div>
        <p className="text-gray-600">Id: {product._id}</p>
        <p className="text-gray-600">Brand: {product.brand}</p>
        <p className="text-gray-600">Category: {product.category[0]}</p>
        <p className="text-lg">Price: &#8377; {product.price}</p>
        <p className="text-gray-500">Rating: {product.rating.toFixed(1)} / 5</p>
        <p className="text-gray-500">Stock: {product.stockQuantity} available</p>
        <div className='flex'>
          <button className='mx-auto bg-red-600 text-white p-2 m-2 rounded-lg transition-shadow'
           onClick={()=>{
            setProductEdit(null);
            setDeleteProduct(product);
            return;}}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default InventoryCard;
