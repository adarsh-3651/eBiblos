import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Cart is an array of book objects

  // Add book to cart
  const addToCart = (book) => {
    setCart((prevCart) => [...prevCart, book]);
  };

  // Remove book from cart
  const removeFromCart = (bookId) => {
    setCart((prevCart) => prevCart.filter((book) => book.id !== bookId));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Get total items in cart
  const getCartItemCount = () => {
    return cart.length;
  };

  // Get total price of the cart
  const getTotalPrice = () => {
    return cart.reduce((total, book) => total + book.price, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getCartItemCount,
        getTotalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};
