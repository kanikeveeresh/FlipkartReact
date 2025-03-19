import React from 'react'
import CartImg from '../images/cart1.png'
import '../styles/frontendSt.css'
import { useNavigate } from 'react-router-dom'

function Head({cartCount}) {
  const navigate = useNavigate();
  return (
    <div className='d-flex bg-primary justify-content-between align-items-center px-5 fixed-top'>
      <h2 className='text-white'>Flipkart</h2>
      <input type="text" placeholder='search for products' className='bg-white'/>
      {cartCount !== undefined ?
        <div className='cart-container'>
          <img src={CartImg} className='cartImg cursor-pointer' alt="Cart" onClick={() => navigate('/cart')}/>
          <p className='count-text'>{cartCount}</p>
        </div> : ""}
    </div>
  )
}

export default Head
