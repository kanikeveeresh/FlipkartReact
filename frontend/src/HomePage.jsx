import React from 'react'
import HomeSlider from './components/slider/homeSlider'
import Head from './components/top/Head'
import Catagories from './components/middlepage/catagories'
import Footer from './components/Foot/footer'

function HomePage() {
  return (
    <>
        <Head />
        <HomeSlider />
        <Catagories />
        <Footer />
    </>
  )
}

export default HomePage
