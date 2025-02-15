import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import axios from "axios";
import Navbar from '../navbar/Navbar';
import FacebookLoginComponent from '../../trails/FacebookLoginComponent';
import { RegisterContext } from "../../App";
import GoogleOAuth from '../login/GoogleOAuth';
import Api from '../../assets/Api';

function Register() {
    const navigate = useNavigate();
    const {register,setRegister} = useContext(RegisterContext);
    const initialValues = { username: "", phone: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        validate(formValues);
    };

    const validate = async (values) => {
        const data = await Api.post('/api/users/validate', values);
        if (data.data.message === 'Success') {
            navigate('/otp', { state: { values } });
        } else {
            console.log(data.data.errors);
            setFormErrors(data.data.errors);
        }
    };

    return (
        <>
        <Navbar />
        <div className="max-w-sm max-h-100 sm:max-w-md md:max-w-lg lg:max-w-lg xl:max-w-lg rounded-xl shadow-2xl overflow-hidden mx-auto transition-shadow" style={{marginTop:'80px'}}>
            <div className="mx-auto py-6 px-4 sm:px-6 md:px-6 lg:px-6">
                <div className="text-center">
                    <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Register</h1> {/* Reduced margin-bottom */}
                </div>
                <div className="my-3"> {/* Reduced the margin */}
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formValues.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        className="border border-gray-400 py-1 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-red-500 text-sm">&nbsp;{formErrors && formErrors.username}</p> {/* Reduced font size */}
                </div>
                <div className="my-3"> {/* Reduced the margin */}
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="border border-gray-400 py-1 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-red-500 text-sm">&nbsp;{formErrors && formErrors.email}</p> {/* Reduced font size */}
                </div>
                <div className="my-3"> {/* Reduced the margin */}
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        className="border border-gray-400 py-1 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-red-500 text-sm">&nbsp;{formErrors && formErrors.password}</p> {/* Reduced font size */}
                </div>
                <div className="my-3"> {/* Reduced the margin */}
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formValues.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        className="border border-gray-400 py-1 px-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <p className="text-red-500 text-sm">&nbsp;{formErrors && formErrors.phone}</p> {/* Reduced font size */}
                </div>
                <div className="my-3"> {/* Reduced the margin */}
                    <button
                        onClick={handleSubmit}
                        className="w-full text-white h-8 bg-blue-600 rounded-3xl mb-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Register
                    </button>
                    <GoogleOAuth formErrors = {formErrors} setFormErrors={setFormErrors}/>
                    <FacebookLoginComponent register={register} setRegister={setRegister}/>
                </div>
                <div className="text-center">
                    <Link to="/login" className="text-blue-900 mb-2 text-sm hover:underline">Already have an Account? Log In</Link>
                    <p className="text-red-500 text-md">&nbsp;{formErrors && formErrors.invalid}</p> {/* Reduced font size */}
                </div>
            </div>
        </div>
        </>
    );
}

export default Register;
