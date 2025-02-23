import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPass from './pages/ResetPass'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import VerifyEmail from './pages/VerifyEmail'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'

const App = () => {
  return (
    <div>
      <ToastContainer/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/verify-email' element={<VerifyEmail/>}/>
      <Route path='/reset-pass' element={<ResetPass/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/profile' element={<Profile/>}/>
    </Routes>
    </div>

  )
}

export default App
