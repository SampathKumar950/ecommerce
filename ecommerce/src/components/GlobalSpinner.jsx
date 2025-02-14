// src/components/GlobalSpinner.js
import React, { useEffect } from 'react';
import { useLoading } from '../context/LoadingContext';
import Spinner from './Spinner';  // Import the Spinner component

const GlobalSpinner = () => {
  const { loading } = useLoading(); // Get the loading state from context

  if (!loading) return null;

  return <Spinner />;  // Show spinner if loading is true
};

export default GlobalSpinner;