import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { formatPrice } from '../utils/formatters';

const ProductDetail = ({ product, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showError, setShowError] = useState(false);
  const { addToCart } = useCart();

  
const handleAddToCart = () => {
  if (!selectedSize || !selectedColor) {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000); // Hide error after 3 seconds
    return;
  }

  addToCart({
    id: product.id,
    name: product.name,
    price: product.price,
    imageUrls: product.imageUrls,
    selectedSize,
    selectedColor
  });

  // CartMessage will show automatically from CartContext
  
  if (typeof onClose === 'function') {
    setTimeout(() => onClose(), 1500); // Close after showing message
  }
};

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % product.imageUrls.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      (prev - 1 + product.imageUrls.length) % product.imageUrls.length
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10">
          <h2 className="font-serif text-2xl">Product Details</h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-full transition"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="relative">
            <div className="relative pb-[120%] bg-gray-50 rounded-lg overflow-hidden">
              <img
                src={product.imageUrls[currentImageIndex]}
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {product.imageUrls.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 transition"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>
            
            {/* Thumbnail Navigation */}
            {product.imageUrls.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto">
                {product.imageUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className={`flex-shrink-0 w-20 h-20 rounded cursor-pointer border-2 transition ${
                      idx === currentImageIndex ? 'border-yellow-600' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  >
                    <img 
                      src={url} 
                      alt={`${product.name} ${idx + 1}`} 
                      className="w-full h-full object-cover rounded" 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div>
            <h1 className="font-serif text-3xl mb-2">{product.name}</h1>
            <p className="text-2xl mb-4" style={{ color: '#D4AF37' }}>
              {formatPrice(product.price)}
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Error Message */}
            {showError && (
              <div className="mb-4 p-3 bg-red-50 border-2 border-red-500 rounded-lg">
                <p className="text-red-700 text-sm font-medium">
                  Please select both size and color
                </p>
              </div>
            )}

            {/* Size Selection */}
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2">
                Size {!selectedSize && <span className="text-red-500">*</span>}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border-2 rounded transition ${
                      selectedSize === size
                        ? 'border-yellow-600 bg-yellow-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-8">
              <label className="block text-sm font-semibold mb-2">
                Color {!selectedColor && <span className="text-red-500">*</span>}
              </label>
              <div className="flex flex-wrap gap-2">
                {product.availableColors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border-2 rounded transition ${
                      selectedColor === color
                        ? 'border-yellow-600 bg-yellow-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;