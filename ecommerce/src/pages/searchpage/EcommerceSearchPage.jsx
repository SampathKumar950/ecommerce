import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faStar } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import Api from '../../assets/Api';

// Filter Component
const Filter = ({ onFilterChange, onClearFilters, onSaveFilters, initialFilters }) => {
  const [category, setCategory] = useState(initialFilters.category || '');
  const [discount, setDiscount] = useState(initialFilters.discount || 0);
  const [offers,setOffers] = useState(initialFilters.offers || '');
  const [rating, setRating] = useState(initialFilters.rating || 1);
  const [availability, setAvailability] = useState(initialFilters.availability || false);
  const [name, setName] = useState(initialFilters.name || '');  // Added name filter
  const [minRange,setMinRange] = useState(initialFilters.minRange||'');
  const [maxRange,setMaxRange] = useState(initialFilters.maxRange||'');
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    onFilterChange({
      category: e.target.value,
      minRange,
      maxRange,
      discount,
      rating,
      offers,
      availability,
      name,
    });
  };
  const handleMinRange = (e) => {
    const { value } = e.target;
    setMinRange(value);
    onFilterChange({
      category,
      minRange:e.target.value,
      maxRange,
      discount,
      rating,
      offers,
      availability,
      name,
    });
  };

  const handleMaxRange = (e) => {
    const { value } = e.target;
    setMaxRange(value);
    onFilterChange({
      category,
      minRange,
      maxRange: e.target.value,
      discount,
      rating,
      offers,
      availability,
      name,
    });
  };

  const handleDiscountChange = (e) => {
    setDiscount(e.target.value);
    onFilterChange({
      category,
      minRange,
      maxRange,
      discount: e.target.value,
      rating,
      offers,
      availability,
      name,
    });
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    onFilterChange({
      category,
      minRange,
      maxRange,
      discount,
      rating: newRating,
      offers,
      availability,
      name,
    });
  };

  const handleOffersChange = () => {
    setOffers((prev) => !prev);
    onFilterChange({
      category,
      minRange,
      maxRange,
      discount,
      rating,
      offers: !offers,
      availability,
      name,
    });
  };

  const handleAvailabilityChange = () => {
    setAvailability((prev) => !prev);
    onFilterChange({
      category,
      minRange,
      maxRange,
      discount,
      rating,
      offers,
      availability: !availability,
      name,
    });
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    onFilterChange({
      category,
      minRange,
      maxRange,
      discount,
      rating,
      offers,
      availability,
      name: e.target.value,
    });
  };

  const handleClearAll = () => {
    setCategory('');
    setMinRange(0);
    setMaxRange(20000000);
    setDiscount(0);
    setRating(1);
    setOffers(false);
    setAvailability(false);
    setName('');
    onClearFilters();
  };

  const handleSaveFilters = () => {
    onSaveFilters({
      category,
      minRange,
      maxRange,
      discount,
      rating,
      offers,
      availability,
      name,
    });
  };

  return (
    <div className="w-full md:w-1/4 p-4 border-r fixed top-0 left-0 h-screen overflow-y-auto mt-20">
      <div className="flex justify-between mb-2">
        <h2 className="text-xl font-semibold">Filters</h2>
        <button onClick={handleClearAll} className="text-blue-500 ml-1 mt-1 text-sm hover:underline">Clear</button>
      </div>

      {/* Search by Name */}
      <div>
        <h3 className="text-lg">Search by Name</h3>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Search products"
          className="w-full p-2 border border-gray-300 mb-2"
        />
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-lg">Category</h3>
        <select value={category} onChange={handleCategoryChange} className="w-full p-2 border border-gray-300 mb-2">
          <option value="">All Categories</option>
          <option value="Fashion">Fashion</option>
          <option value="electronics">Electronics</option>
          <option value="home">Home & Kitchen</option>
          <option value="mobile">Mobile</option>
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <h3 className="text-lg">Price Range</h3>
        <div className="flex space-x-4 mb-2">
          <input
            type="number"
            name="minPrice"
            value={minRange}
            onChange={handleMinRange}
            placeholder="Min"
            className="w-1/2 p-2 border border-gray-300"
          />
          <input
            type="number"
            name="maxPrice"
            value={maxRange}
            onChange={handleMaxRange}
            placeholder="Max"
            className="w-1/2 p-2 border border-gray-300"
          />
        </div>
      </div>

      {/* Discount Filter */}
      <div>
        <h3 className="text-lg">Discount</h3>
        <input
          type="range"
          min="0"
          max="100"
          value={discount}
          onChange={handleDiscountChange}
          className="w-full"
        />
        <div className="flex justify-between text-sm mb-2">
          <span>From: {discount}%</span>
        </div>
      </div>

      {/* Customer Rating Filter */}
      <div>
        <h3 className="text-lg">Customer Ratings</h3>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} star={star} filled={star <= rating} onClick={() => handleRatingChange(star)} />
          ))}
        </div>
        <div className="flex justify-between text-sm mb-2">
          <span>Above: {rating} stars</span>
        </div>
      </div>

      {/* Availability Filter */}
      <div>
        <h3 className="text-lg">Availability</h3>
        <label className="flex items-center space-x-2 mb-2">
          <input
            type="checkbox"
            checked={availability}
            onChange={handleAvailabilityChange}
            className="h-5 w-5"
          />
          <span>Include Out of Stock</span>
        </label>
      </div>

      {/* Save Button */}
      <div className="flex justify-center mt-2">
        <button onClick={handleSaveFilters} className="bg-blue-500 text-white px-6 py-2 rounded-lg">Save Filters</button>
      </div>
    </div>
  );
};

