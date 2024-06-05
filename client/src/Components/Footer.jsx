import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full h-48 bg-gray-800 text-white flex items-center justify-between mt-6 px-2 lg:px-24">
      <div className="text-center">
        <h1 className="text-xl md:text-2xl lg:text-4xl heading italic font-bold mb-2">ShopiWhy</h1>
        <p className='font-color text-sm'>Designed and developed by</p>
        <p className='font-color text-sm'>Sahil Malgundkar and Tejas Gawde</p>
        <p className='font-color text-sm'>© {new Date().getFullYear()} | ShopiWhy | All rights reserved.</p>
      </div>
      <div>
        <h1 className='text-lg md:text-xl lg:text-2xl font-bold '>Contact</h1>
        <p className='font-color text-sm'>+91 9898989898</p>
        <p className='font-color text-sm'>shopify.clothing@gmail.com</p>
      </div>
      
    </footer>
  );
};

export default Footer;
