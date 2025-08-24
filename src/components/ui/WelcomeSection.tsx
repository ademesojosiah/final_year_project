import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WelcomeData {
  name: string;
  message: string;
}

interface WelcomeSectionProps {
  welcomeSection?: React.ReactNode;
  welcomeData?: WelcomeData;
  showSearch?: boolean;
  showDashBoardButton?: boolean;
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  showPlaceOrderButton?: boolean;
  onPlaceOrderClick?: () => void;
}

export const WelcomeSection: React.FC<WelcomeSectionProps> = ({
  welcomeSection,
  welcomeData = { name: "Bolarinwa", message: "Welcome to your order page" },
  showSearch = false,
  showDashBoardButton = false,
  searchPlaceholder = "search order id",
  searchValue = "",
  onSearchChange,
  showPlaceOrderButton = false,
  onPlaceOrderClick
}) => {
const navigate = useNavigate();


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
                  className="pl-10 pr-10 py-2 bg-white text-gray-900 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white placeholder:text-gray-500"
                />
                <img 
                  src="/icons/Search.png" 
                  alt="Search" 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60"
                />
                {searchValue && (
                  <button
                    onClick={() => onSearchChange?.("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 opacity-60 hover:opacity-100 transition-opacity"
                    type="button"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Place Order Button - Only shown when showPlaceOrderButton is true */}
          {showPlaceOrderButton && (
            <div className="flex items-center ml-2">
              <button
                onClick={onPlaceOrderClick}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50"
              >
                Place an order
              </button>
            </div>
          )}



          {/* Dashboard Button - Only shown when showDashBoardButton is true */}
          {showDashBoardButton && (
            <div className="flex items-center ml-2">
              <button
                onClick={() => navigate('/dashboard')}
                className="bg-[#F59E0B] hover:bg-[#D97706] text-black font-medium px-6 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50"
              >
                Dashboard
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
