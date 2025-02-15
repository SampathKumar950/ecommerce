import { faHeart, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Api from "../../assets/Api";

const Wishlist = () => {
  const token = localStorage.getItem('authtoken');
  const [wishlist, setWishlist] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;
  const navigate = useNavigate();
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await Api.get('/api/users/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const wishlistData = response.data.wishlist || [];
      setWishlist(wishlistData);
      setLikedProducts(wishlistData.map(item => item._id));
    } catch (error) {
      console.error('Error fetching wishlist data', error.message);
    }
  };

  const handleLikeToggle = async (id) => {
    const isLiked = likedProducts.includes(id);
    
    if (isLiked) {
      setLikedProducts(prev => prev.filter(productId => productId !== id));
      setWishlist(prev => prev.filter(item => item._id !== id));

      await Api.delete(`/api/users/wishlist?productId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await Api.post('/api/users/cart', { productId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAddedToCart(prev => [...prev, productId]);
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = wishlist.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <div className="fixed bg-white top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-3xl font-semibold mb-4">Wishlist</h1>
        {wishlist.length === 0 ? (
          <div className="flex justify-center items-center flex-col mt-20">
            <span className="text-8xl">😞</span>
            <p className="text-4xl mt-12">No products in wishlist</p>
          </div>
        ) : (
          <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentProducts.map((product) => {
              const discountedPrice = product.price - (product.price * product.discount) / 100;
              return (
                <div key={product._id} className="bg-white rounded-lg shadow-xl relative p-3">
                  <span
                    className={`absolute top-4 right-2 text-2xl cursor-pointer ${likedProducts.includes(product._id) ? "text-red-500" : "text-gray-300"}`}
                    onClick={() => handleLikeToggle(product._id)}
                  >
                    <FontAwesomeIcon icon={faHeart} />
                  </span>
                  <div className="flex justify-center items-center h-[300px]">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="h-[250px] w-[250px] object-contain"
                      onClick = {()=>{navigate('/productPage',{state:{pid:product._id}})}}
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold">{product.name.substring(0,15)}{product.name.length>=18?'...':''}</h3>
                      <h2 className="bg-green-700 text-white p-1 text-sm rounded-md">
                        {product.rating.toFixed(1)} <FontAwesomeIcon icon={faStar} style={{ color: "white" }} />
                      </h2>
                    </div>
                    <p className="text-sm text-gray-500">{product.brand}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm text-gray-400 line-through">&#8377; {`${product.price.toFixed(2)}`}</span>
                      <span className="text-green-500">{`${product.discount}% Off`}</span>
                    </div>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-lg font-bold">&#8377; {`${discountedPrice.toFixed(2)}`}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{`Available: ${product.stockQuantity}`}</p>
                    <div className="flex flex-col mt-4 space-y-2">
                      {addedToCart.includes(product._id) ? (
                        <button className="bg-indigo-600 text-white py-2 rounded-lg" disabled>
                          Added to Cart
                        </button>
                      ) : (
                        <button
                          className="bg-blue-500 text-white py-2 rounded-lg"
                          onClick={() => handleAddToCart(product._id)}
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {wishlist.length > itemsPerPage && (
          <div className="flex justify-center mt-8">
            <nav>
              <ul className="flex space-x-4">
                {Array.from({ length: totalPages }, (_, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handlePagination(index + 1)}
                      className={`px-4 py-2 rounded-lg ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"}`}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

export default Wishlist;
