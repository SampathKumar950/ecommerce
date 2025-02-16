// api.js (or in any other file where you want to make the HTTP request)
import axios from 'axios';  // Import the global base URL

// Creating an instance of axios with the base URL
const Api = axios.create({
  baseURL: "https://ecommerce-backend-2rix.onrender.com",  // This is your global URL
});

export default Api;
