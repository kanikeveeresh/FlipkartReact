import React from 'react'
import CartImg from '../images/cart1.png'
import '../styles/frontendSt.css'

function Head() {
  return (
    <div className='d-flex bg-primary justify-content-between align-items-center px-5 fixed-top'>
      <h2 className='text-white'>Flipkart</h2>
      <input type="text" placeholder='search for products' className='bg-white'/>
      <div className='cart-container'>
        <img src={CartImg} className='cartImg' alt="Cart" />
        <p className='count-text'>0</p>
      </div>
    </div>
  )
}

export default Head
