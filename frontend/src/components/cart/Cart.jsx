import React, { useEffect, useState } from 'react'
import '../styles/frontendSt.css'
import Head from '../top/Head'
import axios from 'axios';
import Footer from '../Foot/footer';
import { Link, useNavigate } from 'react-router-dom';
import CartSummary from './CartSummary';
import { calculateTotal } from '../utils/CartUtils';

function Cart() {
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([]);
  const [msg, setMsg] = useState("");
  const [quantities, setQuantities] = useState({});
  const email = localStorage.getItem("email") || "";
  const { cartTotal } = calculateTotal(cartItems, quantities);

  const setItemCount = async(email, id, count) => {
    try {
      axios.post(`${import.meta.env.VITE_BACKEND_URL}/setcount`, {email, id, count});
    }catch(err) {
      console.log("Internal server error...");
    }
  }

  const HandleDec = (id) => {
    setQuantities((prevQuantities) => {
      const newCount = (prevQuantities[id] || 1) - 1;
      if(newCount < 1) {
        setMsg((prev) => ({ ...prev, [id]: "Minimum limit reached!"}));
        return prevQuantities;
      }
      setItemCount(email, id, newCount);
      setMsg((prev) => ({ ...prev, [id]: ""}));
      return { ...prevQuantities, [id]: newCount};
    })
  }

  const HandleInc = (id) => {
    setQuantities((prevQuantities) => {
      const newCount = (prevQuantities[id] || 1) + 1;
      if(newCount > 10) {
        setMsg((prev) => ({ ...prev, [id]: "Maximum limit reached!"}));
        return prevQuantities;
      }
      setItemCount(email, id, newCount);
      setMsg((prev) => ({ ...prev, [id]: ""}));
      return { ...prevQuantities, [id]: newCount};
    })
  }

  const handleDelete = async(id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteitem`, {
        data: {
          email,
          id
        }
      });
      alert("Item deleted successfully!");
      fetchData();
    }
    catch(err) {
      console.log("Internal server error", err);
      alert("Internal server error...");
    }
  }

  const handleCheckout = () => {
    navigate("/checkout");
  }

  const fetchData = async() => {
    try{
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getItems`, {
        params: {email: email}
      });
      setCartItems(response.data);

      const initialQuantity = {};
      response.data.map((item) => {
        initialQuantity[item._id] = item.quantity;
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
          <div className='cartItems' style={{flexBasis:'65%'}}>
            {cartItems.map((item, index) => {
              const id = item._id;
              return (
                <div key={index} className='d-flex gap-3 mb-4 p-3 border rounded bg-light position-relative'>
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
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                    <p>₹{item.price}/-</p>
                  </div>
                  <img onClick={() => handleDelete(id)} style={{position: "absolute", top: "10px", right: "10px", width: "30px", cursor: "pointer", objectFit: "contain"}} src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png" />
                </div>
              )
            })}
            <div className="orderContainer">
              <h4>Amount to be paid: ₹{cartTotal}/-</h4>
              <button onClick={handleCheckout} style={{backgroundColor: "#fb641b", padding: "0px 20px", height: "50px", width: "250px", color: "white"}}>Place Order</button>
            </div>
          </div>
          <CartSummary cartItems={cartItems} quantities={quantities}/>
        </div>
        ) : 
        <div className='bg-light' style={{height: "100vh"}}>
          <div style={{paddingTop: "50px"}}>
            <div className='d-flex flex-column align-items-center justify-content-center m-4' style={{height: "60vh"}}>
              <img src = 'https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90' style={{width: "220px", height: "220px", objectFit:"contain"}}/>
              <h5>Your cart is empty!</h5>
              <p>Add items to it now.</p>
              <Link className="btn bg-primary" style={{color: "white"}} to="/home">Shop Now</Link> 
            </div>
          </div>
        </div>
      }
      <Footer />
    </>
  )
}

export default Cart
