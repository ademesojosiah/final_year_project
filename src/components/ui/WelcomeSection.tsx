import React from 'react';

interface WelcomeData {
  name: string;
  message: string;
}

interface WelcomeSectionProps {
  welcomeSection?: React.ReactNode;
  welcomeData?: WelcomeData;
  showSearch?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  welcomeSection,
  welcomeData = { name: "Bolarinwa", message: "Welcome to your order page" },
  showSearch = false,
  searchPlaceholder = "search order id",
  searchValue = "",
  onSearchChange
}) => {
  return (
    <div className="pl-14 pr-6 pt-8 pb-4">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          {/* Welcome Content */}
          <div className="flex-1">
            {welcomeSection ? (
              welcomeSection
            ) : (
              <div className="text-left">
                <h2 className="text-[32px] font-semibold text-[#2D1B00] mb-2">Hello {welcomeData.name}!</h2>
                <p className="text-lg text-[#6B5B5B] font-light">{welcomeData.message}</p>
              </div>
            )}
          </div>

          {/* Search Section - Only shown when showSearch is true */}
          {showSearch && (
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
          )}
        </div>
      </div>
    </div>
  );
};
