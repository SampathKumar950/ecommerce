import React from 'react';
import { Pie } from 'react-chartjs-2';
import { useState,useEffect } from 'react';
import axios from 'axios';

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import Api from '../../../assets/Api';

// Register chart elements
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);

const CategorySales = () => {

  const [dataC,setDataC] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const token = localStorage.getItem('authtoken');
  const fetchData = async()=>{
    try{
      const res = await Api.get('/api/admins/adminPie',{
        headers:{
        Authorization: `Bearer ${token}`,
        },
        });
        const d = res.data.categoryCount;
        console.log(d);
        setDataC(d);
    }catch(error){
      console.log(error.message);
    }
  }
  // Data for the pie chart
  const data = {
    labels: ['Electronics', 'Fashion', 'Sports', 'Furniture', 'Beauty','Kids'],
    datasets: [
      {
        data: dataC, // Replace with your actual data
        backgroundColor: [
          '#00D9D9', 
          '#FF66B2', 
          '#66FF66',
          '#FFCC00', 
          '#FF4040', 
'rgb(173, 0, 211)',
        ],
        hoverBackgroundColor: [
          '#00A6A6', 
          '#FF3385',
          '#33CC33', 
          '#E6B800', 
          '#FF1A1A',
          'rgb(219, 61, 255)',
        ],
        borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff','#fff'],
        borderWidth: 2,
      },
    ],
  };

  // Options to make the chart stylish
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 16,
            weight: 'bold',
            family: 'Arial, sans-serif',
            color: '#333', // Set the text color to dark for good visibility
          },
        },
      },
      tooltip: {
        backgroundColor: '#333',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#fff',
        borderWidth: 2,
        callbacks: {
          label: function (context) {
            return `${context.label}: ${context.raw} Orders`;
          },
        },
      },
    },
    animations: {
      tension: {
        duration: 1000,
        easing: 'easeInOutQuad',
        from: 0.1,
        to: 1,
        loop: true,
      },
    },
  };

  return (
    <div className="flex justify-center items-center p-6">
      <div className="w-full max-w-xl">
        <h2 className="text-center text-2xl font-bold text-black mb-4">Category Demand</h2>
        <Pie data={data} options={options} width={400} height={300} />
      </div>
    </div>
  );
};

export default CategorySales;
