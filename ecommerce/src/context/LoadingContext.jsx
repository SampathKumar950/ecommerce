// src/context/LoadingContext.js

import React, { createContext, useContext, useState } from 'react';

// Create a context
const LoadingContext = createContext();

// Create a custom hook to use loading state
export const useLoading = () => useContext(LoadingContext);

// Provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  // Function to set loading state
  const setLoadingState = (state) => setLoading(state);

  return (
    <LoadingContext.Provider value={{ loading, setLoadingState }}>
      {children}
    </LoadingContext.Provider>
  );
};
