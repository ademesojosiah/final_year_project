import React from 'react';

interface DashboardBarProps {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  activeSection?: 'dashboard' | 'productLog';
  onDashboardClick?: () => void;
  onProductLogClick?: () => void;
}

export const DashboardBar: React.FC<DashboardBarProps> = ({
  searchPlaceholder = "search order id",
  searchValue = "",
  onSearchChange,
  activeSection = 'dashboard',
  onDashboardClick,
  onProductLogClick
}) => {
  return (
    <div className="border-1 border-gray-300 text-[#000000] py-4 px-6">
      <div className="flex items-center justify-between py-2">
        {/* Dashboard Section */}
        <button 
          onClick={onDashboardClick}
          className={`flex items-center w-[253px] h-[48px] justify-center p-[12px] transition-colors ${
            activeSection === 'dashboard' 
              ? 'bg-[#FFF2E0]' 
              : 'hover:bg-[#FFF2E0]'
          }`}
        >
          <img 
            src="/icons/icon-park-outline_upload-logs.png" 
            alt="Dashboard" 
            className="w-5 h-5 mr-2"
          />
          <span className="text-black font-medium">Dashboard</span>
        </button>
        
        {/* Product Log Section */}
        <button 
          onClick={onProductLogClick}
          className={`flex items-center w-[253px] h-[48px] justify-center p-[12px] transition-colors ${
            activeSection === 'productLog' 
              ? 'bg-[#FFF2E0]' 
              : 'hover:bg-[#FFF2E0]'
          }`}
        >
          <img 
            src="/icons/icon-park-outline_upload-logs.png" 
            alt="Product Log" 
            className="w-5 h-5 mr-2"
          />
          <span className="text-black font-medium">Product Log</span>
        </button>
        
        {/* Search Section */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white placeholder:text-gray-500"
            />
            <img 
              src="/icons/Search.png" 
              alt="Search" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
