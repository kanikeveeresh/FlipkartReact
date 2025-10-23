import './App.css'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import SignUp from './SignUp'
import "tailwindcss";
import Login from './LogIn'
import SubCategory from './subCategory.jsx'
import HomePage from './HomePage.jsx'
import EachCat from './eachCat.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import Cart from './components/cart/Cart.jsx';
import Checkout from './components/checkout/Checkout.jsx';

function App() {

  const [cartCount, setCartCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<HomePage cartCount={cartCount} setCartCount={setCartCount}/>} />
          <Route path='/home/:categoryName' element={<SubCategory cartCount={cartCount} setCartCount={setCartCount}/>} />
          <Route path='/home/:categoryName/:name' element={<EachCat cartCount={cartCount} setCartCount={setCartCount}/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/checkout' element={<Checkout />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
