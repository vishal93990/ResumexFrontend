import React from 'react'
import Hero from '../components/Home/Hero'
import Features from '../components/Home/Features'
import Footer from '../components/Home/Footer'

const Home = () => {
  return (
    <div className='bg-black'>
      <Hero/>
      <Features/>
      <Footer/>
    </div>
  )
}

export default Home
