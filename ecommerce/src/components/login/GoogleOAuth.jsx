import React, { useContext } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import {jwtDecode} from 'jwt-decode'; // to decode the JWT token
import axios from "axios";
import { RegisterContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import Api from '../../assets/Api';
const GoogleOAuth = ({formErrors,setFormErrors}) => {
    const {register,setRegister} = useContext(RegisterContext);
    const navigate = useNavigate();
  const handleLogin = async(response) => {
    if (response.credential) {
      // Decode the JWT token to get user information
      const userObject = jwtDecode(response?.credential);
      console.log('User Info:', userObject);
      const data = await Api.post('/api/users/google',{
        userData: userObject,
      });
      if(data.data.message==='Success'){

        const {token} = data.data;
        localStorage.setItem('authtoken',token);

          if(data.data.role==='admin')
           setRegister(3);
          else if(data.data.role==='vendor')
           setRegister(2);
          else
           setRegister(1);

        navigate('/home');
      }
    }else{
        setFormErrors({...formErrors,invalid:"invalid Credentials"});
    }
  };

  return (
    <div>
      <GoogleLogin
        onSuccess={handleLogin}
        onError={() => console.log('Login Failed')}
        useOneTap
        render={(props) => (
          <button
            {...props}
            className="w-full h-12 border border-black rounded-3xl mb-3 flex justify-center items-center space-x-2 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{ cursor: 'pointer' }}
          >
            {/* Google Icon */}
            <FontAwesomeIcon icon={faGoogle} />
            {/* Button Text */}
            <span>Sign In with Google</span>
          </button>
        )}
      />
    </div>
  );
};

export default GoogleOAuth;
