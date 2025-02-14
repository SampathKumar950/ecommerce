// OrdersPage.js
import React, { useState,useEffect } from 'react';
import OrderCard from './OrderCard';
import EditOrder from './EditOrder';
import axios from 'axios';

const OrdersPage = () => {
    
     const [orderEdit,setOrderEdit] = useState(null);
  // Example order data for each section
  const order = [
    { id: 1, status: 'pending', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 1', price: 100, discountedPrice: 80, quantity: 2, total: 160 },
    { id: 2, status: 'pending', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 2', price: 150, discountedPrice: 120, quantity: 1, total: 120 },
    { id: 3, status: 'confirmed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 3', price: 80, discountedPrice: 60, quantity: 3, total: 180 },
    { id: 4, status: 'confirmed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 4', price: 120, discountedPrice: 100, quantity: 1, total: 100 },
    { id: 5, status: 'packed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 5', price: 50, discountedPrice: 40, quantity: 5, total: 200 },
    { id: 6, status: 'packed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 6', price: 200, discountedPrice: 180, quantity: 2, total: 360 },
    { id: 7, status: 'shipped', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 7', price: 70, discountedPrice: 60, quantity: 3, total: 180 },
    { id: 8, status: 'shipped', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 8', price: 90, discountedPrice: 75, quantity: 4, total: 300 },
    { id: 9, status: 'cancelled', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 9', price: 200, discountedPrice: 180, quantity: 2, total: 360 },
    { id: 10, status: 'cancelled', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 10', price: 110, discountedPrice: 90, quantity: 3, total: 270 },
    { id: 11, status: 'pending', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 1', price: 100, discountedPrice: 80, quantity: 2, total: 160 },
    { id: 12, status: 'pending', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 2', price: 150, discountedPrice: 120, quantity: 1, total: 120 },
    { id: 13, status: 'confirmed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 3', price: 80, discountedPrice: 60, quantity: 3, total: 180 },
    { id: 14, status: 'confirmed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 4', price: 120, discountedPrice: 100, quantity: 1, total: 100 },
    { id: 15, status: 'packed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 5', price: 50, discountedPrice: 40, quantity: 5, total: 200 },
    { id: 16, status: 'packed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 6', price: 200, discountedPrice: 180, quantity: 2, total: 360 },
    { id: 17, status: 'shipped', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 7', price: 70, discountedPrice: 60, quantity: 3, total: 180 },
    { id: 18, status: 'shipped', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 8', price: 90, discountedPrice: 75, quantity: 4, total: 300 },
    { id: 19, status: 'cancelled', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 9', price: 200, discountedPrice: 180, quantity: 2, total: 360 },
    { id: 20, status: 'cancelled', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 10', price: 110, discountedPrice: 90, quantity: 3, total: 270 },
    { id: 21, status: 'pending', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 1', price: 100, discountedPrice: 80, quantity: 2, total: 160 },
    { id: 22, status: 'pending', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 2', price: 150, discountedPrice: 120, quantity: 1, total: 120 },
    { id: 23, status: 'confirmed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 3', price: 80, discountedPrice: 60, quantity: 3, total: 180 },
    { id: 24, status: 'confirmed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 4', price: 120, discountedPrice: 100, quantity: 1, total: 100 },
    { id: 25, status: 'packed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 5', price: 50, discountedPrice: 40, quantity: 5, total: 200 },
    { id: 26, status: 'packed', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 6', price: 200, discountedPrice: 180, quantity: 2, total: 360 },
    { id: 27, status: 'shipped', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 7', price: 70, discountedPrice: 60, quantity: 3, total: 180 },
    { id: 28, status: 'shipped', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 8', price: 90, discountedPrice: 75, quantity: 4, total: 300 },
    { id: 29, status: 'cancelled', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 9', price: 200, discountedPrice: 180, quantity: 2, total: 360 },
    { id: 30, status: 'cancelled', thumbnail: 'https://via.placeholder.com/150', productName: 'Product 10', price: 110, discountedPrice: 90, quantity: 3, total: 270 },
  ];
  const [orders,setOrders] = useState([]);
   // Pagination state for each section
   const [pendingPage, setPendingPage] = useState(1);
   const [confirmedPage, setConfirmedPage] = useState(1);
   const [packedPage, setPackedPage] = useState(1);
   const [shippedPage, setShippedPage] = useState(1);
   const [cancelledPage, setCancelledPage] = useState(1);
 
   const productsPerPage = 4;  // Set products per page
 
  const token = localStorage.getItem('authtoken');
   useEffect(()=>{
      fetchData();
   },[orderEdit]);
   const fetchData = async()=>{
    try{
      const res = await axios.get('http://localhost:3000/api/vendors/orders',{
        headers:{
          Authorization : `Bearer ${token}`,
        },
      })
      const data = res.data.orders;
      console.log(data);
      setOrders(data);
    }catch(err){
      console.log(err.message);
    }
   }
   // Get orders by status
   const getOrdersByStatus = (status) => orders.filter(order => order.orderStatus === status);
 
 
   // Get current page orders for each section
   const getPageOrders = (status, page) => {
     const ordersForStatus = getOrdersByStatus(status);
     const indexOfLastProduct = page * productsPerPage;
     const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
     return ordersForStatus.slice(indexOfFirstProduct, indexOfLastProduct);
   };
 
 
   return (
    <>
    {!orders?
<div role="status">
    <svg aria-hidden="true" className="mx-auto mt-40 w-10 h-10 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
:
     <div className="p-6 pt-2 bg-gray-100">
        {orderEdit && <EditOrder order={orderEdit} setOrder = {setOrderEdit} /> }
       {/* Section for Pending Orders */}
       <div className="mb-8">
         <h3 className="text-xl font-semibold mb-4">Pending</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" >
           {getPageOrders('pending', pendingPage).map((order) => (
              <div key={order._id} onClick={() => setOrderEdit(order)}>
              <OrderCard key={order._id} order={order} />
              </div>
           ))}
         </div>
         <div className="mt-4 flex justify-center space-x-2">
            <button
               onClick={() => setPendingPage(Math.max(pendingPage-1,1))}
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
             >
               &lt;
             </button>
             <p className='text-xl'>{pendingPage} of {Math.ceil(getOrdersByStatus('pending').length/ productsPerPage)}</p>
             <button
               onClick={() => setPendingPage(Math.min(pendingPage+1,Math.ceil(getOrdersByStatus('pending').length/ productsPerPage)))}
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
             >
               &gt;
             </button>
         </div>
       </div>
 
       {/* Section for Confirmed Orders */}
       <div className="mb-8">
         <h3 className="text-xl font-semibold mb-4">Confirmed</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {getPageOrders('confirmed', confirmedPage).map((order) => (
            <div key={order._id} onClick={() => setOrderEdit(order)}>
             <OrderCard key={order._id} order={order} />
             </div>
           ))}
         </div>
         <div className="mt-4 flex justify-center space-x-2">
            <button
               onClick={() => setConfirmedPage(Math.max(confirmedPage-1,1))}
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
             >
               &lt;
             </button>
             <p className='text-xl'>{confirmedPage} of {Math.ceil(getOrdersByStatus('confirmed').length/ productsPerPage)}</p>
             <button
               onClick={() => setConfirmedPage(Math.min(confirmedPage+1,Math.ceil(getOrdersByStatus('confirmed').length/ productsPerPage)))}
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
             >
               &gt;
            </button>
         </div>
       </div>
 
       {/* Section for Packed Orders */}
       <div className="mb-8">
         <h3 className="text-xl font-semibold mb-4">Packed</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {getPageOrders('packed', packedPage).map((order) => (
              <div key={order._id} onClick={() => setOrderEdit(order)}>
              <OrderCard key={order._id} order={order} />
              </div>
           ))}
         </div>
         <div className="mt-4 flex justify-center space-x-2">
            <button
               onClick={() => setPackedPage(Math.max(packedPage-1,1))}
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
             >
               &lt;
             </button>
             <p className='text-xl'>{packedPage} of {Math.ceil(getOrdersByStatus('packed').length/ productsPerPage)}</p>
             <button
               onClick={() => setPackedPage(Math.min(packedPage+1,Math.ceil(getOrdersByStatus('packed').length/ productsPerPage)))}
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
             >
               &gt;
            </button>
         </div>
       </div>
 
       {/* Section for Shipped Orders */}
       <div className="mb-8">
         <h3 className="text-xl font-semibold mb-4">Shipped</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {getPageOrders('shipped', shippedPage).map((order) => (
              <div key={order._id} >
              <OrderCard key={order._id} order={order} />
              </div>
           ))}
         </div>
         <div className="mt-4 flex justify-center space-x-2">
            <button
               onClick={() => setShippedPage(Math.max(shippedPage-1,1))}
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
             >
               &lt;
             </button>
             <p className='text-xl'>{shippedPage} of {Math.ceil(getOrdersByStatus('shipped').length/ productsPerPage)}</p>
             <button
               onClick={() => setShippedPage(Math.min(shippedPage+1,Math.ceil(getOrdersByStatus('shipped').length/ productsPerPage)))}
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
             >
               &gt;
            </button>
         </div>
       </div>
 
       {/* Section for Cancelled Orders */}
       <div className="mb-8">
         <h3 className="text-xl font-semibold mb-4">Cancelled</h3>
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {getPageOrders('cancelled', cancelledPage).map((order) => (
              <div key={order._id}>
              <OrderCard key={order._id} order={order} />
              </div>
           ))}
         </div>
         <div className="mt-4 flex justify-center space-x-2">
            <button
               onClick={() => setCancelledPage(Math.max(cancelledPage-1,1))}
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
             >
               &lt;
             </button>
             <p className='text-xl'>{cancelledPage} of {Math.ceil(getOrdersByStatus('cancelled').length/ productsPerPage)}</p>
             <button
               onClick={() => setCancelledPage(Math.min(cancelledPage+1,Math.ceil(getOrdersByStatus('cancelled').length/ productsPerPage)))}
               className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
             >
               &gt;
            </button>
         </div>
       </div>
     </div>}</>
   );
 };
 
 export default OrdersPage;