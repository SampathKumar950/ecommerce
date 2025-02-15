import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Api from '../../../assets/Api';

const AccountInfo = ({ token }) => {
  const [profile, setProfile] = useState({
    email: 'user@example.com', // Email is fixed, no need for a setter
    phone: '123-456-7890',
    address: '123 Main St, Springfield, IL, 62701',
    oldPassword: '',
    password: '********',
    newPassword: '',
    username: 'username',
    message: '',
    otp: '',
    showOtpInput: false,
    showPasswordReset: false, // Flag to show password reset section
    isFormSubmitted: false, // Flag to make fields immutable
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await Api.get('/api/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });

      // Set profile state with the fetched data
      setProfile({
        ...profile,
        email: response.data.email || profile.email,
        phone: response.data.phone || profile.phone,
        address: response.data.address || profile.address,
        username: response.data.username || profile.username,
        image: response.data.image || profile.image,
      });

      console.log('Profile data fetched:', response.data);
    } catch (error) {
      console.error('Error fetching profile data', error);
    }
  };


  const [generatedOtp,setGeneratedOtp] = useState();

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfile({ ...profile, profilePic: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!profile.showPasswordReset) {
      // Submit form to validate old password and change data
      try {
        const response = await Api.post('/api/users/changeProfile', profile ,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
      const data = response.data.success;
      console.log(data,response.data);
        if (data) {
          setProfile({
            ...profile,
            message: 'Details changed successfully!',
          });
        } else {
          setProfile({
            ...profile,
            message: 'You Have Entered Invalid Password, please try again.',
            oldPassword: '', // Clear old password field
          });
        }
      } catch (error) {
        console.error('Error changing password', error);
        setProfile({ ...profile, message: 'An error occurred while changing Credentials.' });
      }
    }
  };

  const generateOtp = async()=>{
    console.log('hi');
    try{
    const res = await Api.post('/api/users/otpGen',{email:profile.email});
    const data = res.data.otp;
    setGeneratedOtp(data);
    }catch(err){
      console.log(err.message);
    }
  }
  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    if (profile.otp === generatedOtp.toString()) {
      try {
        const response = await Api.post('/api/users/changePassword', {password:profile.newPassword} ,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        }
      );
        setProfile({ ...profile, message: 'Your Password Changed Successfully!', showOtpInput: false, showPasswordReset: true });
      }catch(error){
        setProfile({ ...profile, message: error.message });
      }
    } else {
      setProfile({ ...profile, message: 'Invalid OTP. Please try again.' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>

      {/* Profile Picture */}
      <div className="flex items-center mb-6">
        <img
          src={profile.image}
          className="w-48 h-48 rounded-full mr-4"
          alt="Profile"
        />
        <div>
          <label htmlFor="profilePic" className="text-sm font-medium text-gray-700">
            Change Profile Picture
          </label>
          <input
            type="file"
            id="profilePic"
            accept="image/*"
            onChange={handleProfilePicChange}
            className="mt-2 block w-full text-sm text-gray-700 border rounded-md"
            disabled={profile.isFormSubmitted}
          />
        </div>
      </div>

      {/* Form to update details */}
      <form onSubmit={handleSubmit}>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">User Name</label>
          <input
            type="text"
            name="username"
            value={profile.username}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md"
            disabled={profile.isFormSubmitted}
          />
        </div>

        {/* Email - unchangeable */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={profile.email}
            readOnly
            className="mt-1 block w-full px-4 py-2 border rounded-md bg-gray-200 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter phone number"
            disabled={profile.isFormSubmitted}
          />
        </div>

        {/* Shipping Address */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
          <textarea
            name="address"
            value={profile.address}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            rows="4"
            placeholder="Enter shipping address"
            disabled={profile.isFormSubmitted}
          />
        </div>

        {/* Old Password field (for direct password change) */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            name="oldPassword"
            value={profile.oldPassword}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter Your password"
            disabled={profile.isFormSubmitted}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700 mt-4"
          disabled={profile.isFormSubmitted}
        >
          Save Changes
        </button>
      </form>

      {/* Password Reset (Forgot Password) */}
      {profile.showPasswordReset ? (
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 ml-1 mt-4">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={profile.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter new password"
              disabled={profile.isFormSubmitted}
            />
          </div>
        ) : (
          <button
            type="button"
            onClick={()=>{setProfile({ ...profile, showPasswordReset: true , showOtpInput: true });generateOtp()}}
            className="text-blue-500 hover:underline block ml-1 mt-4"
            disabled={profile.isFormSubmitted}
          >
            Forgot Password?
          </button>
        )}


      {/* OTP Input (only for Forgot Password) */}
      {profile.showOtpInput && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-800">Enter the OTP sent to your email</h3>
          <form onSubmit={handleOtpSubmit}>
            <input
              type="text"
              name="otp"
              value={profile.otp}
              onChange={handleChange}
              maxLength="6"
              className="mt-2 block w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter OTP"
            />
            <button
              type="submit"
              className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
            >
              Verify OTP
            </button>
          </form>
        </div>
      )}

      {/* Success or Error Message */}
      {profile.message && (
        <div className={`mt-4 text-sm font-medium ${profile.message.includes('Invalid') || profile.message.includes('error') ? 'text-red-600' : 'text-green-600'}`}>
          {profile.message}
        </div>
      )}
    </div>
  );
};

export default AccountInfo;
