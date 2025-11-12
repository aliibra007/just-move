import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="bg-white rounded-lg overflow-hidden cursor-pointer transition-all duration-300 relative"
      style={{
        boxShadow: isHovered 
          ? '0 10px 30px rgba(212, 175, 55, 0.2)' 
          : '0 2px 8px rgba(0,0,0,0.08)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        opacity: !product.inStock ? 0.75 : 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
    >
      {/* Out of Stock Badge */}
      {!product.inStock && (
        <div className="absolute top-3 right-3 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
          Out of Stock
        </div>
      )}

      <div className="relative pb-[120%] overflow-hidden bg-gray-50">
        <img
          src={product.imageUrls[0]}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500"
          style={{ 
            transform: isHovered ? 'scale(1.08)' : 'scale(1)',
            filter: !product.inStock ? 'grayscale(50%)' : 'grayscale(0)'
          }}
        />
        
        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white bg-opacity-40 flex items-center justify-center">
            <div className="bg-gray-900 bg-opacity-80 text-white px-6 py-3 rounded-lg font-semibold text-lg">
              Out of Stock
            </div>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-serif text-lg text-gray-900 mb-1">{product.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{product.category}</p>
        <div className="flex items-center justify-between">
          <p className="font-semibold" style={{ color: '#D4AF37' }}>
            ${product.price}
          </p>
          {!product.inStock && (
            <span className="text-xs text-red-600 font-semibold">
              Unavailable
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;