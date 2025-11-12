export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

export const formatWhatsAppMessage = (cart) => {
  const items = cart.map((item, idx) => 
    `${idx + 1}. ${item.name}\n   Size: ${item.selectedSize}\n   Color: ${item.selectedColor}\n   Price: ${formatPrice(item.price)}`
  ).join('\n\n');

  const total = cart.reduce((sum, item) => sum + item.price, 0);
  
  return `Hello! I'd like to order from Just Move:\n\n${items}\n\nTotal: ${formatPrice(total)}`;
};

export const generateWhatsAppUrl = (cart, phoneNumber) => {
  const message = formatWhatsAppMessage(cart);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};