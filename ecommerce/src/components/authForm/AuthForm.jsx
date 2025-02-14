import Login from "../login/Login";
import Register from "../register/Register";
import { useState } from "react";
const AuthForm = () => {
    const [isLogin, setIsLogin] = useState(true);
  
    const toggleForm = () => {
      setIsLogin(!isLogin);
    };
  
    return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="relative w-full max-w-lg">
            {/* This wrapper will help to contain the sliding effect */}
            <div
              className={`absolute w-full transition-transform duration-500 ease-in-out ${
                isLogin ? "translate-x-full opacity-100" : "-translate-x-full opacity-0"
              }`}
            >
              <Login />
            </div>
    
            <div
              className={`absolute w-full transition-transform duration-500 ease-in-out ${
                !isLogin ? "translate-x-full opacity-100" : "translate-x-full opacity-0"
              }`}
            >
              <Register />
            </div>
          </div>
    
          <div className="mt-4 text-center">
            <button
              onClick={toggleForm}
              className="text-blue-500 underline"
            >
              {isLogin ? "Create Account" : "Already have an Account? Log In"}
            </button>
          </div>
        </div>
      );
    };
    
    export default AuthForm;