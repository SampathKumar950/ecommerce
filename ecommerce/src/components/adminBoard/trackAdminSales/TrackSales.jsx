import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCartPlus, faUsers, faDollarSign, faStar, faExclamationTriangle, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import the datalabels plugin
import TotalUsersGraph from './TotalUsersGraph';
import CategorySales from './CategorySales';
import ABestRatedProducts from './ABestRatedProducts';
import ABestSellingProducts from './ABestSellingProducts';
import { useState,useEffect } from 'react';
import axios from 'axios';

// Register Chart.js components and the plugin
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels // Register the plugin here
);

const TrackSales = () => {

  const [dashboardData, setDashboardData] = useState({
    orderCount: 0,
    inventoryCount: 0,
    customerCount: 0,
    revenue: 0,
    revenueData:[],
  });
  useEffect(()=>{
    fetchData();
  },[])
  const token = localStorage.getItem('authtoken');
  const fetchData = async()=>{
    try{
      const res = await axios.get('http://localhost:3000/api/admins/dashBoard',{
        headers:{
        Authorization: `Bearer ${token}`,
        },
        });
        const data = res.data
        console.log(data);
        setDashboardData(data);
    }catch(error){
      console.log(error.message);
    }
  }
  // Data for Bar Graph (Revenue per Month)
  const revenueData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Total Revenue',
        data: dashboardData.revenueData,
        backgroundColor: 'rgba(24, 178, 239, 0.2)',
        borderColor: 'rgb(75, 143, 192)',
        borderWidth: 1,
      },
    ],
  };

  // Example for 5 recent orders
  const recentOrders = [
    { title: 'Product 1', quantity: 3, price: 150 },
    { title: 'Product 2', quantity: 1, price: 100 },
    { title: 'Product 3', quantity: 2, price: 50 },
    { title: 'Product 4', quantity: 5, price: 200 },
    { title: 'Product 5', quantity: 1, price: 75 },
  ];

  return (
    <div className="pt-4 pl-6 bg-gray-100">
      {/* Section 1: Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Orders Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow">
          <FontAwesomeIcon icon={faCartPlus} className="text-4xl text-indigo-500" />
          <div>
            <h3 className="text-xl font-medium">Total Orders</h3>
            <p className="text-2xl font-semibold">{dashboardData.orderCount}</p>
          </div>
        </div>
        
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow">
          <FontAwesomeIcon icon={faDollarSign} className="text-4xl text-pink-500" />
          <div>
            <h3 className="text-xl font-medium">Revenue</h3>
            <p className="text-2xl font-semibold">&#8377; {dashboardData.revenue}</p>
          </div>
        </div>

        {/* Inventory Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow">
          <FontAwesomeIcon icon={faBox} className="text-4xl text-green-500" />
          <div>
            <h3 className="text-xl font-medium">Total Products</h3>
            <p className="text-2xl font-semibold">{dashboardData.inventoryCount}</p>
          </div>
        </div>
        
        {/* Customers Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow">
          <FontAwesomeIcon icon={faUsers} className="text-4xl text-yellow-500" />
          <div>
            <h3 className="text-xl font-medium">Customers</h3>
            <p className="text-2xl font-semibold">{dashboardData.customerCount}</p>
          </div>
        </div>

      </div>

      {/* Section 3: Graphs and Recent Orders */}
      <div className="mt-12 flex flex-wrap justify-between gap-6">
        {/* Bar Graph (Revenue per Month) */}
        <div className="w-full sm:w-1/2 md-1/2 lg:w-1/2 p-6 bg-white rounded-xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Revenue Through the Year</h2>
          <Bar data={revenueData} options={{ responsive: true, plugins: { title: { display: true, text: 'Revenue per Month' } } }} height={180} />
        </div>
        <div className='bg-white rounded-xl shadow-lg' style={{marginRight:'90px'}}>
        <CategorySales />
        </div>
        <div className='mx-auto bg-white rounded-xl shadow-lg'>
        <TotalUsersGraph />
        </div>
        <div className="w-full  p-6 bg-white rounded-xl shadow-lg overflow-auto">
        <ABestSellingProducts/>
        </div>
        <div className="w-full  p-6 bg-white rounded-xl shadow-lg overflow-auto">
        <ABestRatedProducts/>
        </div>
      </div>
    </div>
  );
}

export default TrackSales;
