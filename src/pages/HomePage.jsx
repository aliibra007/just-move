import React, { useState } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import ProductGrid from '../components/ProductGrid';
import { useProducts } from '../hooks/useProducts';
import Footer from '../components/Footer';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const { products, loading, error } = useProducts(selectedCategory, searchQuery);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Video Hero Section */}
      <HeroSection />

      {/* Products Section with ID for scrolling */}
      <div id="products-section" className="max-w-7xl mx-auto px-6 py-16">
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <SearchBar 
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* Category Filter */}
        <div className="mb-16">
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategoryChange}
          />
        </div>

        {/* Product Grid */}
        <ProductGrid 
          products={products}
          loading={loading}
          error={error}
        />
      </div>
      
      <Footer/>
    </div>
  );
};

export default HomePage;