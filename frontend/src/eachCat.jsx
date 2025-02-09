import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import Head from './components/top/Head'
import './components/styles/frontendSt.css'

function eachCat() {

    const [count, setCount] = useState(1);
    const [msg, setMsg] = useState("");
    const { categoryName, name } = useParams();
    const location = useLocation();
    const {description, image, price} = location.state || {};

    const HandleDec = () => {
      if(count === 1) {
        setMsg("Minimum limit reached!");
        return;
      }
      setMsg("");
      setCount((prev) => prev - 1);
    }

    const HandleInc = () => {
      if(count === 10) {
        setMsg("Maximum limit reached!");
        return;
      }
      setMsg("");
      setCount((prev) => prev + 1);
    }

  return (
    <div>
      <Head />
      <div className='d-flex justify-content-center vh-100 align-items-center'>
        <div className='p-5 eachCatContainer'>
          <img src={image} className='specifyImg'/>
        </div>
        <div className='px-3 eachCatDetails'>
          <div>
            <h2>{name}</h2>
            <p>{description}</p>
            <h6>Price:</h6>
            <h5>₹{price}/-</h5>
            <h6>Quantity: <button className={`btn btn-${count > 1 ? 'success' : 'danger'}`} onClick={HandleDec}>-</button> {count} <button className={`btn btn-${count == 10 ? 'danger' : 'success'}`} onClick={HandleInc}>+</button></h6>
            {msg && <h5 className='text-danger text-center'>{msg}</h5>}
            <button className='btn btn-info w-100'>ADD TO CART</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default eachCat
