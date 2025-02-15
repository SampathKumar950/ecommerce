// InventoryList.js
import React, { useEffect, useState } from 'react';
import InventoryCard from './InventoryCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import EditProduct from './EditProduct';
import { RemoveCard } from './RemoveCard';
import axios from 'axios';
import AddProductModel from './AddProductModel';
import Api from '../../../assets/Api';

const Inventory = () => {
  const [products,setProducts] = useState([]);
  const token = localStorage.getItem('authtoken');
  useEffect(()=>{
    getProducts();//currentPage,productsPerPage
  },[]);
 const getProducts = async()=>{ //currentPage,productsPerPage
  try{
  const productList = await Api.get('/api/vendors/inventory',{
    headers:{
      Authorization : `Bearer ${token}`,
    },
    params: {
      page: currentPage,
      size: productsPerPage,
    }
  });
  const product = productList.data.products;
  setProducts(product);
  }catch(error){
    console.log(error.message);
  }
 }
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Get the current products based on the page
  const indexOfLastProduct = currentPage * productsPerPage;
//   console.log(indexOfLastProduct);
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Create page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  const [productEdit,setProductEdit] = useState(null);
  const[deleteProduct,setDeleteProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false);

  const openModal = () => {
    setAddProduct(true);
  };

  const closeModal = () => {
    setAddProduct(false);
  };

  const handleAddProduct = (productDetails) => {
    // Logic to handle adding the product, like sending the data to your backend
    console.log('Product added:', productDetails);
  };

  return (
    <>
    {!products?
<div role="status">
    <svg aria-hidden="true" className="mx-auto mt-40 w-10 h-10 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span class="sr-only">Loading...</span>
</div>
:
    <div className="p-6 pt-4 bg-gray-100">
     {
        productEdit && <EditProduct product={productEdit} setProduct={setProductEdit}/>
     }
     {
       deleteProduct && <RemoveCard product = {deleteProduct} />
     }
     <div className='flex justify-center'>
      <input
      type='text'
      placeholder='Search your Products...'
      className='rounded-lg p-2 w-1/3 m-2 mb-4'
      />
      <button className='px-3 h-10 rounded-lg my-2 bg-gray-800 text-white'>
        <FontAwesomeIcon icon={faSearch} />
      </button>
     </div>
     <div className="p-6 flex justify-center">
      <button
        onClick={openModal}
        className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600"
      >
        <span>+</span>
        <span>Add a Product</span>
      </button>
      <AddProductModel isOpen={addProduct} onClose={closeModal} onAddProduct={handleAddProduct} />
    </div>
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 mt-2 lg:grid-cols-4 gap-6">
        {currentProducts.map((product) => (
           <div key={product._id}>
           <InventoryCard key={product.id} product={product} setProductEdit = {setProductEdit} setDeleteProduct = {setDeleteProduct} />
           </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center space-x-2">
        {pageNumbers.map((number) => (
          <button
            key={number}
            onClick={() => paginate(number)}
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
          >
            {number}
          </button>
        ))}
      </div>
    </div>
    }</>
  );
};

export default Inventory;
