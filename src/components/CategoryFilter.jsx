import React from 'react';
import { CATEGORIES } from '../utils/constants';

const CategoryFilter = ({ selectedCategory, onSelectCategory }) => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {CATEGORIES.map(category => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
            selectedCategory === category
              ? 'text-white shadow-lg'
              : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-yellow-600'
          }`}
          style={
            selectedCategory === category
              ? { background: 'linear-gradient(135deg, #D4AF37 0%, #C5A028 100%)' }
              : {}
          }
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;