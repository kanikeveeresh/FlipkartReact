import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/frontendSt.css'

function OrderSuccess(props) {
  const navigate = useNavigate();
  return (
    <div className="orderSuccessMainContainer">
        <div className="successContainer">
            <div class="successImage">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="white" d="M9 16.2l-3.5-3.5 1.4-1.4L9 13.4l7.1-7.1 1.4 1.4z"/>
                </svg>
            </div>
            <h4>Order Placed Successfully!</h4>
            <p>Your items will be delivered to</p>
            <p>{props.address}, {props.city}, {props.state} - {props.pincode}</p>
            <h5>Thank you for shopping with Flipkart.</h5>
            <button className="editBtn" onClick={() => navigate("/home")}>Go To Home</button>
        </div>
    </div>
  )
}

export default OrderSuccess