import React,{useState}from "react";
import Navbar from "../Components/Navbar";
import HeroBanner from "../Components/HeroBanner";
import ProductSection from "../Components/ProductSection";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import ProdDesc from "./ProdDesc";

const Homepage = () => {
  const [cartItems, setCartItems] = useState([]);

  
  return (
    <>
      <div className="h-full">
        <Navbar cartItems={cartItems}/>
        <HeroBanner />
        <h1 className="text-center font-semibold text-2xl  lg:text-4xl mt-4 tracking-wide poppins">
        Featured Products
      </h1>
        <ProductSection/>
        <div className="flex justify-center">
        <Link to="/product">
          <button className="border-2 p-2 w-40 rounded-3xl">See More</button>
        </Link>
        
      </div>
        <Footer/>
      </div>
    </>
  );
};

export default Homepage;
