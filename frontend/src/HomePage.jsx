import React, { useEffect } from 'react'
import HomeSlider from './components/slider/homeSlider'
import Head from './components/top/Head'
import Catagories from './components/middlepage/catagories'
import Footer from './components/Foot/footer'
import axios from 'axios'

function HomePage({cartCount, setCartCount}) {

  const baseURL = import.meta.env.VITE_API_URL;

  const GetCartCount = async () => {
    try {
      const response = await axios.get(`${baseURL}/getCount`);
      setCartCount(() => response.data.count || 0);
    }
    catch(err) {
      console.error("Server error", err);
    }
  }

  useEffect(() => {
    GetCartCount();
  }, []);
  return (
    <>
        <Head cartCount={cartCount}/>
        <HomeSlider />
        <Catagories />
        <Footer />
    </>
  )
}

export default HomePage
