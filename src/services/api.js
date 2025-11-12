import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8081/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for error handling
apiClient.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Helper function to format image URLs
const formatImageUrls = (product) => {
  if (product.imageUrls && Array.isArray(product.imageUrls)) {
    product.imageUrls = product.imageUrls.map(url => {
      // Remove leading slash if it exists
      const cleanUrl = url.startsWith('/') ? url.slice(1) : url;
      
      // If it's an assets path, convert it to require format
      if (cleanUrl.startsWith('assets/Product-s/')) {
        try {
          // Extract just the filename
          const filename = cleanUrl.replace('assets/Product-s/', '');
          return require(`../assets/Product-s/${filename}`);
        } catch (err) {
          console.error(`Failed to load image: ${cleanUrl}`, err);
          return url; // Return original if require fails
        }
      }
      return url;
    });
  }
  return product;
};

// Helper to format multiple products
const formatProducts = (products) => {
  return products.map(formatImageUrls);
};

export const api = {
  // Get all products
  getProducts: async () => {
    const response = await apiClient.get('/products');
    return formatProducts(response.data);
  },

  // Get single product by ID
  getProductById: async (id) => {
    const response = await apiClient.get(`/products/${id}`);
    return formatImageUrls(response.data);
  },

  // Search products - FIXED
  searchProducts: async (query) => {
    // Don't search if query is empty
    if (!query || query.trim() === '') {
      return api.getProducts();
    }
    
    const response = await apiClient.get('/products/search', {
      params: { q: query.trim() } // Changed from 'query' to 'q'
    });
    return formatProducts(response.data);
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    if (category === 'All') {
      return api.getProducts();
    }
    const response = await apiClient.get(`/products/category/${category}`);
    return formatProducts(response.data);
  },

  // Admin: Create product
  createProduct: async (productData) => {
    const response = await apiClient.post('/products', productData);
    return formatImageUrls(response.data);
  },

  // Admin: Update product
  updateProduct: async (id, productData) => {
    const response = await apiClient.put(`/products/${id}`, productData);
    return formatImageUrls(response.data);
  },

  // Admin: Delete product
  deleteProduct: async (id) => {
    await apiClient.delete(`/products/${id}`);
  },
};

export default api;