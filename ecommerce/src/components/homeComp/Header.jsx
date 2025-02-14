import { useRoomContext } from './RoomContext';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import { LogoWhite } from '../assets'; // SVG Logo
// import { LogoDark } from '../assets'; // SVG Logo
import { FaShoppingCart } from "react-icons/fa";
import { FaHome } from "react-icons/fa";



const Header = () => {

  const { resetRoomFilterData } = useRoomContext();

  const [header, setHeader] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () =>
      window.scrollY > 50
        ? setHeader(true)
        : setHeader(false)
    );
  });

  const navLinks = ['Home', 'Become a seller', 'cart', 'orders', 'profile'];

  return (
    <header
      className={`fixed z-50 w-full transition-all duration-300 
      ${header ? 'bg-white py-6 shadow-lg' : 'bg-transparent py-8'}`}
    >

      <div className='container mx-auto flex flex-col lg:flex-row items-center lg:justify-between gap-y-6 lg:gap-y-0'>

        {/* Logo */}
        <Link to="/" onClick={resetRoomFilterData}>
        <img className='w-[40px] h-[30px] rounded-full' src='../../public/profile.jpg' />
        </Link>

        {/* Nav */}
        {/* {`${header ? 'text-primary' : 'text-white'} */}
        <nav className=' text-gray flex gap-x-4 lg:gap-x-8 font-tertiary tracking-[3px] text-[15px] items-center uppercase'>
          {
            navLinks.map(link =>
              <Link to="/" className='transition hover:text-accent' key={link}>
                {link}
              </Link>
            )
          }
        </nav>

      </div>

    </header>
  );
};

export default Header;
