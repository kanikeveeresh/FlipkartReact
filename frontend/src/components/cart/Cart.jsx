import React, { useEffect, useState } from 'react'
import '../styles/frontendSt.css'
import Head from '../top/Head'
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  let imgSrc = '', title = '', description = '', price = '', count = '';
  const [msg, setMsg] = useState("");
  const [cartcount, setCount] = useState(4);

  const HandleDec = () => {
    if(cartcount === 1) {
      setMsg("Minimum limit reached!");
      return;
    }
    setMsg("");
    setCount((prev) => prev - 1);
  }

  const HandleInc = () => {
    if(cartcount === 10) {
      setMsg("Maximum limit reached!");
      return;
    }
    setMsg("");
    setCount((prev) => prev + 1);
  }

  const fetchData = async() => {
    try{
      const response = await axios.get("http://localhost:5000/getItems");
      setCartItems(response.data);
    }
    catch(err) {
      console.error("Error fetching data", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
    <Head />
      {cartItems.length > 0 ? (
        <div className='d-flex p-3 gap-3 cartBackGround mt-5'>
          <div className='cartItems p-3' style={{flexBasis:'65%'}}>
            <div className='d-flex'>
            {cartItems.map(doc => (
              <div key={doc._id}>
                {doc.items.map((element, index) => {
                  if(element.tag === 'img') {
                    imgSrc = element.content;
                  }
                  else if(element.tag === 'h2') {
                    title = element.content;
                  }
                  else if(element.tag === 'p') {
                    description = element.content;
                  }
                  else if(element.tag === 'span') {
                    price = element.content;
                  }
                  else {
                    count = element.content;
                  }
                })}
              </div>
            ))}
              <div>
                <img src={imgSrc} /><br />
                <div className='align-content-center'><button className={`btn btn-${cartcount > 1 ? 'success' : 'danger'}`} onClick={HandleDec}>-</button><span><strong className='Itemstoget'>{cartcount}</strong></span><button className={`btn btn-${cartcount == 10 ? 'danger' : 'success'}`} onClick={HandleInc}>+</button></div>
                {msg && <p className='text-danger text-center'>{msg}</p>}
              </div>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
                <p>{price}</p>
              </div>
            </div>
          </div>
          <div className='position-relative' style={{flexBasis:'35%'}}>
            <div className='position-fixed cartItems top p-3'>
              <div>
                <h4>PRICE DETAILS</h4>
              </div>
              <hr />
              <div className='d-flex justify-content-between'><span>Price</span><span>10000</span></div><br />
              <div className='d-flex justify-content-between'><span>Discount</span><span>7%</span></div><br />
              <div className='d-flex justify-content-between'><span>Delivery Charges</span><span>40</span></div><br />
              <div className='d-flex justify-content-between'><span>Securing Packaging Fee</span><span>20</span></div>
              <hr />
              <div className='d-flex justify-content-between'><h5>Total Amount</h5><span>20</span></div>
            </div>
          </div>
        </div>
      ) : <img src = 'https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' />}
    </>
  )
}

export default Cart
