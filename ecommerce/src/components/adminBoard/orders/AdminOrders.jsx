import React, { useState , useEffect} from 'react';
import axios from 'axios';

// Sample orders data
const ordersData = [
  { orderId: 1, userId: 101, vendorIds: [201, 202], product: 'Laptop', totalAmount: '$1000' },
  { orderId: 2, userId: 102, vendorIds: [203], product: 'Smartphone', totalAmount: '$500' },
  { orderId: 3, userId: 103, vendorIds: [204, 205], product: 'Headphones', totalAmount: '$150' },
  { orderId: 4, userId: 101, vendorIds: [201, 202], product: 'Laptop', totalAmount: '$1000' },
  { orderId: 5, userId: 102, vendorIds: [203], product: 'Smartphone', totalAmount: '$500' },
  { orderId: 6, userId: 103, vendorIds: [204, 205], product: 'Headphones', totalAmount: '$150' },
  // Add more orders as needed
];

// Sample user and vendor data (for showing more details)
const userData = [
  { userId: 101, name: 'John Doe', email: 'johndoe@example.com', address: '123 Main St, Cityville', image: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { userId: 102, name: 'Jane Smith', email: 'janesmith@example.com', address: '456 Oak St, Townsville', image: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { userId: 103, name: 'Alex Johnson', email: 'alexjohnson@example.com', address: '789 Pine St, Villageburg', image: 'https://randomuser.me/api/portraits/men/3.jpg' },
];

const vendorData = [
  { vendorId: 201, name: 'Tech Corp', email: 'contact@techcorp.com', address: '10 Tech Rd, Silicon Valley', image: 'https://randomuser.me/api/portraits/men/4.jpg' },
  { vendorId: 202, name: 'Mobile World', email: 'sales@mobileworld.com', address: '20 Mobile Ave, Tech City', image: 'https://randomuser.me/api/portraits/men/5.jpg' },
  { vendorId: 203, name: 'Sound Master', email: 'info@soundmaster.com', address: '30 Sound Blvd, Audio Town', image: 'https://randomuser.me/api/portraits/men/6.jpg' },
  { vendorId: 204, name: 'Audio Max', email: 'support@audiomax.com', address: '50 Audio St, Sound City', image: 'https://randomuser.me/api/portraits/men/7.jpg' },
  { vendorId: 205, name: 'Vision Tech', email: 'help@visiontech.com', address: '60 Vision Rd, Tech Park', image: 'https://randomuser.me/api/portraits/men/8.jpg' },
];

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem('authtoken');
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async()=>{
    const data = await axios.get('http://localhost:3000/api/admins/orders',{
        headers:{
          Authorization: `Bearer ${token}`
        },
    })
    const req = data.data.orders;
    setOrders(req);
    console.log(req);
  }
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to store selected order for details view
  const [viewingUser, setViewingUser] = useState(true); // Toggle between user and vendor view
  const ordersPerPage = 4;
  const vendorsPerPage = 2;

  // Filter orders based on the search term
  const filteredOrders = orders.filter((order) =>
    order._id.toString().includes(searchTerm) ||
    order.user._id.toString().includes(searchTerm)
    || order.vendor._id.toString().includes(searchTerm)
  );

  // Paginate filtered orders
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Handle show more details
  const handleShowMoreDetails = (orderId) => {
    const order = orders.find((order) => order._id === orderId);
    const user = order.user;
    const vendors = [order.vendor];
    setSelectedOrder({ order, user, vendors });
  };

  // Handle close modal
  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  // Change page for orders
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages for orders
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Change page for vendors
  const [vendorPage, setVendorPage] = useState(1);
  const paginateVendors = (pageNumber) => setVendorPage(pageNumber);

  // Calculate total pages for vendors
  const totalVendorPages = selectedOrder ? Math.ceil(selectedOrder.vendors.length / vendorsPerPage) : 1;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Order Management</h1>

      {/* Search Bar with Search Button */}
      <div className="flex justify-center mb-6">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search Order..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setSearchTerm(searchTerm)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* Order Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentOrders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center border border-gray-200"
          >
            <h3 className="text-lg font-semibold text-center">Order ID: {order._id.substring(0,10)}...</h3>
            <p className="text-sm text-gray-600">User ID: {order.user._id.substring(0,10)}...</p>
            <p className="text-sm text-gray-600">Vendor IDs: {order.vendor._id.substring(0,5)}...</p>
            <p className="text-sm text-gray-600">Product: {order.product.substring(0,5)}...</p>
            <p className="text-sm text-gray-600">Total Amount: {order.totalAmount}</p>

            {/* Show More Details Link */}
            <button
              onClick={() => handleShowMoreDetails(order._id)}
              className="text-indigo-500 text-sm hover:underline mt-4"
            >
              Show More Details
            </button>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>

      {/* Modal for Showing More Details */}
      {selectedOrder && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50" style={{marginTop:'60px'}}>
          <div className="bg-white rounded-lg p-8 w-3/4 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Order ID: {selectedOrder.order._id}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <p style={{fontSize:'28px'}}>
                &times;
                </p>
              </button>
            </div>

            {/* Tabs for Users and Vendors */}
            <div className="flex justify-around mb-4">
              <button
                onClick={() => setViewingUser(true)}
                className={`text-lg font-semibold ${viewingUser ? 'text-blue-500' : 'text-gray-500'}`}
              >
                User
              </button>
              <button
                onClick={() => setViewingUser(false)}
                className={`text-lg font-semibold ${!viewingUser ? 'text-blue-500' : 'text-gray-500'}`}
              >
                Vendors
              </button>
            </div>

            {/* User Details Section */}
            {viewingUser && selectedOrder.user && (
              <div className="flex justify-center items-center mb-6">
                <div className="bg-white p-4 shadow-md rounded-lg max-w-lg w-full">
                  <div className="flex items-center mb-4">
                    <img
                      src={selectedOrder.user.image}
                      alt="User Profile"
                      className="w-16 h-16 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="text-xl font-semibold">{selectedOrder.user.username}</h3>
                      <p >User ID: {selectedOrder.user._id}</p>
                      <p>Email: {selectedOrder.user.email}</p>
                      <p>Address: {selectedOrder.user.address}</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">Ordered Product: {selectedOrder.order.product}</p>
                </div>
              </div>
            )}

            {/* Vendors Section */}
            {!viewingUser && selectedOrder.vendors && (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {selectedOrder.vendors
                    .slice((vendorPage - 1) * vendorsPerPage, vendorPage * vendorsPerPage)
                    .map((vendor) => (
                      <div key={vendor._id} className="bg-gray-100 p-4 rounded-lg">
                        <img
                          src={vendor.user.image}
                          alt="Vendor Profile"
                          className="w-16 h-16 rounded-full mb-4"
                        />
                        <h3 className="text-xl font-semibold">{vendor.user.username}</h3>
                        <p>ID: {vendor._id}</p>
                        <p>Email: {vendor.user.email}</p>
                        <p>phone no: {vendor.user.phone}</p>
                        <p>Address: {vendor.user.address}</p>
                        <p className="text-sm text-gray-600 mt-4">BusinessName: {vendor.businessName}</p>
                      </div>
                    ))}
                </div>

                {/* Vendor Pagination */}
                <div className="flex justify-center items-center mt-4">
                  <button
                    onClick={() => paginateVendors(vendorPage - 1)}
                    disabled={vendorPage === 1}
                    className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2">{`${vendorPage} of ${totalVendorPages}`}</span>
                  <button
                    onClick={() => paginateVendors(vendorPage + 1)}
                    disabled={vendorPage === totalVendorPages}
                    className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
