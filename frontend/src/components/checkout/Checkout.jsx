import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Head from '../top/Head'
import Footer from '../Foot/footer'
import axios from 'axios';
import CartSummary from '../cart/CartSummary';
import '../styles/frontendSt.css'
import AddressDetails from './AddressDetails';
import OrderSuccess from './OrderSuccess';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const email = localStorage.getItem("email") || "";
  const [addressModel, setAddressModel] = useState(false);
  const [editDetails, setEditDetails] = useState({});
  const [deliverModel, setDeliverModel] = useState(false);
  const [deliverId, setDeliverId] = useState(null);

  const [addressDetails, setAddressDetails] = useState([]);

  const fetchData = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getItems`, {
        params: {email: email}
      });
      if(response.data.length === 0) {
        return navigate("/cart");
      }

      setCartItems(response.data);

      const initialQuantity = {};
      response.data.map((item) => {
        initialQuantity[item._id] = item.quantity;
      });

      setQuantities(initialQuantity);
    }
    catch(err) {
      console.log("Internal server error...", err);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const fetchAddressDetails = async() => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/getaddresses`, {
        params: {email: email}
      });

      setAddressDetails(response?.data);
    }
    catch(err) {
      console.log("Internal server error...");
    }
  }

  useEffect(() => {
    fetchAddressDetails();
  }, []);

  useEffect(() => {
    if(addressDetails.length > 0) {
      setDeliverId(addressDetails[0]._id);
    }
  }, [addressDetails]);

  const handleEdit = (id) => {
    const filteredDetails = addressDetails.find((details) => details._id === id);
    if(filteredDetails) {
      setEditDetails(filteredDetails);
    }
    setAddressModel(true);
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/deleteaddress`, {
        data: {
          email,
          addressId: id
        }
      });

      alert("Address deleted successfully!");
      fetchAddressDetails();
    }
    catch(err) {
      console.log("Internal server error...");
    }
  }

  const handleDeliver = async (id) => {
    await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/deleteitem`, {
      data: {
        email
      }
    });

    
    const filteredDetails = addressDetails.find((details) => details._id === id);
    if(filteredDetails) {
      setEditDetails(filteredDetails);
    }
    setDeliverModel(true);
  }

  return (
    <>
      <Head />
      <div className='d-flex p-3 gap-3 checkoutBackGround mt-5'>
        <div className='addressDetails' style={{flexBasis:'65%'}}>
          {addressDetails.length > 0 ? (
            <>
              <h4 style={{textAlign: "center", backgroundColor: "#2874f0", marginBottom: "0px", borderRadius: "0.3rem 0.3rem 0rem 0rem", color: "white", padding: "10px 0px"}}>DELIVERY ADDRESS</h4>
              {addressDetails.map((option, index) => (
                <div key={option._id}>
                  <label className="addressCheck" style={deliverId == option._id ? {backgroundColor: "#f5faff"} : {}}>
                    <input 
                      type="radio"
                      name="option"
                      value={option._id}
                      checked={deliverId === option._id}
                      onChange={(e) => setDeliverId(e.target.value)}
                      style={{transform: "scale(1.3)", margin: "7px 24px 0px 0px"}}
                    />
                    <div>
                      <strong>{`${option.lastName} ${option.firstName} ${option.type}`}</strong><br />
                      <span>{option.address}, {option.city}, {option.state} - <strong>{option.pincode}</strong></span>
                      {deliverId === option._id && (<div><button className="deliverBtn" onClick={() => handleDeliver(option._id)}>DELIVER HERE</button></div>)}
                    </div>
                    {deliverId === option._id &&
                      <div className="editDeleteBtn">
                        <button className="editBtn" onClick={() => handleEdit(option._id)}>Edit</button>
                        <button className="deleteBtn" onClick={() => handleDelete(option._id)}>Delete</button>
                      </div>
                    }
                  </label>
                  {index !== addressDetails.length - 1 && (
                    <hr style={{margin: "0px"}}/>
                  )}
                </div>
              ))}

              <p style={{height: "10px",borderLeft:"1px solid rgba(77, 75, 75, 0.2)",borderRight: "1px solid rgba(77, 75, 75, 0.2)", backgroundColor: "rgba(200, 204, 204, 0.346)", marginBottom: "0px"}}></p>
              <label className="addNewAddress" onClick={() => {setEditDetails({}); setAddressModel(true)}}><span style={{fontSize: "30px", margin: "0px 20px 0px 0px"}}>+</span><strong>Add a new address</strong></label>
            </>
          ) : (
            <>
              <h4 style={{padding: "5px 10px", textAlign: "center"}}>No address found, please add an address to deliver</h4>
              <p style={{height: "10px",borderLeft:"1px solid rgba(77, 75, 75, 0.2)",borderRight: "1px solid rgba(77, 75, 75, 0.2)", backgroundColor: "rgba(200, 204, 204, 0.346)", marginBottom: "0px"}}></p>
              <strong className="newAddressBtn" onClick={() => {setEditDetails({}); setAddressModel(true)}}>Add an address</strong>
            </>
          )
          }
        </div>
        <CartSummary cartItems={cartItems} quantities={quantities}/>
      </div>
      <Footer />
      {addressModel && <AddressDetails fetchAddressDetails={fetchAddressDetails} closeModel={() => setAddressModel(false)} editDetails={editDetails} />}
      {deliverModel && <OrderSuccess closeModel={() =>setDeliverModel(false)} address={editDetails.address} city={editDetails.city} pincode={editDetails.pincode} state={editDetails.state} />}
    </>
  )
}

export default Checkout