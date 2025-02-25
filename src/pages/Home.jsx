import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Table from '../components/Table'
import Footer from '../components/Footer'
const Home = () => {
  return (
    <div className='h-screen'>
      <Navbar/>
      <Hero/>
      <Table/>
      <Footer/>
    </div>
  )
}

export default Home
