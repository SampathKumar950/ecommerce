import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCartPlus, faUsers, faDollarSign, faStar, faExclamationTriangle, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';  // Import the datalabels plugin
import OrderStatusPieChart from './OrderStatusPieChart';
import BestSellingProducts from './BestSellingProducts';
import BestRatedProducts from './BestRatedProducts';
import { useState,useEffect } from 'react';
import axios from 'axios';
import Api from '../../../assets/Api';

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

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    orderCount: 0,
    inventoryCount: 0,
    customerCount: 0,
    revenue: 0,
    storeRating: 0,
    outOfStock: 0,
    revenueData:[],
    productReviews:0,
    recentOrders:[]
  });
  useEffect(()=>{
    fetchData();
  },[])
  const token = localStorage.getItem('authtoken');
  const fetchData = async()=>{
    try{
      const res = await Api.get('/api/vendors/dashBoard',{
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

  return (
    <div className="pt-4 pl-6 bg-gray-100">
      {/* Section 1: Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Orders Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow">
          <FontAwesomeIcon icon={faCartPlus} className="text-4xl text-indigo-500" />
          <div>
            <h3 className="text-xl font-medium">Orders</h3>
            <p className="text-2xl font-semibold">{dashboardData.orderCount}</p>
          </div>
        </div>
        
        {/* Inventory Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow">
          <FontAwesomeIcon icon={faBox} className="text-4xl text-green-500" />
          <div>
            <h3 className="text-xl font-medium">Inventory</h3>
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
        
        {/* Revenue Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow">
          <FontAwesomeIcon icon={faDollarSign} className="text-4xl text-pink-500" />
          <div>
            <h3 className="text-xl font-medium">Revenue</h3>
            <p className="text-2xl font-semibold">&#8377; {dashboardData.revenue}</p>
          </div>
        </div>
      </div>

      {/* Section 2: Cards for Rating, Out of Stock, Product Reviews */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
        {/* Store Rating Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow">
          <FontAwesomeIcon icon={faStar} className="text-4xl text-yellow-400" />
          <div>
            <h3 className="text-xl font-medium">Store Rating</h3>
            <p className="text-2xl font-semibold">{dashboardData.storeRating.toFixed(2)} / 5</p>
          </div>
        </div>
        
        {/* Out of Stock Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow">
          <FontAwesomeIcon icon={faExclamationTriangle} className="text-4xl text-red-500" />
          <div>
            <h3 className="text-xl font-medium">Out of Stock</h3>
            <p className="text-2xl font-semibold">{dashboardData.outOfStock}</p>
          </div>
        </div>
        
        {/* Product Reviews Card */}
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center space-x-6 hover:shadow-xl transition-shadow">
          <FontAwesomeIcon icon={faClipboardList} className="text-4xl text-teal-400" />
          <div>
            <h3 className="text-xl font-medium">Product Reviews</h3>
            <p className="text-2xl font-semibold">{dashboardData.productReviews}</p>
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
            <OrderStatusPieChart />
        </div>
        {/* Recent Orders Table */}
        <div className="w-full  p-6 bg-white rounded-xl shadow-lg overflow-auto">
          <h2 className="text-2xl font-semibold mb-4">Recent Orders</h2>
          <table className="w-full table-auto">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Order Status</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.recentOrders.map((order, index) => (
                <tr key={index} className="border-t">
                  <td className="px-4 py-2">{order.product}</td>
                  <td className="px-4 py-2">{order.quantity}</td>
                  <td className="px-4 py-2">&#8377; {order.totalAmount}</td>
                  <td className="px-4 py-2"> {order.orderStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full  p-6 bg-white rounded-xl shadow-lg overflow-auto">
        <BestSellingProducts />
        </div>
        <div className="w-full  p-6 bg-white rounded-xl shadow-lg overflow-auto">
        <BestRatedProducts />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
