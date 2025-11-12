import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import Header from '../components/Header';
import ProductDetail from '../components/ProductDetail';
import {useProduct} from '../hooks/useProduct'; // ✅ default import

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div
            className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto"
            style={{ borderColor: '#D4AF37' }}
          ></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <p className="text-red-600 text-lg">Error loading product</p>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-6 py-3 rounded-lg text-white"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)',
            }}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 mb-6"
        >
          <ChevronLeft className="w-5 h-5 mr-2" />
          Back
        </button>
        <ProductDetail product={product} onClose={() => navigate(-1)} />
      </div>
    </div>
  );
};

export default ProductDetailPage; // ✅