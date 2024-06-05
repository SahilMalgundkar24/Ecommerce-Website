import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const ProductSection = () => {
  const [products, setProducts] = useState([]);
  React.useEffect(() => {
    axios
      .get("/api/getProducts")
      .then((res) => setProducts(res.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <> 
      <Navbar/>
      <div className="p-7 h-auto w-full box-border flex justify-evenly items-center flex-wrap">
        {products.map((items) => (
          <div className="cards h-64 w-48 md:h-80 md:w-64 lg:h-96 lg:w-80 p-5 mt-2 rounded-lg" key={items.id}>
            <Link to={`/ProductDescription/${items.id}`}>
            <div><img className="rounded-lg h-36 md:h-48 lg:h-64 w-full bg-slate-600 mb-5 object-cover" src={items.image} alt="img" /></div>
            </Link>
            
            <h2>{items.itemName}</h2>
            <h3>{items.itemPrice}</h3>
          </div>
        ))}
      </div>
      <Footer/>
      
    </>
  );
};

export default ProductSection;
