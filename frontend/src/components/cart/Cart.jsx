import React, { useEffect, useState } from 'react'
import '../styles/frontendSt.css'
import Head from '../top/Head'
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [msg, setMsg] = useState("");
  const [quantities, setQuantities] = useState({});

  const HandleDec = (id) => {
    setQuantities((prevQuantities) => {
      const newCount = (prevQuantities[id] || 1) - 1;
      if(newCount < 1) {
        setMsg((prev) => ({ ...prev, [id]: "Minimum limit reached!"}));
        return prevQuantities;
      }
      setMsg((prev) => ({ ...prev, [id]: ""}));
      return { ...prevQuantities, [id]: newCount};
    })
  }

  const HandleInc = (id) => {
    setQuantities((prevQuantities) => {
      const newCount = (prevQuantities[id] || 1) + 1;
      console.log(newCount);
      if(newCount > 10) {
        setMsg((prev) => ({ ...prev, [id]: "Maximum limit reached!"}));
        return prevQuantities;
      }
      setMsg((prev) => ({ ...prev, [id]: ""}));
      return { ...prevQuantities, [id]: newCount};
    })
  }

  const fetchData = async() => {
    try{
      const email = localStorage.getItem("email");
      const response = await axios.get(`https://flipkartreact.onrender.com/getItems`, {
        params: {email: email}
      });
      setCartItems(response.data);

      const initialQuantity = {};
      response.data.map((item) => {
        initialQuantity[item._id] = item.quantity;
      });

      setQuantities(initialQuantity);
      console.log(JSON.stringify(initialQuantity));
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
            {cartItems.map((item, index) => {
              const id = item._id;
              return (
                <div key={index} className='d-flex gap-3 mb-4 p-3 border rounded bg-light'>
                  <div className='d-flex flex-column justify-content-center gap-3'>
                    <img src={item.image} style={{width: "100px", height: "100px", objectFit: "contain"}}/>
                    <div className='d-flex gap-2 justify-content-center'>
                      <button className={`btn btn-${quantities[id] > 1 ? 'success' : 'danger'}`} onClick={() => HandleDec(id)}>-</button>
                      <span><strong>{quantities[id] || 1}</strong></span>
                      <button className={`btn btn-${quantities[id] === 10 ? 'danger' : 'success'}`} onClick={() => HandleInc(id)}>+</button>
                    </div>
                    {msg[id] && (<p className='text-danger text-center' style={{fontSize: "8px", whiteSpace: 'nowrap'}}>{msg[id]}</p>)}
                  </div>
                  <div>
                    <p>{item.title}</p>
                    <p>{item.desc}</p>
                    <p>{item.price}</p>
                  </div>
                </div>
              )
            })}
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
      ) : 
        <div className='bg-light' style={{height: "100vh"}}>
          <div style={{paddingTop: "50px"}}>
            <div className='d-flex flex-column align-items-center justify-content-center m-4' style={{height: "60vh"}}>
              <img src = 'https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' style={{width: "220px", height: "220px", objectFit:"contain"}}/>
              <h5>Your cart is empty!</h5>
              <p>Add items to it now.</p>
              <button className='btn bg-primary'>Shop now</button>
            </div>
          </div>
        </div>
        }
    </>
  )
}

export default Cart
