import React from 'react'
import categoryData from '../data/catData.js'
import '../styles/frontendSt.css'
import { useNavigate } from 'react-router-dom'

function catagories() {

  const navigate = useNavigate();
  const Opento = (title) => {
    navigate(`/home/${title}`)
  }

  return (
    <div className='pt-5 d-flex justify-content-evenly align-items-center vh-50'>
      {categoryData.map((item, index) => (
        <div key={index} className='d-flex flex-column justify-content-center align-items-center text-center'>
          <img src={item.src} className='imgHover' onClick={() => Opento(item.catagory)}/>
          <h6 className='mt-2'>{item.catagory}</h6>
        </div>
      ))}
    </div>
  )
}

export default catagories
