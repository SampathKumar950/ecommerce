import React, { useState ,useEffect,useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHand, faHeart, faHome, faRegistered, faSearch, faShoppingBag, faShoppingCart, faSignIn, faSignOut, faUser, faUserFriends } from '@fortawesome/free-solid-svg-icons';
import {useNavigate} from 'react-router-dom';
import { RegisterContext } from '../../App';

const Navbar = ({isHomePage}) => {
  const [isOpaque, setIsOpaque] = useState(false);
  const [logout,setLogout] = useState(false);
  useEffect(() => {
     // Skip scroll effect if not on HomePage
    if(isHomePage){
    const handleScroll = () => {
      if (window.scrollY > 800) {
        setIsOpaque(true); // Make navbar opaque
      } else {
        setIsOpaque(false); // Make navbar translucent
      }
    };
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
    }
    else{
      setIsOpaque(true);
    }
    // Add scroll event listener only if on HomePage
  }, [isHomePage]); // Re-run only if isHomePage changes

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // Function to toggle the mobile menu visibility

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const navigate = useNavigate();
  const{register, setRegister} = useContext(RegisterContext);
  const [searchVal,setSearchVal] = useState('');
  const handleChange = (e)=>{
    setSearchVal(e.target.value);
  }
  const handleSearch = ()=>{
    console.log(searchVal);
    navigate('/searchPage',{state:{query:{name:searchVal}}});
  }
  return (
    <div  className={` fixed top-0 left-0 w-full ${
      isOpaque ? 'bg-white bg-opacity-100' : ' bg-opacity-0'
    }`} style={{zIndex:'50'}}>

    <nav className={`w-full p-3 ${isOpaque?'shadow-md':'shadow-none'}`}>
      <div className="container w-full mx-auto flex justify-between items-center text-black">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <a href="/">UShop</a>
        </div>

        {/* Search Bar (visible only on large screens) */}
        <div className="">
          <input
            type="text"
            placeholder="Search for products..."
            className={`w-100 md:w-90 lg:w-100 sm:w-80 border-2 border-transparent focus:border-blue-600 focus:outline-none p-2 rounded-l-md text-black placeholder-black ${isOpaque?'bg-white':'bg-transparent'}`} // Adjust width and padding for medium size
            value = {searchVal}
            onChange = {(e)=>{handleChange(e)}}
          />
          <button className="p-2 rounded-r-md border-2 border-transparent hover:border-black" onClick={(e)=>{handleSearch(e)}}>
           <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

        {/* Desktop Navbar Links (visible only on large screens) */}
        <div className="hidden lg:flex space-x-6 items-center">
          <button onClick={()=>navigate('/')} className="hover:text-blue-600"><FontAwesomeIcon icon={faHome} /><br /> Home</button>
          {register ==0 && <>
          <button onClick={()=>navigate('/register')} className=" hover:text-blue-600"><FontAwesomeIcon icon={faUser} /><br /> Register</button>
          <button onClick={()=>navigate('/login')} className=" hover:text-blue-600"><FontAwesomeIcon icon={faSignIn} /><br /> LogIn</button>
          </>}
          {register != 0 && <><button onClick={()=>navigate('/profile')} className=" hover:text-blue-600"><FontAwesomeIcon icon={faUserFriends} /><br /> Profile</button>
          <button onClick={()=>navigate('/wishlist')} className=" hover:text-blue-600"><FontAwesomeIcon icon={faHeart} /><br /> WishList</button>
          <button onClick={()=>navigate('/cart')} className=" hover:text-blue-600"><FontAwesomeIcon icon={faShoppingCart} /><br /> Cart</button>
          <button onClick={()=>navigate('/orders')} className=" hover:text-blue-600"><FontAwesomeIcon icon={faShoppingBag} /><br /> Orders</button>
          {register == 1 && <button onClick={()=>navigate('/vendorform')} className=" hover:text-blue-600"><FontAwesomeIcon icon={faUserFriends} /><br />Be A Seller</button>}
          {register == 2 && <button onClick={()=>navigate('/vendor')} className=" hover:text-blue-600"><FontAwesomeIcon icon={faUserFriends} /><br />Vendor Board</button>}
          {register == 3 && <button onClick={()=>navigate('/admin')} className=" hover:text-blue-600"><FontAwesomeIcon icon={faUserFriends} /><br />Admin Board</button>}
          <button onClick={()=>{setLogout(true)}} className=" hover:text-blue-600"><FontAwesomeIcon icon={faSignOut} /><br /> Sign Out</button>
          </>}
        </div>
        {logout &&
         (<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50" >
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
            <h3 className="text-xl mb-4">Do You Want To Logout From Ushop ? </h3>
            <div className ="">
                <button className="bg-gray-800 text-white rounded-lg p-2 mr-5" onClick={()=>{setRegister(0); localStorage.removeItem('authtoken'); setLogout(false); navigate('/'); return;}}>
                    yes
                </button>
                <button className="bg-gray-800 text-white rounded-lg p-2" onClick={()=>setLogout(false)}
                >
                    No
                </button>
            </div>
            </div>
        </div>)
     }

        {/* Menu Button for Mobile */}
        <button
          className="lg:hidden "
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Navbar Links (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div className="lg:hidden p-4 space-y-2 mt-2">
          <button onClick={()=>navigate('/')} className="block "> Home</button>
          {register ==0 && <>
          <button onClick={()=>navigate('/register')} className="block "> Register</button>
          <button onClick={()=>navigate('/login')} className="block "> LogIn</button>
          </>}
          {register != 0 && <><button onClick={()=>navigate('/profile')} className="block "> Profile</button>
          <button onClick={()=>navigate('/wishlist')} className="block "> WishList</button>
          <button onClick={()=>navigate('/cart')} className="block "> Cart</button>
          <button onClick={()=>navigate('/orders')} className="block "> Orders</button>
          {register == 1 && <button onClick={()=>navigate('/vendorform')} className="block ">Be A Seller</button>}
          {register == 2 && <button onClick={()=>navigate('/vendor')} className="block ">Vendor Board</button>}
          {register == 3 && <button onClick={()=>navigate('/admin')} className="block ">Admin Board</button>}
          <button onClick={()=>{setLogout(true)}} className="block "> Sign Out</button>
          </>}
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navbar;
