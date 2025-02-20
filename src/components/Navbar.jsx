import React from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
const Navbar = () => {
    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-between border-b shadow  py-0.5 px-4 sm:px-10 md:px-14 lg:px-36 '>
            <img src={assets.pciu} alt="" className='w-10 md:w-16' />
            <div className='flex flex-row-reverse items-center gap-3'>
                <Link to={'/login'} className='text-white px-8 py-2 bg-blue-600 rounded-full'>Login</Link>
                <h1 className='lg:text-3xl md:text-2xl text-xl font-bold text-gray-600 hidden lg:block md:block'>Computer Science and  Engineering Projects</h1>
            </div>
        </div>
    )
}

export default Navbar
