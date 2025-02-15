import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import ProductCard from './ProductCard';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Api from "../../assets/Api";

const ProductList = ({ category, likedProducts, handleLikeToggle }) => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await Api.get('/api/products/getProducts', {
          params: { category },
        });
        setProducts(data.products); // Set products
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    
    fetchData();
  }, [category]);
  const handleSeeMoreClick = () => {
    // Navigate to the page with more products
    navigate('/searchPage',{state:{category}});
  };
  return (
    <div className="relative my-4 mx-auto p-4 bg-white rounded-lg">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Best of {category}</h1>
      <button className="absolute top-4 right-4 text-blue-500 flex items-center space-x-2 hover:underline"
        onClick={handleSeeMoreClick}>
        <span>See More</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
      <div>
        <Swiper
          spaceBetween={10}
          breakpoints={{
            240: {slidesPerView:2},
            640: { slidesPerView: 3 }, // 1 slide per view on small screens (e.g., mobile)
            768: { slidesPerView: 3 }, // 2 slides per view on medium screens (e.g., tablet)
            1024: { slidesPerView: 4 }, // 4 slides per view on larger screens (e.g., desktop)
            1280: { slidesPerView: 4 }, // 6 slides per view on very large screens
          }}
          navigation
          pagination={{ clickable: true }}
          autoplay={false}
          loop={false}
          modules={[Navigation, Pagination, Autoplay]}
        >
          {products && products.map((product) => (
            <SwiperSlide key={product._id}>
              <ProductCard
                product={product}
                likedProducts={likedProducts}
                handleLikeToggle={handleLikeToggle}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ProductList;
