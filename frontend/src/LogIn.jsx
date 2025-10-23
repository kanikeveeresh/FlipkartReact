import React, { useState, useEffect } from 'react'
import Head from './components/top/Head';
import Footer from './components/Foot/footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function LogIn() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    useEffect(() => {
      const token = localStorage.getItem("token");

      if(!token) {
        navigate('/login');
      }
    }, [navigate]);

    const HandleSign = () => {
        navigate('/');
    }

    const MainPage = async () => {
      if(!email) {
        return setMessage("Email required.");
      }
      else if(!password) {
        return setMessage("Password required.");
      }
        try {
          const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/credentials/checkEmailandPass`, 
            {
              email,
              password,
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );

          if(response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("email", response.data.email);
            navigate('/home');
          }
        }
        catch(err) {
          if(err.response) {
            if(err.response.status === 404) {
              return setMessage("User not found.");
            }
            else if(err.response.status === 401) {
              return setMessage("Incorrect Password. Please try again.");
            }
            else {
              return setMessage("Failed to login.", err.message);
            }
          }
          else {
            return setMessage("Server error.");
          }
        }
    }
  return (
    <>
    <Head />
      <div className='d-flex justify-content-center pt-5 py-4 vh-100 gap-2 col'>
        <div className='bg-primary p-4 w-25 looksNew h-100 text-white py-4'>
            <h3>Login</h3>
            <h6 className='sign'>Get access to your Orders, Wishlist and Recommendations</h6>
        </div>
        <div className='bg-white w-25 py-5 px-4'>
          <input type="text" placeholder='Enter Email' className='w-100 inpSign borderNone mb-3' value={email} onChange={(e) => setEmail(e.target.value)} required/>
          <input type="password" placeholder='Password' className='w-100 inpSign borderNone mb-3' value={password} onChange={(e) => setPassword(e.target.value)} required/>
          <button className='w-100 borderRad mb-3' onClick={MainPage}>LogIn</button>
          {message && <p className='text-danger text-center'>{message}</p>}
          <p className='d-flex justify-content-center text-primary SignUpP' onClick={HandleSign}>New User? Create an account</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default LogIn
