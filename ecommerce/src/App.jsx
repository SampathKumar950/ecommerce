import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import AuthForm from "./components/authForm/Authform";
import { useState,useContext,createContext,useEffect } from 'react';
import Otp from "./components/otp/Otp";
import Vendor from "./pages/vendor/Vendor";
import Inventory from "./components/vendorBoard/inventory/Inventory";
import Profile from "./pages/profile/Profile";
import Admin from "./pages/admin/Admin";
import ProductShowcase from "./components/productshowcase/ProductShowcase";
import CartPage from "./pages/cart/CartPage";
import Wishlist from "./pages/wishlist/Wishlist";
import Home from "./pages/home/Home";
import Spinner from './components/Spinner';
import { LoadingProvider } from "./context/LoadingContext";
import Orders from "./pages/orders/Orders";
import EcommerceSearchPage from "./pages/searchpage/EcommerceSearchPage";
import ProductPage from "./pages/productpage/ProductPage";
import OrderDetailPage from "./pages/orderPage/orderDetailPage";
import PaymentGateway from "./trails/PaymentGateway";
import FacebookLoginComponent from "./trails/FacebookLoginComponent";
import { GoogleOAuthProvider } from "@react-oauth/google";
import VendorForm from "./pages/vendorFormPage/VendorForm";

export const RegisterContext = createContext();
const dummyOrder = {
  id: 1,
  productName: "Smartphone",
  productImage: "https://via.placeholder.com/150",
  productDescription: "Latest 5G smartphone with amazing features.",
  price: 999.99,
  discount: 20,
  rating: 3,
  review: "",
  status: "Shipped", // Change this to "Packed", "Delivered", or "Cancelled" to test different statuses
}; 
function App(){

  const [register,setRegister] = useState(()=>{
    const savedCount = localStorage.getItem('register');
    return savedCount ? JSON.parse(savedCount) : 0;}
  );
  useEffect(() => {
    localStorage.setItem('register', JSON.stringify(register));
  }, [register]);

    return(
      <>
       <LoadingProvider>
       <GoogleOAuthProvider clientId='716608077942-h9is3i3hbv7e8nnmp8cin195acem8e9d.apps.googleusercontent.com'>
      <RegisterContext.Provider value={{ register, setRegister }}>
      <BrowserRouter>
      <Routes>
        <Route path='/home' element = {<Home />}></Route>
        <Route path="/wishlist" element = {<Wishlist />}></Route>
        <Route path="/vendorform" element = {<VendorForm />}></Route>
        <Route path="/vendor" element= {<Vendor />}></Route>
        <Route path='/admin' element= {<Admin />}></Route>
        <Route path="/login" element= {<Login />}> </Route>
        <Route path="/register" element= {<Register />}> </Route>
        <Route path="/navbar" element= {<Navbar />}> </Route>
        <Route path='/otp' element= {<Otp />}></Route>
        <Route path="/profile" element= {<Profile />}></Route>
        <Route path="/product" element = {<ProductShowcase />}></Route>
        <Route path="/cart" element = {<CartPage />}></Route>
        <Route path='/orders' element = {<Orders />}></Route>
        {/* <Route path='/order' element = {<OrderDetailPage1 order={dummyOrder} />}></Route> */}
        <Route path='/searchPage' element = {<EcommerceSearchPage/>}></Route>
        <Route path='/productPage' element = {<ProductPage />}></Route>
        <Route path='/orderPage' element = {<OrderDetailPage/>}></Route>
        <Route path="/payment" element = {<PaymentGateway />}></Route>
      </Routes>
      </BrowserRouter>
      </RegisterContext.Provider>
      </GoogleOAuthProvider>
      </LoadingProvider>
      </>
    );
}

export default App;




















// import React from 'react';
// import FacebookLoginComponent from './FacebookLoginComponent';

// const App = () => {
//   return (
//     <div>
//       <h1>Facebook Login Example</h1>
//       <FacebookLoginComponent />
//     </div>
//   );
// };

// export default App;





// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import PaymentGateway from './PaymentGateway'

// function App() {
//   const user = {
//     username:"Bunny",
//     phone:9381484195,
//     email:"lankasampath950@gmail.com"
//   }
//   const product = {
//     price:1000
//   }
//   return (
//     <>
//     <PaymentGateway user = {user} product = {product}/>
//     </>
//   )
// }

// export default App


//     { const removeFromWishlist = async (productId) => {
//   try {
//     const response = await fetch('http://localhost:5000/api/users/wishlist', {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${token}`,  // Include the JWT token
//       },
//       body: JSON.stringify({ productId })
//     });
//     const data = await response.json();
//     console.log(data.message);  // "Product removed from wishlist"
//   } catch (error) {
//     console.error('Error removing product:', error);
//   }
// }; }