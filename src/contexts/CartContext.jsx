import React, { createContext, useContext, useState, useEffect } from 'react';
import CartMessage from '../components/CartMessage';

export const CartContext = createContext(); 

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage on init
    const savedCart = localStorage.getItem('justMoveCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('justMoveCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, cartId: Date.now() }]);
    setMessage('Item added to cart!');
    setShowMessage(true);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((sum, item) => sum + item.price, 0);
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        addToCart, 
        removeFromCart, 
        clearCart,
        getCartTotal 
      }}
    >
      {children}
      {showMessage && (
        <CartMessage 
          message={message} 
          onClose={() => setShowMessage(false)} 
        />
      )}
    </CartContext.Provider>
  );
};