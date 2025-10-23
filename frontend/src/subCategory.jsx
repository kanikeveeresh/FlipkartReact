import React, { useEffect } from "react";
import categoryData from "./components/data/catData.js";
import Footer from "./components/Foot/footer.jsx";
import { useParams, useNavigate } from "react-router-dom";
import Head from './components/top/Head.jsx'
import './components/styles/frontendSt.css'
import axios from 'axios'

function subCategory({cartCount, setCartCount}) {
    const { categoryName } = useParams();
    const navigate = useNavigate();
    const category = categoryData.find((cat) => cat.catagory == categoryName);

    if(!category) {
        return <h2>Category not found.</h2>
    }

    const eachCategory = (item) => {
        navigate(`/home/${category.catagory}/${item.title}`,{
            state: {
                title: item.title,
                description: item.description,
                image: item.src,
                price: item.price,
            },
        });
    }

    const GetCartCount = async () => {
        const email = localStorage.getItem("email");
        try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getCount`, {
            params: {email: email}
        });
        setCartCount(() => response.data.count || 0);
        }
        catch(err) {
        console.error("Server error", err);
        }
    }

    useEffect(() => {
        GetCartCount();
    }, []);

    return (
        <>
            <Head cartCount={cartCount}/>
            <div className="d-flex justify-content-evenly align-items-center parentDiv">
                {category.subCategory.map((item, index) => (
                    <div key={index} className="d-flex flex-column text-center border border-rounded-3 p-5 colCategory">
                        <img src={item.src} className="eachImgSi" onClick={() => eachCategory(item)}/>
                        <h6 className="pt-2">{item.title}</h6>
                    </div>
                ))}
            </div>
            <Footer />
        </>
    )
}

export default subCategory;
