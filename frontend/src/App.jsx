import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import SignUp from './SignUp'
import Login from './LogIn'
import SubCategory from './subCategory.jsx'
import HomePage from './HomePage.jsx'
import EachCat from './eachCat.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/home/:categoryName' element={<SubCategory />} />
          <Route path='/home/:categoryName/:name' element={<EachCat />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
