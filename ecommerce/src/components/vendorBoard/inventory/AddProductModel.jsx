import React, { useState } from 'react';
import axios from 'axios';

const AddProductModel = ({ isOpen, onClose, onAddProduct }) => {
  const [productDetails, setProductDetails] = useState({
    name: '',
    brand: '',
    category: '',
    description:'',
    price: '',
    discount: '',
    stockQuantity: '',
    images: [],
  });

  // Handle text input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle image input changes
  const handleImageChange = (e, index) => {
    const file = e.target.files[0]; // Get the selected file (only one file can be selected per input)

    setProductDetails((prevDetails) => {
      const updatedImages = [...prevDetails.images];
      updatedImages[index] = file; // Update the image at the specific index
      return {
        ...prevDetails,
        images: updatedImages,
      };
    });
  };

  // Remove image from the images array
  const handleRemoveImage = (index) => {
    setProductDetails((prevDetails) => {
      const updatedImages = prevDetails.images.filter((_, i) => i !== index); // Remove the image at the specific index
      return {
        ...prevDetails,
        images: updatedImages,
      };
    });
  };
  const token = localStorage.getItem('authtoken');
  // Handle form submission
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      console.log(token);
      const productList = await axios.post('http://localhost:3000/api/vendors/createProduct',productDetails,{
        headers:{
          Authorization : `Bearer ${token}`,
        },
      });
      onAddProduct(productDetails); // Pass the product details to the parent
      onClose(); // Close the modal after adding the product
    }
    catch(err){
      console.log(err.message);
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-[80%] sm:w-[60%] md:w-[50%] mt-10 max-h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-bold mb-4 text-center">Add a Product</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Row 1: Name and Brand */}
            <div className="flex space-x-4">
              <div className="w-full">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={productDetails.name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700">Brand</label>
                <input
                  type="text"
                  name="brand"
                  value={productDetails.brand}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
            </div>

            {/* Row 2: Category */}
            <div>
              <label className="block text-gray-700">Category</label>
              <input
                type="text"
                name="category"
                value={productDetails.category}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>

            {/* Row 3: Description */}
            <div>
              <label className="block text-gray-700">Description</label>
              <textarea
                name="description"
                value={productDetails.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                rows="3"
                required
              />
            </div>

            {/* Row 4: Price and Discount */}
            <div className="flex space-x-4">
              <div className="w-full">
                <label className="block text-gray-700">Price</label>
                <input
                  type="number"
                  name="price"
                  value={productDetails.price}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  required
                />
              </div>
              <div className="w-full">
                <label className="block text-gray-700">Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={productDetails.discount}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                />
              </div>
            </div>

            {/* Row 5: Stock Quantity */}
            <div>
              <label className="block text-gray-700">Stock Quantity</label>
              <input
                type="number"
                name="stockQuantity"
                value={productDetails.stockQuantity}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded mt-1"
                required
              />
            </div>

            {/* Row 6: Product Images */}
            <div>
              {['Image 1', 'Image 2', 'Image 3', 'Image 4'].map((label, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700">{label}</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                  />
                  {productDetails.images[index] && (
                    <div className="mt-2 flex justify-between items-center">
                      <span>{productDetails.images[index].name}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around mt-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2 hover:bg-blue-600"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

export default AddProductModel;
