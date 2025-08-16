import React from 'react';

interface DashboardBarProps {
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
}

export const DashboardBar: React.FC<DashboardBarProps> = ({
  searchPlaceholder = "search product",
  onSearchChange,
  onFilterClick
}) => {
  return (
    <div className="border-1 border-gray-300 text-[#000000] py-4 px-6">
      <div className="flex items-center justify-between py-2">
        {/* Dashboard Section */}
        <div className="flex items-center w-[253px] h-[48px] bg-[#FFF2E0] hover:bg-[#FFF2E0] justify-center p-[12px]">
          <img 
            src="/icons/icon-park-outline_upload-logs.png" 
            alt="Dashboard" 
            className="w-5 h-5 mr-2"
          />
          <span className="text-black font-medium">Dashboard</span>
        </div>
        
        {/* Product Log Section */}
        <div className="flex items-center w-[253px] h-[48px] hover:bg-[#FFF2E0] justify-center p-[12px]">
          <img 
            src="/icons/icon-park-outline_upload-logs.png" 
            alt="Product Log" 
            className="w-5 h-5 mr-2"
          />
          <span className="text-black font-medium">Product Log</span>
        </div>
        
        {/* Search Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white placeholder:text-gray-500"
            />
            <img 
              src="/icons/Search.png" 
              alt="Search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60"
            />
          </div>
          <button 
            onClick={onFilterClick}
            className="p-2 bg-white/20 rounded-lg hover:bg-white/30 hidden transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46 22,3"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
