// src/components/Spinner.js
import React from 'react';

const Spinner = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-blue-800 bg-opacity-100 z-52">
      <div className="w-16 h-16 border-4 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
