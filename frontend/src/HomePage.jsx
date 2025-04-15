import React, { useEffect } from 'react'
import HomeSlider from './components/slider/homeSlider'
import Head from './components/top/Head'
import Catagories from './components/middlepage/catagories'
import Footer from './components/Foot/footer'
import axios from 'axios'

function HomePage({cartCount, setCartCount}) {

  const GetCartCount = async () => {
    const email = localStorage.getItem("email");
    try {
      const response = await axios.get(`https://flipkartreact.onrender.com/getCount`, {
        params: {email: email}
      });
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
