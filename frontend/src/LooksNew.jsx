import React from 'react'
import './components/styles/frontendSt.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function LooksNew() {
  return (
    <>
        <div className='bg-primary p-5 w-25 looksNew h-100 text-white'>
            <h3>Looks like you're new here!</h3>
            <h6 className='sign'>Sign up with your email to get started</h6>
        </div>
    </>
  )
}

export default LooksNew
