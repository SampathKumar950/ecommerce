import React, { useContext } from 'react';
import AccountInfo from '../../components/userProfile/accountInfo/AccountInfo';
import OrderHistory from '../../components/userProfile/orderHistory/OrderHistory';
import ShippingInfo from '../../components/userProfile/shippingInfo/ShippingInfo';
import Notifications from '../../components/userProfile/notifications/Notifications';
import SecuritySettings from '../../components/userProfile/securitySettings/SecuritySettings';
import Wishlist from '../../components/userProfile/wishlist/Wishlist';
import Navbar from '../../components/navbar/Navbar';
import { useNavigate } from 'react-router-dom';
import { RegisterContext } from '../../App';

const Profile = () => {

  const navigate = useNavigate();
  const token = localStorage.getItem('authtoken');
  const {register,setRegister} = useContext(RegisterContext);
    if(!token){
      setRegister(0);
      navigate('/');
    }
  return (
    <>
    {/* Navbar fixed at the top */}
    <div className="fixed bg-white top-0 left-0 w-full z-50">
          <Navbar />
    </div>

    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8">Your Profile</h1>

        {/* Account Information Section */}
        <AccountInfo token = {token} />

        {/* Order History Section */}
        <OrderHistory token = {token}/>

        <Wishlist token = {token}/>

        {/* Notifications Settings Section */}
        <Notifications token = {token}/>

        {/* Security Settings Section */}
        <SecuritySettings token = {token}/>
      </div>
    </div>
    </>
  );
};

export default Profile;
