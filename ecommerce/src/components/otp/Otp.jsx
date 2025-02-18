import { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { RegisterContext } from "../../App";
import Navbar from "../navbar/Navbar";
import Api from "../../assets/Api";

function Otp() {
  const { register, setRegister } = useContext(RegisterContext);
  const location = useLocation();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(300); // Default 5 minutes in seconds
  const [otpCode, setOtpCode] = useState("");
  const navigate = useNavigate();

  // Handle OTP input change
  const handleOtpChange = (e, index) => {
    const newOtp = [...otp];
    newOtp[index] = e.target.value;
    setOtp(newOtp);
    if (e.target.value && index < otp.length - 1) {
      document.getElementById(`otp-input-${index + 1}`).focus(); // Move to the next input
    }
  };

  // Handle OTP form submission
  const handleSubmit = async () => {
    const otpSubmitted = otp.join("");
    if (otpSubmitted === otpCode) {
        const data =  await Api.post('/api/users/register', location.state.values);
        const {token} = data.data;
        localStorage.setItem('authtoken',token);

          if(data.data.role==='admin')
           setRegister(3);
          else if(data.data.role==='vendor')
           setRegister(2);
          else
           setRegister(1);
      localStorage.removeItem("timer"); // Remove timer when it expires
      localStorage.removeItem("otpSent");
      navigate("/");
    } else {
      alert("You entered the wrong OTP.");
      setOtp(["", "", "", "", "", ""]);
    }
  };

  // // Check OTP status on page load to prevent reloading OTP page
  // useEffect(() => {
  //   const otpVerified = localStorage.getItem("otpVerified");
  //   if (otpVerified === "true") {
  //     navigate("/"); // Redirect to home page if OTP is already verified
  //   } else {
  //     sendOtp(); // Send OTP only if it's not already verified
  //   }
  // }, [navigate]);

  const sendOtp = async () => {
    // Check if OTP has already been sent
    const otpSent = localStorage.getItem("otpSent");
    console.log(otpSent);
    if (!otpSent) {
      // Generate and send OTP only if not already sent
      const data = await Api.post('/api/users/otpGen', {
        email: location.state.values.email,
      });
      setOtpCode(data.data.otp);
      localStorage.setItem("otpSent", "true"); // Flag to indicate OTP has been sent
    } else {
      // If OTP was already sent, just retrieve it
      const storedOtpCode = localStorage.getItem("otpCode");
      setOtpCode(storedOtpCode); // Use the previously generated OTP
    }
  };

  // Set up timer
  useEffect(() => {
    const storedTime = localStorage.getItem("timer");
    const initialTime = storedTime ? parseInt(storedTime, 10) : 300; // Fallback to 5 minutes if no stored time
    setTimer(initialTime);

    const timerId = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer <= 1) {
          clearInterval(timerId);
          localStorage.removeItem("timer"); // Remove timer when it expires
          localStorage.removeItem("otpSent"); // Reset OTP sent flag
          navigate("/register"); // Redirect to register page after 5 minutes
        } else {
          localStorage.setItem("timer", prevTimer - 1); // Store updated timer value
        }
        return prevTimer - 1;
      });
    }, 1000); // Update every second

    return () => clearInterval(timerId); // Clean up on unmount
  }, [navigate]);

  // Format time into minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}`;
  };

  const handleBackToRegister = () => {
    navigate("/register");
    localStorage.removeItem("timer"); // Remove timer when it expires
    localStorage.removeItem("otpSent");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-sm mt-20 sm:max-w-md md:max-w-lg lg:max-w-lg xl:max-w-lg rounded-xl shadow-2xl overflow-hidden mx-auto">
        <div className="mx-auto py-12 px-4 sm:px-8 md:px-8 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-semibold mb-4">OTP Verification</h1>
          </div>

          <div className="my-6">
            <p className="text-sm text-gray-700 mb-4">
              Please enter the OTP sent to your email {location.state.values.email}.
            </p>

            {/* OTP Input Fields */}
            <div className="flex justify-between mb-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`otp-input-${index}`}
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  className="w-12 h-12 text-center border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              ))}
            </div>
          </div>

          <div className="my-6">
            <button
              onClick={handleSubmit}
              className="w-full text-white h-12 bg-blue-600 rounded-3xl mb-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify OTP
            </button>

            <button
              onClick={handleBackToRegister}
              className="w-full h-12 border border-black rounded-3xl mb-3 text-blue-600 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Back to Register
            </button>
          </div>

          {/* Timer Display */}
          <div className="text-center text-sm text-gray-500">
            <p>Time remaining: {formatTime(timer)}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Otp;
