import React from 'react';

const LandingPageNavbar: React.FC = () => {
  return (
    <div className="mx-auto w-[755px] mt-[24px] h-[60px] p-[1px] rounded-xl bg-gradient-to-r from-[#FFF2E0] via-[#5D4601] to-[#251A00]">
      <nav className="flex items-center justify-between px-6 py-4 bg-white h-full rounded-xl">
        <div className="flex items-center">
          <img 
            src="/icons/logo.png" 
            alt="Orderly Logo" 
            className="h-6 w-auto"
          />
        </div>
        
        <div className="flex items-center space-x-8">
          <a href="#home" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
            Home
          </a>
          <a href="#features" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
            Features
          </a>
          <a href="#faq" className="text-gray-700 hover:text-gray-900 transition-colors text-sm">
            FAQ
          </a>
        </div>

        <button className="bg-[#181000] text-[#FFF2E0] px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-sm">
          Start for free
        </button>
      </nav>
    </div>
  );
};

export default LandingPageNavbar;
