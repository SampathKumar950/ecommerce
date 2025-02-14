// src/utils/axiosInstance.js

import axios from 'axios';
import { useLoading } from '../context/LoadingContext';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Set your base URL here
});

// Create Axios interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Before sending request, set loading state to true
    config.loading = true; // For debugging
    useLoading().setLoadingState(true);  // Set global loading state to true
    return config;
  },
  (error) => {
    // Handle error here and set loading to false
    useLoading().setLoadingState(false);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    // After receiving response, set loading state to false
    useLoading().setLoadingState(false);
    return response;
  },
  (error) => {
    // Handle error here and set loading to false
    useLoading().setLoadingState(false);
    return Promise.reject(error);
  }
);

export default axiosInstance;
