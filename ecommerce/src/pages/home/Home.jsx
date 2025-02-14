import { useState, useEffect } from "react";
import ProductList from "../../components/homeComp/ProductList";
import HeroSlider from "../../components/homeComp/HeroSlider";
import Navbar from "../../components/navbar/Navbar";
import Categories from "../../components/homeComp/Categories";
import OfferComponent from "../../components/homeComp/OfferComponent";
import Banner from "../../components/homeComp/Banner";
import FashionBanner from "../../components/homeComp/FashionBanner";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const token = localStorage.getItem('authtoken');
  const [likedProducts, setLikedProducts] = useState([]);
  const navigate = useNavigate();
  // Fetch liked products once when the component mounts
  useEffect(() => {
    const fetchLikedData = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/users/wishlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLikedProducts(data.wishlist); // Set liked products state
      } catch (error) {
        console.error('Error fetching liked products:', error);
      }
    };
    
    fetchLikedData();
  }, [token]);

  // Handle the toggle functionality for liking/unliking a product
  const handleLikeToggle = async (product) => {
    if(!token){
      navigate('/login');
    }
    const isLiked = (likedProducts?likedProducts.some((likedProduct) => likedProduct._id === product._id):[]);

    if (isLiked) {
      // If already liked, remove from the list
      setLikedProducts(likedProducts.filter((likedProduct) => likedProduct._id !== product._id));
      await axios.delete(`http://localhost:3000/api/users/wishlist?productId=${product._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } else {
      // If not liked, add to the list
      setLikedProducts([...likedProducts, product]);
      await axios.post('http://localhost:3000/api/users/wishlist', { productId: product._id }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  };

  return (
    <div className="bg-gray-100">
      <Navbar isHomePage={false} />
      <div className="mt-20">
        <HeroSlider />
      </div>
      <Categories />
      <OfferComponent />
      <Banner />
      
      {/* Pass likedProducts and handleLikeToggle as props */}
      <ProductList category="electronics" likedProducts={likedProducts} handleLikeToggle={handleLikeToggle} />
      <ProductList category="laptop" likedProducts={likedProducts} handleLikeToggle={handleLikeToggle} />
      <ProductList category="Fashion" likedProducts={likedProducts} handleLikeToggle={handleLikeToggle} />
    </div>
  );
};

export default Home;
