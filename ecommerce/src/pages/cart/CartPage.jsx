import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { handlePayment } from '../../trails/handlePayment';
import Api from '../../assets/Api';

const CartPage = () => {
  const [custDetails, setCustDetails] = useState({
      name: '',
      phone: '',
      address: '',
    });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem('authtoken');
  useEffect(() => {
    fetchCart();
  }, []);
  const navigate = useNavigate();
  const handleSuccess = async(tid)=>{
    console.log(tid);
    try{
      const res = await Api.post('/api/users/createOrder',{
        tid: tid,
        cartItems
      },{
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
      navigate('/');
    }catch(error){
      console.log(error.message);
    }
    
  }
  const fetchCart = async () => {
    try {
      console.log(token);
      const response = await Api.get('/api/users/cart', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      // Assuming the cart data returned is in the response.data.cartItems
      const cartData = response.data.cart || []; // Modify according to the actual API response structure
      
      // Set each product's quantity to 1 when the data is fetched
      const updatedCartItems = cartData.map(item => ({
        ...item,
        quantity: 1,  // Set initial quantity to 1
      }));

      setCartItems(updatedCartItems); // Update state with the cart data

      console.log('Cart data fetched:', updatedCartItems);
    } catch (error) {
      console.error('Error fetching cart data', error);
    }
  };

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = (id, action) => {
    setCartItems(cartItems.map(item => {
      if (item._id === id) { // Ensure consistency with _id
        return {
          ...item,
          quantity: action === 'increase' 
            ? Math.min(item.quantity + 1, item.stockQuantity) // Prevent exceeding stock quantity
            : Math.max(1, item.quantity - 1), // Ensure quantity never goes below 1
        };
      }
      return item;
    }));
  };

  // Handle product removal
  const handleRemoveItem = (id) => {
    removeItemFromCart(id);
    setCartItems(cartItems.filter(item => item._id !== id)); // Filter correctly by _id
  };

  const removeItemFromCart = async(id) => {
    try {
      console.log(token);
      console.log(id);
      const response = await Api.post('/api/users/cartItemDelete',{id}, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log('Item Removed From Cart');
    } catch (error) {
      console.error('Error at Item Removed From Cart');
    }
  };

  // Calculate the total price for the cart items (before discount)
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Calculate the discount amount for each product and overall
  const calculateDiscount = () => {
    return cartItems.reduce((totalDiscount, item) => totalDiscount + (item.price * item.quantity * (item.discount / 100)), 0);
  };

  // Final amount after discount
  const calculateFinalAmount = () => {
    return calculateTotalPrice() - calculateDiscount();
  };
  const [error,setError] = useState('');
  const handleCheckOut = ()=>{
    if(cartItems.length===0){return;}
    if(custDetails.name.length===0||custDetails.address.length===0||custDetails.phone.length===0){
      setError('Please enter All the required fields');
      return;
    }
  handlePayment(calculateFinalAmount().toFixed(2),handleSuccess);
   }
  return (
    <>
      {/* Navbar fixed at the top */}
      <div className="fixed bg-white top-0 left-0 w-full z-50">
        <Navbar />
      </div>
      <>
    {!cartItems?
      <div role="status">
          <svg aria-hidden="true" className="mx-auto mt-40 w-10 h-10 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
      </div>
      :
      <div className="flex flex-col lg:flex-row p-8 space-y-6 lg:space-y-0 lg:space-x-12 bg-gray-100 mt-20">
        {/* Left Section: Cart Items */}
        <div className="lg:w-2/3 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p className="text-lg text-gray-600">Your cart is empty.</p>
          ) : (
            <div>
              {cartItems.map((item) => (
                <div key={item._id} className="block md:flex items-center justify-between py-6 border-b">
                  <div className="flex items-center space-x-6">
                    <div className='flex justify-center'>
                    <img src={item.images[0]} alt={item.name} className="w-30 h-24 object-fit rounded" />
                    </div>
                    <div>
                      <p className="font-medium text-md  lg:text-xl">{item.name.substring(0,20)}{item.name.length>=20?'..':''} <span className='text-white text-sm bg-green-900 p-1 rounded-lg ml-2'>{item.rating.toFixed(1)}<FontAwesomeIcon icon={faStar} /></span></p>
                      <p className="text-md lg:text-lg text-gray-600">&#8377; {item.price.toFixed(2)} each</p>
                      <p className="text-md text-green-400">Available : {item.stockQuantity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      className="text-xl text-gray-600 bg-gray-200 rounded-full p-2"
                      onClick={() => handleQuantityChange(item._id, 'decrease')}
                    >
                      -
                    </button>
                    <span className="text-xl">{item.quantity}</span>
                    <button
                      className="text-xl text-gray-600 bg-gray-200 rounded-full p-2"
                      onClick={() => handleQuantityChange(item._id, 'increase')}
                    >
                      +
                    </button>
                    <button
                      className="ml-4 text-red-600 font-semibold"
                      onClick={() => handleRemoveItem(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Section: Order Summary */}
        <div className="lg:w-1/3 bg-white shadow-lg p-6 rounded-lg">
          <h2 className="text-3xl font-semibold mb-6">Order Summary</h2>
          <div className="space-y-6">
            {/* Loop through cart items and display individual item pricing */}
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between">
                <p className="text-md">{item.name.substring(0,11)}{ item.name.length>=11?'...':''} (x{item.quantity})</p>
                <div>
                  <p className="text-md">&#8377;{item.price.toFixed(2)} x {item.quantity} = &#8377;{(item.price * item.quantity).toFixed(2)}</p>
                  <p className="text-md text-green-500">
                    {`${(item.discount).toFixed(0)}% Discount`} - &#8377;{(item.price * item.quantity * (item.discount / 100)).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}

            {/* Subtotal */}
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Subtotal</p>
              <p className="text-lg">${calculateTotalPrice().toFixed(2)}</p>
            </div>

            {/* Discount */}
            <div className="flex justify-between">
              <p className="text-lg text-green-500">Total Discount</p>
              <p className="text-lg text-green-500">- &#8377;{calculateDiscount().toFixed(2)}</p>
            </div>

            {/* Final Amount */}
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Grand Total</p>
              <p className="text-lg font-semibold">&#8377;{calculateFinalAmount().toFixed(2)}</p>
            </div>

            <div>
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={custDetails.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-gray-700">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={custDetails.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Business Address */}
          <div>
            <label className="block text-gray-700">Delivery Address</label>
            <textarea
              name="address"
              value={custDetails.address}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
             required
            />
          </div>
            {/* Checkout Button */}
            <button className="w-full bg-blue-500 text-white py-3 rounded-lg mt-6 hover:bg-blue-600" onClick={handleCheckOut}>
              Proceed to Checkout
            </button>
            <p className='text-red-500 text-md'>{error}</p>
          </div>
        </div>
      </div>}</>
    </>
  );
};

export default CartPage;
