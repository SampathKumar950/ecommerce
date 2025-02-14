import React from 'react';
import { useNavigate } from 'react-router-dom';

// Sample category data
const categories = [
  {id: 0, name: "Mobiles & Tablets", category:'Mobiles', image: "https://rukminim2.flixcart.com/fk-p-flap/64/64/image/6c22d4999cdb4144.jpg?q=100"},
  { id: 1, name: 'Electronics', category:'electronics', image: 'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/2e30d5fac47eff64.jpg?q=100' },
  { id: 2, name: 'Fashion', category:'Fashion', image: 'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/46de73feaefc28cd.jpg?q=100' },
  // { id: 3, name: 'Tv', category:'tv', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS9lzusPTkRKtfyiN84AiNUsRnRfJHrp45dw&s' },
  { id: 4, name: 'Home & Kitchen', category:'home', image: 'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/8538d487cd2bc8b7.jpg?q=100' },
  { id: 5, name: 'Furniture', category:'furniture', image: 'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/e7947cc0cc4a6b7c.jpg?q=100' },
  { id: 6, name: 'Beauty, Food..', category:'beauty', image: 'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/800e00a6322c6985.jpg?q=100 '},
  { id: 7, name: 'Top Offers', category:'all', image: 'https://rukminim2.flixcart.com/fk-p-flap/64/64/image/6a99be02898b225d.jpg?q=100' },
];

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full mt-4 mx-auto py-8 px-8 bg-white">
      <div className="flex justify-between overflow-x-auto space-x-6">
        {categories.map(({ id, name, image, category }) => (
          <div
            key={id}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => navigate('/searchPage', { state: { category } })}
          >
            <img
              src={image}
              alt={name}
              className="w-[80px] h-[80px] object-cover rounded-lg" // Ensures uniform size and aspect ratio
            />
            <h3 className="text-center text-lg font-semibold text-gray-800">{name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
