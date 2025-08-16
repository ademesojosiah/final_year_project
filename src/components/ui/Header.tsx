import React from 'react';

interface HeaderProps {
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({ userName = "Jojo A" }) => {
  return (
    <header className="bg-primary text-white py-4 px-6 flex justify-between items-center">
      {/* Company Logo */}
      <div className="flex items-center">
        <img 
          src="/logo.png" 
          alt="Company Logo" 
          className="h-8 w-auto"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors relative">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
            <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
          </svg>
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <span className="text-sm font-medium">{userName}</span>
        </div>
      </div>
    </header>
  );
};
