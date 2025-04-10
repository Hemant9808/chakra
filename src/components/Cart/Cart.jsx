import React, { useState } from "react";
import CartComponent from "./CartComponent/CartComponent";
import ProductSlider from "./CartComponent/ProductSlider";

function Cart() {
  const [cartItems, setCartItems] = useState([]);

  // Function to add an item to the cart
  const addToCart = (product) => {
    setCartItems((prevCart) => {
      // Check if the item already exists
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  // Function to remove an item from the cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  return (
    <>
      <CartComponent cartItems={cartItems} removeItem={removeItem} />
      <ProductSlider addToCart={addToCart} />
    </>
  );
}

export default Cart;
