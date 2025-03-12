import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    axios.defaults.withCredentials = true;
    const { backendUrl } = useContext(AppContext)
    const navigate = useNavigate()
    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendUrl + '/api/user/register', { name, email, password })
            if (response) {
                toast.success("New Faculty added!")
                setName("")
                setEmail("")
                setPassword("")
                navigate('/dashboard')
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            console.error(error.message);
        }
    }
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

            <div className='p-10 rounded-lg shadow-lg w-full sm:w-96 text-white text-sm bg-blue-500/70'>
                <h1 className='text-gray-800 font-semibold text-3xl text-center pb-4'>Register</h1>
                <form onSubmit={onSubmitHandler}>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5C]">
                        <img src={assets.name} alt="Mail Icon" className='w-5' />
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            className="bg-transparent outline-none w-full"
                            type="text"
                            placeholder="Full Name"
                            required
                        />
                    </div>
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
                    <button type="submit" className="w-full py-2.5 rounded-full bg-blue-600/50 text-white shadow-md hover:bg-slate-500  flex justify-center items-center ">
                        Register
                    </button>
                </form>
            </div>
        </div>)
}

export default Register