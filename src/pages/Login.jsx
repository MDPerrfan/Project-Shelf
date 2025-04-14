import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
    const { backendUrl, setIsLoggedin, getUserData } = useContext(AppContext);
    axios.defaults.withCredentials = true;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { data } = await axios.post(`${backendUrl}/api/user/login`, { email, password });

            if (data.success) {
                const fetchedUserData = await getUserData();

                if (fetchedUserData) {
                    setLoading(false);
                    if (fetchedUserData.isVerified) {
                        navigate('/dashboard');
                    } else {
                        await sendOtp();
                        navigate('/verify-email');
                    }

                    setIsLoggedin(true);
                    toast.success("Logged in!")
                }
            } else {
                toast.error(data.message);
                setLoading(false);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed!");
            console.log(error);
            setLoading(false);
        }
    };


    // Function to send OTP
    const sendOtp = async () => {
        try {
            const { data } = await axios.post(`${backendUrl}/api/user/verify-otp`, { email });

            if (data.success) {
                toast.success('OTP sent to your email');
            } else {
                toast.error(data.message);
                navigate('/');
            }
        } catch (error) {
            toast.error('Failed to send OTP');
            console.log(error);
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 '>
            <div>
                <img
                    onClick={() => navigate('/')}
                    src={assets.pciu}
                    alt="Logo"
                    className="absolute left-5 sm:left-20 top-5 w-10 sm:w-16 cursor-pointer "
                />
            </div>

            <div className='p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm bg-orange-500/70'>
                <h1 className='text-gray-700 font-semibold text-3xl text-center pb-4'>Login</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.mail_icon} alt="Mail Icon" />
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className="bg-transparent outline-none w-full"
                            type="email"
                            placeholder="Email id"
                            required
                        />
                    </div>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.lock_icon} alt="Lock Icon" />
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className="bg-transparent outline-none w-full"
                            type="password"
                            placeholder="Password"
                            required
                        />
                    </div>
                    <p onClick={() => navigate('/reset-pass')} className="mb-4 text-orange-800 cursor-pointer font-semibold">
                        Reset Password?
                    </p>
                    <button
                        type="submit"
                        className="w-full py-2.5 rounded-full bg-yellow-50 text-gray-700 shadow-md hover:bg-slate-100 flex justify-center items-center font-semibold"
                        disabled={loading} // ⬅️ Disable button when loading
                    >
                        {loading ? (
                            <span className="animate-spin border-t-2 border-black border-solid rounded-full h-5 w-5"></span> // ⬅️ Loader inside button
                        ) : (
                            "Login"
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
