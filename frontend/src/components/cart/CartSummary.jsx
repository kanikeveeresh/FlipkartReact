import { useState, useEffect } from 'react'
import axios from 'axios'
import { calculateTotal } from '../utils/CartUtils'

function CartSummary({cartItems = [], quantities = {}}) {

    const { cartPrice, cartDiscount, cartDelivery, cartPackagingFee, cartTotal } = calculateTotal(cartItems, quantities);
//     const [discount, setDiscount] = useState(0);
//     const [deliveryCharge, setDeliveryCharge] = useState(0);
//     const [packagingFee, setPackagingFee] = useState(0);
//     const [totalPrice, setTotalPrice] = useState(0);

//   const getTotalPrice = () => {
//     let cartPrice = 0, cartDiscount = 0, cartTotal = 0, cartPackagingFee = 0, cartDelivery = 0;

//     cartItems.map(item => {
//       let itemQuantity = quantities[item._id] || 1;
//       cartPrice += item.price * itemQuantity;
//     });

//     cartDiscount = Math.floor((cartPrice * 7) / 100);

//     cartDelivery = 40 * cartItems.length;

//     cartPackagingFee = 20 * cartItems.length;

//     cartTotal = cartPrice + cartPackagingFee - cartDiscount + (cartItems.length >= 3 ? 0 : cartDelivery);

//     setPrice(cartPrice);
//     setDiscount(cartDiscount);
//     setDeliveryCharge(cartDelivery);
//     setPackagingFee(cartPackagingFee);
//     setTotalPrice(cartTotal);
//   }

//   useEffect(() => {
//     if(cartItems.length > 0) {
//       getTotalPrice();
//     }
//   }, [cartItems, quantities]);

  return (
    <div className='position-relative' style={{flexBasis:'35%'}}>
      <div className='cartDetails'>
        <div>
          <h4>PRICE DETAILS</h4>
        </div>
        <hr />
        <div className='d-flex justify-content-between'><span>Price</span><span>₹{cartPrice}/-</span></div><br />
        <div className='d-flex justify-content-between'><span>Discount</span><span>₹{cartDiscount}/-</span></div><br />
        <div className='d-flex justify-content-between'><span>Delivery Charges</span><span><span className = {cartItems.length >= 3 ? "strike" : ""}>₹{cartDelivery}/-</span><strong style={{color: "green"}}>{cartItems.length >= 3 ? " Free" : ''}</strong></span></div><br />
        <div className='d-flex justify-content-between'><span>Securing Packaging Fee</span><span>₹{cartPackagingFee}/-</span></div>
        <hr />
        <div className='d-flex justify-content-between'><h5>Total Price</h5><span>₹{cartTotal}/-</span></div>
      </div>
    </div>
  )
}

export default CartSummary