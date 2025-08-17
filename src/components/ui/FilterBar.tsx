import React from 'react';

interface FilterBarProps {
  onStatusFilter?: (status: string) => void;
  onSortChange?: (sortBy: string) => void;
  onScanNewProduct?: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  onStatusFilter,
  onSortChange,
  onScanNewProduct
}) => {
  return (
    <div className="pt-6 pl-14 pr-6 pb-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Left side - All products dropdown */}
          <div className="flex items-center">
            <select 
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => onStatusFilter?.(e.target.value)}
            >
              <option value="">All products</option>
              <option value="In Production">In Production</option>
              <option value="In Printing">In Printing</option>
              <option value="In Binding">In Binding</option>
              <option value="Packaging">Packaging</option>
              <option value="Delivery">Delivery</option>
            </select>
          </div>

          {/* Right side - Sort and Scan button */}
          <div className="flex items-center gap-4">
            <select 
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              onChange={(e) => onSortChange?.(e.target.value)}
            >
              <option value="">Sort by</option>
              <option value="date">Date</option>
              <option value="status">Status</option>
              <option value="customer">Customer</option>
              <option value="quantity">Quantity</option>
            </select>
            
            <button 
              onClick={onScanNewProduct}
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-6 py-2 rounded-lg text-sm transition-colors"
            >
              scan new product
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
