import React from "react";
import { useCart } from "../Context/CartContext";

const CartModal = ({ closeModal }) => {
  const { cartItems, removeFromCart } = useCart();

  console.log("Cart Items:", cartItems);

  return (
    <>
      <div className="modal-background h-full w-screen fixed flex justify-end items-center">
        <div className="h-full w-3/4 md:w-1/2 lg:w-1/3 p-5 bg-white fixed flex flex-col">
          <div className="flex justify-between font-medium text-2xl">
            <button
              onClick={() => {
                document.body.style.overflowY = "scroll";
                closeModal(false);
              }}
            >
              X
            </button>
            <h1 className="font-medium text-2xl tracking-wide">My Cart</h1>
            <div></div>
          </div>
          <div
            className="flex-1 mt-4"
            style={{ maxHeight: "calc(100% - 100px)", overflowY: "auto" }}
          >
            {cartItems.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cartItems.map((prod) => (
                  <div key={prod.id} className="w-full h-36 flex p-2 lg:p-5">
                    <div className="h-full w-1/2 md:w-2/5 lg:w-1/3 rounded-lg">
                      <img className="h-full w-full object-contain" src={prod.image}></img>
                    </div>
                    <div className="ml-2 lg:ml-5 flex flex-col w-full justify-between p-2">
                      <div className="flex justify-between">
                        <h1 className="text-lg lg:text-2xl font-medium">
                          {prod.name}
                        </h1>
                        <button
                          className="text-2xl font-medium"
                          onClick={() => removeFromCart(prod.id)}
                        >
                          X
                        </button>
                      </div>
                      <h1 className="text-lg">Price : ₹{prod.price}</h1>
                      <h1 className="text-lg">Quantity : {prod.quantity}</h1>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="mt-auto flex flex-col justify-center w-full">
            <div className="flex justify-between mb-2 text-xl p-2">
              <h1>Sub-Total</h1>
              <h1>
                ₹
                {cartItems.reduce(
                  (total, item) => total + item.price * item.quantity,
                  0
                )}
              </h1>
            </div>
            <button className="bg-green-500 text-xl w-full h-12 rounded-lg">
              Pay
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartModal;
