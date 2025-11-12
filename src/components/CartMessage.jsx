import React, { useEffect } from 'react';
import { CheckCircle, X } from 'lucide-react';

const CartMessage = ({ message, onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div 
      className="fixed top-24 right-4 sm:right-6 z-50 animate-slideIn"
      style={{
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl border-2 flex items-center gap-3 p-4 min-w-[280px] sm:min-w-[320px]"
        style={{
          borderColor: '#D4AF37',
          boxShadow: '0 10px 40px rgba(212, 175, 55, 0.3)'
        }}
      >
        <div 
          className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
        >
          <CheckCircle size={24} style={{ color: '#D4AF37' }} />
        </div>
        
        <p className="flex-1 text-gray-800 font-medium">
          {message}
        </p>
        
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 hover:bg-gray-100 rounded-full transition"
        >
          <X size={18} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default CartMessage;