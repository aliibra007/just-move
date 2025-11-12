import React from "react";
import { useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, Plus, Minus } from "lucide-react";
import Header from "../components/Header";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/formatters";
import Footer from "../components/Footer";
function CartPage() {
  const navigate = useNavigate();
  const { cart, removeFromCart, clearCart, addToCart } = useCart();

  // Group cart items by product ID, size, and color
  const groupedCart = cart.reduce((acc, item) => {
    const key = `${item.id}-${item.selectedSize || 'no-size'}-${item.selectedColor || 'no-color'}`;
    
    if (acc[key]) {
      acc[key].quantity += 1;
      acc[key].cartIds.push(item.cartId);
    } else {
      acc[key] = {
        ...item,
        quantity: 1,
        cartIds: [item.cartId]
      };
    }
    
    return acc;
  }, {});

  const groupedCartArray = Object.values(groupedCart);

  const total = groupedCartArray.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);

  const handleQuantityChange = (item, change) => {
    if (change > 0) {
      // Add one more instance
      addToCart({
        ...item,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor
      });
    } else {
      // Remove one instance
      removeFromCart(item.cartIds[0]);
    }
  };

  const handleCheckout = () => {
    // Create WhatsApp message with cart details
    let message = "Hello! I'd like to place an order:%0A%0A";
    
    groupedCartArray.forEach((item, index) => {
      message += `${index + 1}. ${item.name}%0A`;
      if (item.selectedSize) message += `   Size: ${item.selectedSize}%0A`;
      if (item.selectedColor) message += `   Color: ${item.selectedColor}%0A`;
      message += `   Quantity: ${item.quantity}%0A`;
      message += `   Price: ${formatPrice(item.price * item.quantity)}%0A%0A`;
    });
    
    message += `Total: ${formatPrice(total)}`;
    
    // Open WhatsApp with the message
    window.open(`https://wa.me/96103718805?text=${message}`, '_blank');
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center py-20">
            <ShoppingBag 
              className="mx-auto mb-6 text-gray-300" 
              size={80}
              strokeWidth={1}
            />
            <h2 className="font-serif text-4xl mb-4 text-gray-900">
              Your Cart is Empty
            </h2>
            <p className="text-gray-600 text-lg mb-8">
              Discover our collection of timeless pieces
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02]"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
                boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
              }}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="font-serif text-3xl sm:text-5xl mb-4 text-gray-900">
            Your Shopping Cart
          </h2>
          <p className="text-gray-600 text-base sm:text-lg">
            {groupedCartArray.reduce((sum, item) => sum + item.quantity, 0)} {groupedCartArray.reduce((sum, item) => sum + item.quantity, 0) === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">
            {groupedCartArray.map((item) => (
              <div 
                key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Product Image - Clickable */}
                  {item.imageUrls && item.imageUrls[0] && (
                    <div 
                      className="flex-shrink-0 cursor-pointer mx-auto sm:mx-0"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      <img 
                        src={item.imageUrls[0]} 
                        alt={item.name}
                        className="w-32 h-32 object-cover rounded-lg hover:opacity-80 transition-opacity"
                      />
                    </div>
                  )}
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 
                      className="font-serif text-lg sm:text-xl mb-2 text-gray-900 cursor-pointer hover:opacity-70 transition-opacity"
                      onClick={() => navigate(`/product/${item.id}`)}
                    >
                      {item.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-3 sm:gap-4 mb-3 text-sm text-gray-600">
                      {item.selectedSize && (
                        <div>
                          <span className="font-semibold">Size:</span> {item.selectedSize}
                        </div>
                      )}
                      {item.selectedColor && (
                        <div>
                          <span className="font-semibold">Color:</span> {item.selectedColor}
                        </div>
                      )}
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 sm:gap-4 mb-4">
                      <span className="text-sm font-semibold text-gray-700">Quantity:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item, -1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="px-3 sm:px-4 py-2 font-semibold min-w-[40px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item, 1)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>
                    
                    {/* Price and Remove Button */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-4">
                      <p className="text-xl sm:text-2xl font-semibold" style={{ color: '#D4AF37' }}>
                        {formatPrice(item.price * item.quantity)}
                        {item.quantity > 1 && (
                          <span className="text-xs sm:text-sm text-gray-500 ml-2 block sm:inline">
                            ({formatPrice(item.price)} each)
                          </span>
                        )}
                      </p>
                      
                      <button
                        onClick={() => item.cartIds.forEach(cartId => removeFromCart(cartId))}
                        className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200 w-full sm:w-auto justify-center"
                      >
                        <Trash2 size={18} />
                        <span className="font-medium">Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sm:p-8 lg:sticky lg:top-6">
              <h3 className="font-serif text-xl sm:text-2xl mb-6 text-gray-900">
                Order Summary
              </h3>
              
              <div className="space-y-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                  <span>Shipping</span>
                  <span className="text-right">Calculated at checkout</span>
                </div>
              </div>
              
              <div className="flex justify-between mb-6 sm:mb-8 text-lg sm:text-xl font-semibold">
                <span className="text-gray-900">Total</span>
                <span style={{ color: '#D4AF37' }}>{formatPrice(total)}</span>
              </div>
              
              <button
                onClick={handleCheckout}
                className="w-full py-3 sm:py-4 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:transform hover:scale-[1.02] mb-4 text-sm sm:text-base"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
                  boxShadow: '0 4px 15px rgba(212, 175, 55, 0.3)'
                }}
              >
                Proceed to Checkout
              </button>
              
              <button
                onClick={() => navigate('/')}
                className="w-full py-3 sm:py-4 rounded-lg font-semibold text-gray-700 border-2 border-gray-300 hover:border-gray-400 transition-colors duration-200 text-sm sm:text-base"
              >
                Continue Shopping
              </button>
              
              <button
                onClick={clearCart}
                className="w-full mt-4 py-3 text-red-600 hover:text-red-700 font-medium transition-colors duration-200 text-sm sm:text-base"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}

export default CartPage;