import React, {useState, useEffect} from 'react'
import LooksNew from './LooksNew'
import Head from './components/top/Head';
import Footer from './components/Foot/footer';
import emailjs from "emailjs-com";
import bcrypt from "bcryptjs";
import axios from "axios"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


function SignUp() {

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [alreadyExist, setAlreadyExist] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otp, setOtp] = useState('');
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState('');
  const [cremsg, setCreMsg] = useState('');

  // useEffect(() => {
  //   const token = localStorage.getItem("token");

  //   if(token) {
  //     navigate('/home');
  //   }
  // }, [navigate]);


  const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    setGeneratedOtp(otp.toString());
    return otp;
  }

  const handleReq = async () => {
    if(!email) {
      setAlreadyExist("Email required.");
      return;
    }
    

    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/credentials/checkEmail`, 
        {
          email,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if(res.data.message == "exists") {
        setAlreadyExist("Email already exists. Please login.");
      }

      else {
        const otp = generateOtp();

        await emailjs.send(
          "service_phx45ls",
          "template_tloeefs",
          {
            to_email: email,
            otp: otp
          },
          "Rgy1bTm4T70UloUYq"
        );
        setOtpSent(true);
        setMessage("Otp sent to your email.");
      }
    }
    catch (error) {
      console.error("Failed to send OTP:", error);
      setMessage(error);
    }
  }
  
  const handleVal = () => {
    if(!email) setMessage("Email required.");
    else if(!otpSent) setMessage("Please send the OTP.");
    else if(otp == '') {
      setMessage("Please enter the valid OTP.")
    }
    else if(Number(otp) === Number(generatedOtp)) {
      setValidated(true);
      setMessage("OTP verified successfully.");
    }
    else {
      setMessage("Invalid OTP. Please try again.");
    }
  };

  const handleCreate = async () => {
    const hashedPass = await bcrypt.hash(password, 10);

    if(password !== rePassword || password.trim() === '') {
      setCreMsg("Passwords must match and not empty.");
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/credentials/save`, {
        email,
        password: hashedPass,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

      setMessage(response.data.message);
      alert("Account created successfully.");
      navigate('/login');
    }
    catch(err) {
      if(err.response) {
        setCreMsg("Error saving credentials.");
      }
      else if(err.request) {
        setCreMsg("No response from the server.");
      }
      else {
        setCreMsg("Server error: " + err.message);
      }
    }
  }

  const HandleLog = () => {
    navigate('/login')
  }
  return (
    <>
      <Head />
      <div className='d-flex justify-content-center pt-5 py-4 vh-100 gap-2 col'>
          <LooksNew />
        <div className='bg-white w-25 py-5 px-4'>
          <input type="text" placeholder='Enter Email' className='w-100 inpSign borderNone mb-3' value={email} onChange={(e) => setEmail(e.target.value)} required disabled={otpSent}/>
          <button className='w-100  otpSended borderRad mb-3' onClick={handleReq} disabled={otpSent}>Request OTP</button>
          {otpSent && (
            <div className='valBtn'>
              <input type="text" placeholder='Enter OTP' className='mb-3 inpSign borderNone w-75' value={otp} onChange={(e) => setOtp(e.target.value)} disabled={validated}/>
              <button className='w-25 borderRad' onClick={handleVal} disabled={validated}>Validate</button>
            </div>
          ) }
          {!otpSent && <p className='text-danger text-center'>{alreadyExist}</p>}
          {message && <p className="text-success text-center">{message}</p>}
          {validated && (
            <>
              <input type="password" placeholder='Enter Password' className='w-100 inpSign borderNone mb-3' value={password} onChange={(e) => setPassword(e.target.value)} required/>
              <input type="password" placeholder='Re-enter Password' className='w-100 inpSign borderNone mb-3' value={rePassword} onChange={(e) => setRePassword(e.target.value)} required/>
              <button className='w-100 borderRad mb-3' onClick={handleCreate}>Create an Account</button>
            </>
          )}
          {cremsg && <p className='text-danger text-center'>{cremsg}</p>}
          <p className='d-flex justify-content-center text-primary SignUpP' onClick={HandleLog}>Existing User? Log in</p>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default SignUp
