import React from 'react';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white mx-auto py-4 px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* First Column */}
        <div>
          {/* Subdivided Row 1 */}
          <div className="h-48 bg-gray-200 rounded-lg relative mb-4"
          onClick={()=>navigate('/searchPage',{state:{category:'smartwatch'}})}>
            <img
              src="https://rukminim2.flixcart.com/fk-p-flap/520/280/image/b1bd2227809495c7.jpeg?q=20"
              alt="First Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* Subdivided Row 2 */}
          <div className="h-48 bg-gray-300 rounded-lg relative"
           onClick={()=>navigate('/searchPage',{state:{category:'microwave'}})}>
            <img
              src="https://rukminim2.flixcart.com/fk-p-flap/520/280/image/7d27eb6667c1ea23.jpg?q=20"
              alt="Second Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Second Column */}
        <div>
          {/* Subdivided Row 1 */}
          <div className="h-48 bg-gray-400 rounded-lg relative mb-4"
           onClick={()=>navigate('/searchPage',{state:{category:'printer'}})}>
            <img
              src="https://rukminim2.flixcart.com/fk-p-flap/520/280/image/62e94f5a8f8faf9b.jpg?q=20"
              alt="Third Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* Subdivided Row 2 */}
          <div className="h-48 bg-gray-500 rounded-lg relative"
          onClick={()=>navigate('/searchPage',{state:{category:'speaker'}})}>
            <img
              src="https://rukminim2.flixcart.com/fk-p-flap/520/280/image/4ddd4a135657a6e4.jpeg?q=20"
              alt="Fourth Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Third Column */}
        <div>
          {/* Subdivided Row 1 */}
          <div className="h-48 bg-gray-400 rounded-lg relative mb-4"
          onClick={()=>navigate('/searchPage',{state:{category:'laptop'}})}>
            <img
              src="https://rukminim2.flixcart.com/fk-p-flap/520/280/image/e25f155035a2b662.jpg?q=20"
              alt="Fifth Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          {/* Subdivided Row 2 */}
          <div className="h-48 bg-gray-500 rounded-lg relative"
          onClick={()=>navigate('/searchPage',{state:{category:'washingmachine'}})}>
            <img
              src="https://rukminim2.flixcart.com/fk-p-flap/520/280/image/fd50e5f04dcc51c0.jpg?q=20"
              alt="Sixth Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
