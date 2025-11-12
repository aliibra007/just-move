import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart } = useCart();

  // Hide cart icon when on cart page
  const isCartPage = location.pathname === '/cart';

  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-2 py-4 flex justify-between items-center min-h-[64px] sm:min-h-[72px]">
        <h1 
          onClick={() => navigate('/')}
          className="text-2xl sm:text-4xl font-bold tracking-wider cursor-pointer hover:opacity-80 transition uppercase"
          style={{ 
            color: '#D4AF37',
            fontFamily: '"Emilienne", serif',
            letterSpacing: '0.15em'
          }}
        >
          JUST MOVE
        </h1>
        
        {/* Fixed width container for cart button */}
        <div className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] flex items-center justify-center">
          {!isCartPage && (
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 sm:p-3 hover:bg-gray-100 rounded-full transition"
              aria-label="View cart"
            >
              <ShoppingCart size={24} className="sm:w-[30px] sm:h-[30px]" />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 rounded-full text-white text-xs flex items-center justify-center font-semibold"
                  style={{ backgroundColor: '#D4AF37' }}
                >
                  {cart.length}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;