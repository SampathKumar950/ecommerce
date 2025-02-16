import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { offerProducts } from "./Data"; // Import the offer products
import "swiper/css";
import "swiper/css/navigation";
import { Navigate, useNavigate } from "react-router-dom";

const OfferComponent = () => {
  // Filter products with at least 70% discount
  const filteredProducts = offerProducts.filter((product) => product.discountPercentage >= 70);
  const navigate = useNavigate();
  return (
    <div className="relative bg-white p-4 my-4 mx-auto py-4">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Shop Deals in Top Categories</h1>

      <Swiper
        modules={[Navigation]}
        loop={true}
        spaceBetween={20}
        navigation={{
          nextEl: ".swiper-button-next-2", // Connecting Swiper to custom "next" button
          prevEl: ".swiper-button-prev-2", // Connecting Swiper to custom "prev" button
        }}
        breakpoints={{
          240: {slidesPerView:2},
          640: { slidesPerView: 4 }, // 1 slide per view on small screens (e.g., mobile)
          768: { slidesPerView: 5 }, // 2 slides per view on medium screens (e.g., tablet)
          1024: { slidesPerView: 5 }, // 4 slides per view on larger screens (e.g., desktop)
          1280: { slidesPerView: 6 }, // 6 slides per view on very large screens
        }}
        className="offerSwiper"
      >
        {filteredProducts.map((product) => (
          <SwiperSlide key={product.id} className="flex justify-center">
            <div className="bg-white rounded-lg shadow-lg p-4 text-center" 
            onClick={()=>navigate('/searchPage',{state:{category:product.category,discount:product.discount}})}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-50 object-fit mb-4 rounded-lg"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Arrows */}
      <div
        className="swiper-button-prev-2 absolute left-0 top-1/2 transform text-6xl text-blue-400 cursor-pointer font-semibold -translate-y-1/2  p-3 rounded-full z-10"
      >
        &lt;
      </div>

      <div
        className="swiper-button-next-2 absolute right-0 top-1/2 transform text-blue-400 text-6xl font-semibold -translate-y-1/2 p-3 rounded-full z-10 cursor-pointer"
      >
        &gt;
      </div>
    </div>
  );
};

export default OfferComponent;
