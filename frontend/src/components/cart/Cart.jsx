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
      const response = await axios.get(`http://localhost:5000/getItems`);
      setCartItems(response.data);

      const initialQuantity = {};
      response.data.forEach((doc) => {
        doc.items.map((element, index) => {
          if(element.tag.toLowerCase() === 'strong') {
            const uniqueId = doc._id;
            initialQuantity[uniqueId] = parseInt(element.content);
          }
        });
      });

      setQuantities(initialQuantity);
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
            <div className='d-flex flex-column'>
            {cartItems.map((doc, index) => (
              <>
              <div key={index} className='d-flex'>
                {doc.items.map((element, index) => {
                  const uniqueId = doc._id;
                  if(element.tag.toLowerCase() === 'img') {
                    return (<div key={uniqueId}>
                      <img src={element.content} className='CartImg'/>
                      <div className='d-flex justify-content-center align-items-center'><button className={`btn btn-${quantities[uniqueId] > 1 ? 'success' : 'danger'}`} onClick={() => HandleDec(uniqueId)}>-</button><span><strong>{quantities[uniqueId] || 1}</strong></span><button className={`btn btn-${quantities[uniqueId] == 10 ? 'danger' : 'success'}`} onClick={() => HandleInc(uniqueId)}>+</button></div>
                      {msg[uniqueId] && <p className='text-danger text-center' style={{fontSize: '10px'}}>{msg[uniqueId]}</p>}
                    </div>
                    )
                  }
                  else {
                    return (
                      <div key={uniqueId} className='d-flex flex-column align-items-start'>
                        {element.tag.toLowerCase() === 'h2' && <><h2>{element.content}</h2></>}
                        {element.tag.toLowerCase() === 'p' && <p>{element.content}</p>}
                        {element.tag.toLowerCase() === 'span' && <h4>₹{element.content}</h4>}
                      </div>
                    )
                  }
                })}
              </div>
              <hr ></hr>
              </>
            ))}
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
