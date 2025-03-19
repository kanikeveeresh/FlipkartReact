import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Head from './components/top/Head'
import Footer from './components/Foot/footer'
import axios from 'axios'
import './components/styles/frontendSt.css'

function eachCat({cartCount, setCartCount}) {

    const [count, setCount] = useState(1);
    const [msg, setMsg] = useState("");
    const { categoryName, name } = useParams();
    const location = useLocation();
    const {title, description, image, price} = location.state || {};
    const navigate = useNavigate();

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

    const HandleAddto = async () => {
      const className = 'Itemstoget'
      const elements = document.querySelectorAll(`.${className}`);

      const extractedEle = [];
      elements.forEach(el => {
        const tag = el.tagName.toLowerCase();
        const content = tag === 'img' ? el.src : el.innerText;
        extractedEle.push({tag, content});
      })

      try {
        const response = await axios.post("http://localhost:5000/data/items", {items: extractedEle});
        alert(response.data.message);
        navigate('/cart');
      }
      catch(err) {
        console.error("Error sending data", err);
        alert("Failed to sending Items to cart");
      }
    }

    const GetCartCount = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getCount");
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
    <div>
      <Head cartCount={cartCount}/>
      <div className='d-flex justify-content-center vh-100 align-items-center'>
        <div className='p-5 eachCatContainer'>
          <img src={image} className='specifyImg Itemstoget'/>
        </div>
        <div className='px-3 eachCatDetails'>
          <div>
            <h2 className='Itemstoget'>{title}</h2>
            <p className='Itemstoget'>{description}</p>
            <h6>Price:</h6>
            <h4>₹<span className='Itemstoget'>{price}</span>/-</h4>
            <h6>Quantity: <button className={`btn btn-${count > 1 ? 'success' : 'danger'}`} onClick={HandleDec}>-</button><span><strong className='Itemstoget'>{count}</strong></span><button className={`btn btn-${count == 10 ? 'danger' : 'success'}`} onClick={HandleInc}>+</button></h6>
            {msg && <h5 className='text-danger text-center'>{msg}</h5>}
            <button className='btn btn-info w-100' onClick={HandleAddto}>ADD TO CART</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default eachCat
