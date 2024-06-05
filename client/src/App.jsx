import "./App.css";
import React from "react";
import Homepage from "./Pages/Homepage";
import AdminPanel from "./Pages/AdminPanel";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Navbar from "./Components/Navbar";
import ProdDesc from "./Pages/ProdDesc";
import Login from "./Pages/Login";
import Signin from "./Pages/Signin";
import { CartProvider } from "./Context/CartContext";

const App = () => {
  return (
    <>
      <Router>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product" element={<Product />} />
            <Route path="/ProductDescription/:id" element={<ProdDesc />} />
            <Route path="/login" element={<Login/>}/>
            <Route path="/signin" element={<Signin/>}/>
          </Routes>
        </CartProvider>
      </Router>
    </>
  );
};

export default App;
