import React from 'react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#FDFCFA] to-[#F8F4ED] relative overflow-hidden py-8">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#F0E5C9]/30 to-[#E8D5A7]/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-gradient-to-tl from-[#F0E5C9]/20 to-[#E8D5A7]/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3"></div>
      
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-center px-20 relative z-10">
        <div className="max-w-[500px]">
          <h1 className="text-[36px] font-bold text-[#2D1B00] leading-[1.2] tracking-tight">
            Track. Process. Track again
          </h1>
          <p className="mt-6 text-[#6B5B5B] text-lg leading-relaxed font-light">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>
      </div>

      {/* Right Section */}
      {children}
    </div>
  );
};
