import React, { useState , useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Api from '../../../assets/Api';


const AdminProductsPage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('authtoken');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingVendorDetails, setViewingVendorDetails] = useState(null);
  const productsPerPage = 4;

  const [productData, setProductData] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async()=>{
    const data = await Api.get('/api/admins/products',{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    })
    const product = data.data.products;
    console.log(product);
    setProductData(product);
  }
  const filteredProducts = productData.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) //|| 
      // productData.some(
      //   (checkProduct) =>
      //    checkProduct.vendor._id === product.vendor._id && 
      //     product.vendor.businessName.toLowerCase().includes(searchTerm.toLowerCase())
      // )
  );

  // Paginate products
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle vendor details modal
  const handleShowVendorDetails = (vendor) => {
    setViewingVendorDetails(vendor);
  };

  // Handle modal close
  const handleCloseVendorDetails = () => {
    setViewingVendorDetails(null);
  };

  // Pagination controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Total pages for products
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
    {currentProducts.length==0?
      <div role="status">
          <svg aria-hidden="true" className="mx-auto mt-40 w-10 h-10 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
      </div>
      :
    <div className="max-w-6xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold text-center mb-6">Manage Products</h1>

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search for a product"
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

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => {
          // const vendor = vendorData.find((v) => v.vendorId === product.vendorId);
          return (
            <div key={product.productId} className="bg-white shadow-md rounded-lg p-4 flex flex-col border border-gray-200">
              <h3 className="text-lg font-semibold text-center">{product.name}</h3>
              
              {/* Product Images */}
              <div className="mb-2" onClick={()=>navigate('/productPage',{state:{pid:product._id}})}>
                <img src={product.images[0]} alt={product.name} className="w-full h-40 object-fit rounded-md" />
              </div>

              <p className="text-sm text-gray-600">{product.description.substring(0,40)}...</p>
              <p className="text-sm text-gray-600">Price: {product.price}</p>
              <p className="text-sm text-gray-600">Discount: {product.discount}</p>
              <p className="text-sm text-gray-600">Stock: {product.stockQuantity}</p>
              <p className="text-sm text-gray-600">Brand: {product.brand}</p>
              <p className="text-sm text-gray-600">Category: {product.category[0]}...</p>
              <p className="text-sm text-gray-600">Rating: {product.rating.toFixed(1)}</p>

              <div className="mt-4">
                <p className="font-semibold">Vendor: {product.vendor.businessName}</p>
                <button
                  onClick={() => handleShowVendorDetails(product.vendor)}
                  className="text-indigo-600 hover:underline mt-2"
                >
                  Show Vendor Details
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination for Products */}
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

      {/* Vendor Details Modal */}
      {viewingVendorDetails && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-3/4 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Vendor Details</h2>
              <button
                onClick={handleCloseVendorDetails}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                &times;
              </button>
            </div>

            <div className="flex items-center mb-6">
              <img
                src="https://randomuser.me/api/portraits/men/1.jpg"
                alt="Vendor Profile"
                className="w-16 h-16 rounded-full mr-4"
              />
              <div>
                <h3 className="text-xl font-semibold">{viewingVendorDetails.businessName}</h3>
                <p>Email: {viewingVendorDetails.email}</p>
                <p>Phone: {viewingVendorDetails.phone}</p>
                <p>Address: {viewingVendorDetails.address}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>}
    </>
  );
};

export default AdminProductsPage;
