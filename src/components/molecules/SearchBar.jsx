import { useState } from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Input from '@/components/atoms/Input';

const SearchBar = ({ placeholder = "Search...", onSearch, filters = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    onSearch?.(value, selectedFilter);
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
    onSearch?.(searchTerm, filter);
  };

  return (
    <div className="relative flex items-center space-x-3">
      <div className="flex-1 relative">
        <Input
          placeholder={placeholder}
          icon="Search"
          iconPosition="left"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="pr-4"
        />
      </div>

      {filters.length > 0 && (
        <div className="relative">
          <motion.button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="btn-secondary flex items-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ApperIcon name="Filter" className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
            <ApperIcon 
              name="ChevronDown" 
              className={`w-4 h-4 transition-transform duration-200 ${isFilterOpen ? 'rotate-180' : ''}`} 
            />
          </motion.button>

          {isFilterOpen && (
            <motion.div
              className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-premium border border-neutral-200 py-2 z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => handleFilterChange(filter.value)}
                  className={`w-full text-left px-4 py-2 hover:bg-neutral-50 transition-colors duration-150 ${
                    selectedFilter === filter.value ? 'text-primary-600 bg-primary-50' : 'text-neutral-700'
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;