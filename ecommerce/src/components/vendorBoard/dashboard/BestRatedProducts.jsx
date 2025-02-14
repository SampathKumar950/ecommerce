import React from 'react';
import ProductCard from './ProductCard';
import {useState,useEffect} from 'react';
import axios from 'axios';

const BestRatedProducts = () => {
  const [products,setProducts] = useState([]);
  const token = localStorage.getItem('authtoken');
  useEffect(()=>{
      fetchData();
    },[])
    const fetchData = async()=>{
      try{
        const response = await axios.get('http://localhost:3000/api/vendors/bestRated',{
          headers:{
            Authorization: `Bearer ${token}`,
          },
        })
        const data = response.data.products;
        console.log(data);
        setProducts(data);
      }catch(error){
        console.log(error);
      }
    }
  

  return (
    <div className="max-w-screen-xl mx-auto p-6">
      <h2 className="text-3xl font-semibold text-center text-gray-800 mb-8"> Best Rated Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default BestRatedProducts;
