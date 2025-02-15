import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const FacebookLoginComponent = ({register,setRegister}) => {
  const navigate = useNavigate();
  
  // Load the Facebook SDK
  useEffect(() => {
    window.fbAsyncInit = function () {
      window.FB.init({
        appId: '527505910320949', // Replace with your Facebook app ID
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v16.0',
      });
    };

    // Load the SDK script asynchronously
    (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  }, []);

  // Handle Facebook Login
  const handleFacebookLogin = async() => {
    window.FB.login(
     function (response) {
        if (response.authResponse) {
          console.log('Welcome!  Fetching your information.... ');
          window.FB.api('/me', async (userInfo) => {
            console.log(userInfo);
            const data = await Api.post('/api/users/flogin',{
              userInfo
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
            }else{
                console.log(data.data.errors);
                setFormErrors(data.data.errors);
            }
          });
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      },
      { scope: 'public_profile,email' }
    );
  };

  return (
    <div>
      <button className="w-full h-[40px] border border-gray-300 rounded-lg  text-md text-gray-700 my-2 flex  items-center space-x-32 hover:bg-gray-100">
            <FontAwesomeIcon icon={faFacebook} className="ml-3"   style={{ color: "#74C0FC",fontSize:'20px' }} /> 
            <span >Sign In with Facebook</span>
      </button>
    </div>
  );
};

export default FacebookLoginComponent;
