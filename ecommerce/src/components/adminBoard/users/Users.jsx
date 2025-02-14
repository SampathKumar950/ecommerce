import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserRemoveCard } from './UserRemoveCard';

const AdminUserList = () => {
  const token = localStorage.getItem('authtoken');

  const [users, setUsers] = useState([]);
  useEffect(()=>{
    fetchData();
  },[])
  const fetchData = async()=>{
    const data = await axios.get('http://localhost:3000/api/admins/users',{
      headers:{
        Authorization: `Bearer ${token}`,
      },
    })
    const usersData = data.data.users;
    setUsers(usersData);
  }

  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user for details view
  const usersPerPage = 3;

  // Filter users based on the search term
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate filtered users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  // Handle user removal
  const handleRemove = async(id) => {
    try{
      const res = await axios.delete('http://localhost:3000/api/admins/deleteUser',{
        headers:{
          Authorization : `Bearer ${token}`,
        },
        params:{
          userId: id
        }
      });
      setUsers(users.filter((user) => user._id !== id));
    }catch(err){
      console.log(err.message);
    }
  };

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle show more details
  const handleShowMoreDetails = (user) => {
    setSelectedUser(user); // Set the selected user for the details modal
  };

  // Handle close details modal
  const handleCloseModal = () => {
    setSelectedUser(null); // Close the modal
  };

  // Calculate total pages
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const[remove,setRemove] = useState(null);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 shadow-lg rounded-lg">
      {
       remove && <UserRemoveCard user = {remove} setUser={setRemove} handleRemove={handleRemove} />
     }
      <h1 className="text-2xl font-semibold text-center mb-6">User Management</h1>

      {/* Search Bar with Search Button */}
      <div className="flex justify-center mb-6">
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search User..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => setSearchTerm(searchTerm)}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Search
          </button>
        </div>
      </div>

      {/* User Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {currentUsers.map((user) => (
          <div
            key={user._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center border border-gray-200"
          >
            {/* Profile Image */}
            <img
              src={user.image}
              alt={user.username}
              className="w-24 h-24 rounded-full mb-4"
            />
            <h3 className="text-lg font-semibold text-center">{user.username}</h3>
            <p className="text-sm text-gray-600 mb-4">{user.email}</p>

            {/* Show More Details Link */}
            <button
              onClick={() => handleShowMoreDetails(user)}
              className="text-indigo-500 text-sm hover:underline mb-4"
            >
              Show More Details
            </button>

            {/* Remove Button */}
            <button
              onClick={() => setRemove(user)}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
            >
              Remove
            </button>
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

      {/* Modal for Showing More Details */}
      {selectedUser && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 w-3/4 max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">{selectedUser.username}</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <p style={{fontSize:'32px'}}>&times;</p>
              </button>
            </div>

            {/* User Details */}
            <div className="space-y-4">
              <img
                src={selectedUser.image}
                alt={selectedUser.username}
                className="w-32 h-32 rounded-full mx-auto mb-4"
              />
              <p><strong>Email:</strong> {selectedUser.email}</p>
              <p><strong>Phone:</strong> {selectedUser.phone}</p>
              <p><strong>Address:</strong> {selectedUser.address}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserList;
