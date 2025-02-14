import React, { useState,useEffect } from "react";
import axios from 'axios';

const AdminVendorRequests = () => {
  const token = localStorage.getItem('authtoken');
  const [requests, setRequests] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async()=>{
    const data = await axios.get('http://localhost:3000/api/admins/requests',{
        headers:{
          Authorization: `Bearer ${token}`
        },
    })
    const req = (data.data.user).concat(data.data.withdraw);
    setRequests(req.map((request) =>  ({...request, status: "Pending"})  ));
    console.log(req);
  }
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("user");
  const [detailsVisible, setDetailsVisible] = useState({});

  const vendorsPerPage = 4; // Number of vendors to display per page

  // Filter vendors based on search term and type (joining or withdraw)
  const filteredVendors = requests.filter(
    (vendor) =>
      vendor.role === activeTab &&
      vendor.user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastVendor = currentPage * vendorsPerPage;
  const indexOfFirstVendor = indexOfLastVendor - vendorsPerPage;
  const currentVendors = filteredVendors.slice(indexOfFirstVendor, indexOfLastVendor);

  // Handle Accept Request
  const handleAccept = (id) => {
    console.log(id);
    try{
      const res = axios.post('http://localhost:3000/api/admins/acceptRequest',{vendorId:id},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
     setRequests(requests.map((request) =>
      request._id === id ? { ...request, status: "Accepted" } : request
     ))}
    catch(err){
      console.log(err.message);
    }
  };

  // Handle Reject Request
  const handleReject = (id) => {
    try{
      const res = axios.post('http://localhost:3000/api/admins/rejectRequest',{vendorId:id},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    setRequests(requests.map((request) =>
      request._id === id ? { ...request, status: "Rejected" } : request
    ));}
    catch(err){
      console.log(err.message);
    }
  };

  // Handle Withdraw Approval
  const handleWithdrawApproval = (id) => {
    try{
      const res = axios.post('http://localhost:3000/api/admins/acceptWithdraw',{vendorId:id},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    setRequests(requests.map((request) =>
      request._id === id ? { ...request, status: "Withdrawn" } : request
    ));}
    catch(err){
      console.log(err.message);
    }
  };

  // Handle Withdraw Rejection
  const handleWithdrawRejection = (id) => {
    try{
      const res = axios.post('http://localhost:3000/api/admins/rejectWithdraw',{vendorId:id},{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
    setRequests(requests.map((request) =>
      request._id === id ? { ...request, status: "Withdraw Rejected" } : request
    ));}
    catch(err){
      console.log(err.message);
    }
  };

  // Toggle show more details
  const toggleDetails = (id) => {
    setDetailsVisible((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Pagination logic
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(filteredVendors.length / vendorsPerPage);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-2xl font-semibold mb-6">Manage Requests</h1>

      {/* Tabs for Joining and Withdraw Requests */}
      <div className="flex space-x-6 mb-6">
        <button
          onClick={() => setActiveTab("user")}
          className={`px-4 py-2 rounded-md   ${activeTab === "user" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-indigo-700 hover:text-white"}`}
        >
          Joining Requests
        </button>
        <button
          onClick={() => setActiveTab("withdraw")}
          className={`px-4 py-2 rounded-md  hover:bg-indigo-700 text-white ${activeTab === "withdraw" ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800 hover:bg-indigo-700 hover:text-white"} `}
        >
          Withdraw Requests
        </button>
      </div>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search Vendor..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-2 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      {/* Vendor Cards */}
      <div className="space-y-4">
        {currentVendors.map((request) => (
          <div key={request._id} className="bg-white shadow-md rounded-lg p-4 border border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold">{request.user.username}</h3>
                <p className="text-gray-600">{request.user.email}</p>
              </div>
              <div>
                <p className={`inline-block px-4 py-1 text-xs rounded-lg ${request.status === "Accepted" ? "bg-green-100 text-green-600" : request.status === "Rejected" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"}`}>
                  {request.status}
                </p>
              </div>
            </div>

            {/* Show More Details */}
            <div className="mt-4">
              {detailsVisible[request._id] && (
                <div className="text-sm text-gray-700">
                  <p><strong>mobile no:</strong> {request.user.phone}</p>
                  <p><strong>Company:</strong> {request.businessName}</p>
                  <p><strong>Location:</strong> {request.user.address}</p>
                </div>
              )}
              <button
                onClick={() => toggleDetails(request._id)}
                className="text-indigo-600 mt-2 text-sm"
              >
                {detailsVisible[request._id] ? "Show Less" : "Show More Details"}
              </button>
            </div>

            {/* Action Buttons (Accept/Reject for Joining and Withdraw Approval/Rejection) */}
            <div className="mt-4 flex justify-end">
              {request.role === "user" && request.status==="Pending"  && (
                <>
                  <button
                    onClick={() =>{handleAccept(request._id);return;}}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600 focus:outline-none"
                    disabled={request.status !== "Pending"}
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleReject(request._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                    disabled={request.status !== "Pending"}
                  >
                    Reject
                  </button>
                </>
              )}

              {request.role === "withdraw" && request.status==="Pending"  && (
                <>
                  <button
                    onClick={() => handleWithdrawApproval(request._id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg mr-2 hover:bg-green-600 focus:outline-none"
                    disabled={request.status !== "Pending"}
                  >
                    Approve Withdraw
                  </button>
                  <button
                    onClick={() => handleWithdrawRejection(request._id)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                    disabled={request.status !== "Pending"}
                  >
                    Reject Withdraw
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mr-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Previous
        </button>
        <span className="px-4 py-2">{`${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 ml-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminVendorRequests;
