import React, { useState,useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
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

const OrderStatusPieChart = () => {

  const [dataC,setDataC] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const token = localStorage.getItem('authtoken');
  const fetchData = async()=>{
    try{
      const res = await Api.get('/api/vendors/dashBoardPie',{
        headers:{
        Authorization: `Bearer ${token}`,
        },
        });
        const d = res.data.statusCount;
        setDataC(d);
    }catch(error){
      console.log(error.message);
    }
  }
  // const l = ['Pending', 'Confirmed', 'Shipped', 'Packed', 'Cancelled/Return'];
  // const filteredLabels = l.map((val,i)=>dataC[i]>0);
  // const filteredData = dataC.map(val=>val>0);
  // Data for the pie chart
  const data = {
    labels: ['Pending', 'Confirmed', 'Shipped', 'Packed', 'Cancelled/Return'],
    datasets: [
      {
        data: dataC, // Replace with your actual data
        backgroundColor: [
          '#00D9D9', // Pending (Crystal Blue)
          '#FF66B2', // Confirmed (Crystal Pink)
          '#66FF66', // Shipped (Crystal Green)
          '#FFCC00', // Delivered (Crystal Yellow)
          '#FF4040', // Cancelled/Return (Crystal Red)
        ],
        hoverBackgroundColor: [
          '#00A6A6', // Pending Hover (Darker Blue)
          '#FF3385', // Confirmed Hover (Darker Pink)
          '#33CC33', // Shipped Hover (Darker Green)
          '#E6B800', // Delivered Hover (Darker Yellow)
          '#FF1A1A', // Cancelled/Return Hover (Darker Red)
        ],
        borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff'],
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
        <h2 className="text-center text-2xl font-bold text-black mb-4">Order Status Overview</h2>
        <Pie data={data} options={options} width={400} height={300} />
      </div>
    </div>
  );
};

export default OrderStatusPieChart;
