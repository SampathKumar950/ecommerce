import { FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useNavigate,Link } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import Navbar from "../navbar/Navbar";
import { RegisterContext } from "../../App";
import GoogleOAuth from "./GoogleOAuth";
import Api from "../../assets/Api";

function Login() {


    const {register,setRegister} = useContext(RegisterContext);
    const initialValues = {email: "", password: ""};
    const [formValues,setFormValues] = useState(initialValues);
    const [formErrors,setFormErrors] = useState({});

    const handleChange = (e)=>{
        const {name,value} = e.target;
        setFormValues({...formValues,[name]:value});
    }
    const navigate =  useNavigate();
    const handleSubmit = async (e)=>{
        e.preventDefault();
        validate(formValues);
    }
    const validate = async(values)=>{

        const data = await Api.post('/api/users/login',values);
        if(data.data.message==='Success'){

          const {token} = data.data;
          localStorage.setItem('authtoken',token);

            if(data.data.role==='admin')
             setRegister(3);
            else if(data.data.role==='vendor')
             setRegister(2);
            else
             setRegister(1);

          navigate('/');
        }else{
            console.log(data.data.errors);
            setFormErrors(data.data.errors);
        }
    }
  return (
    <>
    <Navbar />
    <div className="max-w-sm mt-20 sm:max-w-md md:max-w-lg lg:max-w-lg xl:max-w-lg rounded-xl shadow-2xl overflow-hidden mx-auto" style={{marginTop:'70px'}}>
      <div className="mx-auto py-12 px-4 sm:px-8 md:px-8 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-semibold mb-4">Log In</h1>
        </div>
        <div className="my-6">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            onChange = {(e)=>handleChange(e)}
            name = "email"
            value = {formValues.email}
            placeholder="Enter your email"
            className="border border-gray-400 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-md">&nbsp;{formErrors && formErrors.email}</p>
        </div>
        <div className="my-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formValues.password}
            onChange = {handleChange}
            placeholder="Enter your password"
            className="border border-gray-400 py-2 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {formErrors.password ? <p className="text-red-500 text-md">&nbsp;{formErrors.password}</p> : 
          <p className="text-gray-500 text-sm">&nbsp;minimum length = 8 , 1 UpperCase Letter , 1 Symbol</p>}
        </div>
        <div className="my-6">
          <button onClick={handleSubmit} className="w-full text-white h-12 bg-blue-600 rounded-3xl mb-3 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            Submit
          </button>
          <GoogleOAuth formErrors={formErrors} setFormErrors={setFormErrors}/>
          <button className="w-full h-[40px] border border-gray-300 rounded-lg  text-md text-gray-700 my-2 flex  items-center space-x-32 hover:bg-gray-100">
            <FontAwesomeIcon icon={faFacebook} className="ml-3"   style={{ color: "#74C0FC",fontSize:'20px' }} /> 
            <span >Sign In with Facebook</span>
          </button>
        </div>
        <div className="text-center">
          <Link to='/register' className="text-blue-900 text-sm hover:underline" >Don't have an Account?Create</Link>
          <p className="text-red-500 text-md">&nbsp; {formErrors && formErrors.invalid}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default Login;
