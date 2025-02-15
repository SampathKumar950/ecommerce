import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Api from '../../../assets/Api';

const EditProduct = ({product,setProduct}) => {

  // Modal state to store the selected order and show modal
       const [selectedProduct, setSelectedProduct] = useState(null);
       const [editedProduct, setEditedProduct] = useState(null);
     
       useEffect(() => {
         setSelectedProduct(product);
         setEditedProduct({ ...product }); // Copy order to editedOrder state
       },[product])
     
       const handleCloseModal = () => {
         setSelectedProduct(null); // Close modal
         setProduct(null);
       };
     
       const handleInputChange = (e) => {
         const { name, value } = e.target;
         setEditedProduct(prev => ({
           ...prev,
           [name]: value,
         }));
       };
       const token = localStorage.getItem('authtoken');
       const handleSaveChanges = async() => {
         // You can handle saving the changes here (e.g., make an API call or update local state)
         try{
          console.log('Changes saved:', editedProduct);
         const data = await Api.put('/api/vendors/updateProduct',editedProduct,{
          headers:{
            Authorization: `Bearer ${token}`,
          },
         })
         console.log('Changes saved:', editedProduct);
         setSelectedProduct(null); // Close modal after saving
         setProduct(null);
         }catch(error){
          console.log(error.message);
         }
       };

  return (
    <div className="p-6 pt-2 bg-gray-100">
      {/* Modal for Editing Order */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50" style={{marginTop:'60px'}}>
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Product Details</h3>
            <div className='flex'>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Product Name:</label>
              <input
                type="text"
                name="name"
                value={editedProduct.name}
                onChange={handleInputChange}
                className="w-35 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="mb-4 ml-2">
                <label className="block text-sm font-medium text-gray-700">Category:</label>
                  <input
                    type="text"
                    name="category"
                    value={editedProduct.category}
                    onChange={handleInputChange}
                    className="w-full p-2 border border-gray-300 rounded-lg"
                />
            </div>
            </div>

            <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description:</label>
              <input
                type="text"
                name="description"
                value={editedProduct.description}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className='flex'>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Price:</label>
              <input
                type="number"
                name="price"
                value={editedProduct.price}
                onChange={handleInputChange}
                className="w-35 p-2 border border-gray-300 rounded-lg"
              />
            </div>

            <div className="ml-4 mb-4">
              <label className="block text-sm font-medium text-gray-700">Discount:</label>
              <input
                type="number"
                name="discount"
                value={editedProduct.discount}
                onChange={handleInputChange}
                className="w-35 p-2 border border-gray-300 rounded-lg"
                disabled
              />
            </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">Stock:</label>
              <input
                type="number"
                name="stock"
                value={editedProduct.stockQuantity}
                onChange={handleInputChange}
                className="w-35 p-2 border border-gray-300 rounded-lg"
                disabled
              />
            </div>
             {/* Product Image Upload */}
            <div className='mt-2 mb-2'>
               <label className="block text-sm font-medium mb-1" htmlFor="image">Product Image</label>
               <input
                 id="image"
                 type="file"
                 onChange={handleInputChange}
                 className="w-full p-2 border rounded-md"
               />
               {editedProduct.image && <p className="text-sm mt-2">Selected Image: {editedProduct.image.name}</p>}
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveChanges}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;
