import { useState, useEffect } from 'react';
import { api } from '../services/api';

export const useProducts = (category = 'All', searchQuery = '') => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let data;
        if (searchQuery) {
          data = await api.searchProducts(searchQuery);
        } else {
          data = await api.getProductsByCategory(category);
        }
        
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery]);

  return { products, loading, error };
};