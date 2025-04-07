import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
const Sidebar = () => {
  return (
    <div className='min-h-full md:min-h-screen bg-white border-r shadow border-t min-w-16 sm:min-w-fit '>
      {
        <ul className='text-gray-600 pt-8 '>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-28  cursor-pointer ${isActive?'bg-gray-400 border-r-4 border-primary text-white ':''}`} to={'/dashboard'}>
                <img src={assets.home_icon} alt="" />
                <p className='hidden lg:block '>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-28 cursor-pointer ${isActive?'bg-gray-400 border-r-4 border-primary text-white ':''}`} to={'/add-projects'}>
                <img src={assets.add_icon} alt="" />
                <p className='hidden lg:block '>Add Projects/Thesis</p>
            </NavLink>
            <NavLink className={({isActive})=>` flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-28 cursor-pointer ${isActive?'bg-gray-400 border-r-4 border-primary text-white ':''}`} to={'/register'}>
                <img src={assets.name_icon} alt="" className='bg-black w-7 rounded-full'/>
                <p className='hidden lg:block '>Register Faculty</p>
            </NavLink>
        </ul>
      }
      
    </div>
  )
}

export default Sidebar
