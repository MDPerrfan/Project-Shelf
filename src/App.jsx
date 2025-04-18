import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPass from './pages/ResetPass'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import Add from './pages/Add'
import Register from './pages/Register'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register/>}/>
        <Route path='/verify-email' element={<VerifyEmail />} />
        <Route path='/reset-pass' element={<ResetPass />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/add-projects' element={<Add />} />
      </Routes>
    </>

  )
}

export default App
