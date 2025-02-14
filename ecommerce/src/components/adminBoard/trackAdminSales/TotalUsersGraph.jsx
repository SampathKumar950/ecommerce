import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState,useEffect } from 'react';
import axios from 'axios';

const TotalUsersGraph = () => {

  const [usersData,setUsersData] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const token = localStorage.getItem('authtoken');
  const fetchData = async()=>{
    try{
      const res = await axios.get('http://localhost:3000/api/admins/graph',{
        headers:{
        Authorization: `Bearer ${token}`,
        },
        });
        const data = res.data.newUserData;
        console.log(data);
        setUsersData(data);
    }catch(error){
      console.log(error.message);
    }
  }
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'], // Months
    datasets: [
      {
        label: 'Total Users',
        data: usersData, // Number of users per month
        fill: false,
        borderColor: 'skyblue', // Line color
        tension: 0.2, // Line smoothness
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Total Users',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Total Users per Month</h2>
      <Line data={data} options={options} width={800}  height={400} />
    </div>
  );
};

export default TotalUsersGraph;
