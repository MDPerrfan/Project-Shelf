import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { AppContext } from '../Context/AppContext';
import { Oval } from 'react-loader-spinner'

const Dashboard = () => {
  const navigate = useNavigate();
  const { userData} = useContext(AppContext)
  if (!userData) return <div className='flex items-center justify-center min-h-screen'><Oval
  visible={true}
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="oval-loading"
  wrapperStyle={{}}
  wrapperClass=""
  /></div>;
  return (
    <div className='flex items-center justify-between border-b shadow py-0.5 px-4 sm:px-10 md:px-14 lg:px-36 '>
      <div className='border-b shadow min-h-20 sm:min-h-28'>
        <img
          onClick={() => navigate('/')}
          src={assets.pciu}
          alt="Logo"
          className="absolute left-5 sm:left-20 top-5 w-10 sm:w-16 cursor-pointer "
        />
      </div>
      <div>
        <img onClick={() => navigate('/profile')} className='w-8 rounded-full cursor-pointer' src={userData.image} alt="User" />
      </div>
    </div>
  )
}

export default Dashboard
