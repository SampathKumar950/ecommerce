import React from 'react';

const FashionBanner = () => {
  return (
    <div className="mx-auto">
      <div className="grid grid-cols-[1fr_2fr] max-w-screen-lg mx-auto">
        {/* First Column: Two Images stacked vertically (Custom Width) */}
        <div className="space-y-4">
          {/* First Image in the first column */}
          <div className="h-72 bg-gray-200 rounded-lg relative">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Fashion Image 1"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 text-white text-xl font-semibold">Fashion Collection 1</div>
          </div>
          {/* Second Image in the first column */}
          <div className="h-72 bg-gray-300 rounded-lg relative">
            <img
              src="https://via.placeholder.com/600x400"
              alt="Fashion Image 2"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 text-white text-xl font-semibold">Fashion Collection 2</div>
          </div>
        </div>

        {/* Second Column: Single Large Image (Taking remaining space) */}
        <div className="flex justify-center items-center">
          <div className="w-full h-full bg-gray-400 rounded-lg relative">
            <img
              src="https://via.placeholder.com/800x600"
              alt="Fashion Banner"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="absolute bottom-4 left-4 text-white text-2xl font-semibold">Exclusive Fashion Sale</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FashionBanner;
