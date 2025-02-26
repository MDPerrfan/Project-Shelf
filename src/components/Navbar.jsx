import React, { useContext} from 'react';
import { assets } from '../assets/assets';
import {  useNavigate } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';


const Navbar = () => {
    const { isLoggedin,  userData,  logout} = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className='flex items-center justify-between border-b shadow py-0.5 px-4 sm:px-10 md:px-14 lg:px-36 '>
            <img src={assets.pciu} alt="" className='w-10 md:w-16 cursor-pointer' onClick={()=>navigate('/')}/>
            <div className='flex flex-row-reverse items-center gap-3'>
                {isLoggedin && userData ? (
                    <div className='flex items-center gap-3 cursor-pointer group relative'>
                        <img className='w-8 rounded-full' src={userData.image} alt="User" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown" />
                        <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 p-4 rounded flex flex-col gap-4'>
                                <p onClick={() => navigate('/dashboard')} className='hover:text-black cursor-pointer'>Dashboard</p>
                                <p onClick={logout} className='hover:text-black cursor-pointer'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button onClick={() => navigate('/login')} className='bg-blue-600 text-white px-6 py-2 rounded-full font-light'>
                        Login
                    </button>
                )}
                <h1 className='lg:text-3xl md:text-2xl text-xl font-bold text-gray-600 hidden lg:block md:block'>
                    Computer Science and Engineering Projects
                </h1>
            </div>
        </div>
    );
};

export default Navbar;
