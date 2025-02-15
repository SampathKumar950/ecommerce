import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Api from '../../../assets/Api';

const OrderHistory = () => {
  const token = localStorage.getItem('authtoken');
  const navigate = useNavigate();
  const [orders,setOrders] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async()=>{
    const data = await Api.get('/api/users/orders',{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const orderedData = data.data.orders;
    console.log(data.data);
    setOrders(orderedData);
  }
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 3;

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
       {currentOrders.length==0?<div className='flex justify-center mx-auto '><h2>Your Have No Orders</h2></div>:
        <>
       <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Order History</h2>
          <button
            onClick={()=>navigate('/orders')}
            className="text-lg text-blue-500 hover:text-blue-700 font-medium"
          >
            See More &gt;
          </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentOrders.map((order) => (
          <div key={order._id} className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-800">{order._id}</h3>
            <p className="text-sm text-gray-600">Date: {order.createdAt}</p>
            <p className="text-sm text-gray-600">Total: {order.totalAmount}</p>
            <p className="text-sm text-gray-600">Status: {order.orderStatus}</p>
            <p className="text-sm text-gray-600">Item: {order.product}</p>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 hover:bg-blue-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="self-center text-lg">{currentPage} of {totalPages}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-blue-500 text-white rounded-md ml-2 hover:bg-blue-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
      </>}
    </div>
  );
};

export default OrderHistory;
