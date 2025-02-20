import React from 'react'
import { assets } from '../assets/assets';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()
    const onSubmitHandler = async (e) => {
        e.preventDefault();
    }
    return (
        <div className='flex items-center justify-center min-h-screen px-6 sm:px-0 '>
            <div >
                <img
                    onClick={() => navigate('/')}
                    src={assets.pciu}
                    alt="Logo"
                    className="absolute left-5 sm:left-20 top-5 w-10 sm:w-16 cursor-pointer "
                />
            </div>

            <div className='p-10 rounded-lg shadow-lg w-full sm:w-96 text-indigo-300 text-sm bg-orange-500/70'>
                <h1 className='text-gray-700 font-semibold text-3xl text-center pb-4'>Login</h1>
                <form onSubmit={onSubmitHandler} >
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
                    <button type="submit" className="w-full py-2.5 rounded-full bg-yellow-50 text-gray-700 font-medium shadow-md hover:bg-slate-100">Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login
