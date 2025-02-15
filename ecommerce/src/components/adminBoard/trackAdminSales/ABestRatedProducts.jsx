import React, { useEffect, useState } from 'react';
import ProductCard from '../../vendorBoard/dashboard/ProductCard';
// import ProductCard from '../../homeComp/ProductCard';
import axios from 'axios';
import Api from '../../../assets/Api';

const ABestRatedProducts = () => {
  const token = localStorage.getItem('authtoken');
  const[products,setProducts] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async()=>{
    try{
      const response = await Api.get('/api/admins/bestRated',{
        headers:{
          Authorization: `Bearer ${token}`,
        },
      })
      const data = response.data.products;
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

export default ABestRatedProducts;
