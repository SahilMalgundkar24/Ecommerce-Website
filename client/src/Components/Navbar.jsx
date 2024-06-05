import React, { Component,useState} from 'react'
import Homepage from '../Pages/Homepage'
import Product from '../Pages/Product'
import Contact from '../Pages/Contact'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import {BrowserRouter as Router,Routes,Route,Link} from "react-router-dom"
import { useCart } from '../Context/CartContext'
import CartModal from './CartModal'


const Navbar = () => {
    const [openModal, setOpenModal] = useState(false)
    const {cartItems, addToCart}=useCart();
  return (
    <>
        {openModal && <CartModal closeModal={setOpenModal}/>}
        <div className='h-12 lg:h-16 w-full box-border flex justify-between items-center pl-4 pr-4'>
            <div className='heading text-xl lg:text-3xl md:text-2xl font-bold italic text-gray-600'>
               <Link to='/'>ShopiWhy</Link> 
            </div>
            <div className='nav-links hidden md:block'>
                <Link className='abc' to="/">Home</Link>
                <Link className='abc' to="/admin">Admin</Link>
                <Link className='abc' to="/contact">Contact</Link>
                <Link className='abc' to="/product">Product</Link>
            </div>
            <div className='flex items-center justify-center'>
                <button className="border-2 lg:text-xl text-sm p-1 lg:p-2 w-16 lg:w-24 rounded-3xl mr-4 hover:bg-green-800 hover:text-white">
                    <Link to='/login'>
                    Login
                    </Link></button>
                <button
                    onClick={()=>{
                        document.body.style.overflowY="hidden";
                        setOpenModal(true)
                      }}
                ><FontAwesomeIcon icon={faCartShopping} size='xl lg:size-2xl' />
                    <span className='ml-1'>{cartItems.length}</span>
                </button>
                
            </div>
        </div>
    </>
  )
}

export default Navbar