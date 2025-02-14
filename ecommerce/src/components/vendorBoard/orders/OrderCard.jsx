// OrderCard.js
import React from 'react';
import EditOrder from './EditOrder';

const OrderCard = ({ order }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
    onClick= {()=><EditOrder order={order}/>} >
     <div className="flex justify-center items-center h-[200px]">
        <img
          src={order.product.images[0]}
          alt={order.product.name}
          className="h-[150px] w-[200px] object-contain"
        />
      </div>
      <div className="mt-4">
        <h3 className="text-xl font-semibold">{order.product.name}</h3>
        <p className="text-gray-600">Price: {order.product.price}</p>
        <p className="text-gray-600">Discounted Price: {order.totalAmount.toFixed(2)}</p>
        <p className="text-gray-500">Quantity: {order.quantity}</p>
        <p className="text-lg font-bold">Total: &#8377; {order.totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default OrderCard;
