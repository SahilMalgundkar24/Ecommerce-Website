import React from "react";
import Navbar from "../Components/Navbar";
import ProductSection from "../Components/ProductSection";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../Context/CartContext";
import Footer from "../Components/Footer";

const ProdDesc = () => {
  const [number, setnumber] = useState(1);
  const { id } = useParams();
  const { addToCart } = useCart();

  // Assuming you have a function to fetch product details by id
  const getProductDetails = async (id) => {
    try {
      const response = await axios.get(`/api/getProductById/${id}`);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const [product, setProduct] = useState(null);

  useEffect(() => {
    getProductDetails(id).then((data) => setProduct(data));
    window.scrollTo(0, 0);
    setnumber(1);
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const productDetails = await getProductDetails(id);
      console.log("Product Details:", productDetails);
      const product = {
        id: productDetails.id,
        name: productDetails.itemName,
        price: productDetails.itemPrice,
        quantity: number,
        image: productDetails.Image,
      };

      addToCart(product);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };

  return (
    <>
      <div className="Main-prod-body w-full">
        <Navbar />
        <div className="product-section h-1/2 w-full flex p-5 lg:p-12">
          <div className="h-72 lg:h-84 md:w-1/3 w-1/2 lg:w-1/4">
            <img className="h-72 lg:h-84 w-full object-contain " src={product?.Image} alt={product?.itemName} />
          </div>
          <div className="w-1/2 lg:w-3/4 ml-5">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
              {product?.itemName}
            </h1>
            <h4 className="text-lg lg:text-xl font-medium">Details : </h4>
            <p className="text-sm md:text-sm lg:text-lg poppins">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequatur error, quas atque adipisci cumque dolore praesentium
              deleniti quaerat ullam accusantium aliquam
            </p>
            <br className="hidden lg:block"></br>
            <h1 className="text-lg lg:text-2xl font-bold">
              ₹{product?.itemPrice}
            </h1>
            <div className="Quantity flex text-2xl items-center">
              <h1 className="mr-3 text-lg">Quantity : </h1>
              <button
                className="h-7 w-10 flex justify-center items-center mr-2"
                onClick={() => {
                  setnumber((number) => number + 1);
                }}
              >
                +
              </button>
              <h1 className="mr-2 text-lg">{number}</h1>
              <button
                className="h-7 w-10 flex justify-center items-center mr-2"
                onClick={() => {
                  number > 1 && setnumber((number) => number - 1);
                }}
              >
                -
              </button>
            </div>
            <div className="button flex mt-3">
              <button
                className="h-10 w-40  mr-4 border-2  border-red-600 text-red-600"
                onClick={handleAddToCart}
              >
                Add to cart
              </button>
              <button className="h-10 w-40 bg-red-600 text-white mr-4">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-center font-medium text-3xl mt-4 tracking-wide">
            You may also like...
          </h1>
          <ProductSection />
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ProdDesc;
