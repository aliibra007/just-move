import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ value, onChange, placeholder = "Search for products..." }) => {
  return (
    <div className="relative">
      <Search 
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" 
        size={20} 
      />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 rounded-full border-2 border-gray-200 focus:border-yellow-600 focus:outline-none transition"
        style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
      />
    </div>
  );
};

export default SearchBar;