// Star Component for Customer Ratings
const Star = ({ star, filled, onClick }) => {
  return (
    <span className={`cursor-pointer text-2xl ${filled ? 'text-yellow-500' : 'text-gray-400'}`} onClick={onClick}>
      &#9733;
    </span>
  );
};

const ProductCard = ({ product, token, likedProducts, setLikedProducts, addedToCart, setAddedToCart }) => {
  const discountedPrice = product.price - (product.price * product.discount) / 100;
  const navigate = useNavigate();
  // Handle "Like" toggle functionality
  const handleLikeToggle = async (id) => {
    console.log('hi');
    if(!token){
      navigate('/login');
      return;
    }
    if (likedProducts.includes(id)) {
       setLikedProducts(likedProducts.filter((productId) => productId !== id));
      await Api.delete(`/api/users/wishlist?productId=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      setLikedProducts([...likedProducts, id]);
      await Api.post('/api/users/wishlist', { productId: id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };

  // Handle Add to Cart functionality
  const handleAddToCart = async (productId) => {
    console.log('hi');
    if(!token){
      navigate('/login');
      return;
    }
    try {
      setAddedToCart([...addedToCart, productId]);
      await Api.post('/api/users/cart', { productId }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Mark as added to cart
    } catch (error) {
      console.error('Error adding product to cart', error);
    }
  };

  return (
    <div key={product._id} className="bg-white rounded-lg shadow-xl relative">
      {/* Heart Icon for Like */}
      <span
        className={`absolute top-4 right-2 text-2xl cursor-pointer ${
          likedProducts.includes(product._id) ? 'text-red-500' : 'text-gray-300'
        }`}
        onClick={() => {handleLikeToggle(product._id); return;}}
      >
        <FontAwesomeIcon icon={faHeart} />
      </span>

      <div className="flex justify-center items-center h-[400px]"
      onClick = {()=>navigate('/productPage',{state:{pid:product._id}})}>
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-[300px] w-[300px] object-contain"
        />
      </div>

      {/* Product Information */}
      <div className="p-3 flex flex-col justify-between h-51">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">{product.name.substring(0,20)}{product.name.length>=20?'...':''}</h3>
          <h2 className="bg-green-700 text-white p-1 text-sm rounded-md">
            {product.rating.toFixed(1)} <FontAwesomeIcon icon={faStar} style={{ color: 'white' }} />
          </h2>
        </div>
        <p className="text-sm text-gray-500">{product.brand}</p>

        {/* Pricing */}
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-400 line-through">&#8377; {product.price.toFixed(2)}</span>
          <span className="text-green-500">{product.discount}% Off</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-lg font-bold">&#8377; {discountedPrice.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-2">{`Available: ${product.stockQuantity}`}</p>

        {/* Add to Cart Button */}
        <div className="flex flex-col mt-3 space-y-2">
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
};



const EcommerceSearchPage = () => {
  const location = useLocation();
  const { category, minPrice, maxPrice, discount, rating, offers, availability} = location.state || {};
  const {name} = location.state?.query||'';
  const [filters, setFilters] = useState({
    category: category || 'All',
    minRange: minPrice || 0,
    maxRange: maxPrice || 20000000,
    discount: discount || 0,
    rating: rating || 3,
    availability: availability || true,
    name: name || '',
  });

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [likedProducts, setLikedProducts] = useState([]);
  const [addedToCart, setAddedToCart] = useState([]);
  const token = localStorage.getItem('authtoken');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await Api.get('/api/products/search', {
          params: filters,
        });
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    const fetchLikedProducts = async () => {
      try {
        const response = await Api.get('/api/users/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const likedProductIds = (response.data.wishlist?response.data.wishlist.map((product) => product._id):[]);
        setLikedProducts(likedProductIds);
      } catch (error) {
        console.error('Error fetching liked products', error);
      }
    };

    fetchProducts();
    fetchLikedProducts();
  }, [filters, token]);
const[showFilter,setShowFilter] = useState(false);
  return (
    <>
    <div className='mb-20'>
      <Navbar />
    </div>
      <div className="block md:hidden text-indigo-500 cursor-pointer hover:underline"
      onClick={()=>setShowFilter(!showFilter)}>{showFilter===false?'Show Filters':'Close'}</div>
      <div className={`${showFilter?'fixed inset-0 bg-white opacity-[90%] flex justify-center items-center z-50 md-hidden':'hidden'}`}>
      <Filter
          onFilterChange={setFilters}
          onClearFilters={() => setFilters({
            category: '',
            name: '',
            minRange: 0,
            maxRange: 20000000,
            discount: 0,
            rating: 1,
            offers: false,
            availability: false,
          })}
          onSaveFilters={()=>setShowFilter(false)}
          initialFilters={filters} 
        />
      </div>
      <div className="flex">
        <div className='hidden md:block'>
        <Filter
          onFilterChange={setFilters}
          onClearFilters={() => setFilters({
            category: '',
            name: '',
            minRange: 0,
            maxRange: 10000000,
            discount: 0,
            rating: 1,
            offers: false,
            availability: false,
          })}
          onSaveFilters={setFilters}
          initialFilters={filters} 
        />
        </div>
        <div className={`w-full md:w-3/4 p-4 md:ml-[25%] overflow-y-auto`}>
          {filteredProducts.length === 0 ? (
            <div className="mt-40 text-center text-lg font-semibold text-gray-500">
              No products found for the selected filters.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  token={token}
                  likedProducts={likedProducts}
                  setLikedProducts={setLikedProducts}
                  addedToCart={addedToCart}
                  setAddedToCart={setAddedToCart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};


export default EcommerceSearchPage;
