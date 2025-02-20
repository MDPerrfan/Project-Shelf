import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import ResetPass from './pages/ResetPass'
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element={<Login/>}/>
      <Route path='/reset-pass' element={<ResetPass/>}/>
    </Routes>
  )
}

export default App
