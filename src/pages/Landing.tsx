import React from 'react';
import LandingPageNavbar from '../components/ui/LandingPageNavbar';

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <LandingPageNavbar />

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center relative">
        
        {/* Header Section - Centered */}
        <div className="flex flex-col items-center text-center max-w-2xl mb-12 relative">
          {/* Left Star Icon */}
          <div className="absolute left-[-200px] top-[100px] z-10">
            <img 
              src="/icons/Star 2.png" 
              alt="Star" 
              className="w-8 h-8"
            />
          </div>
          
          {/* Right Star Icon */}
          <div className="absolute right-[-200px] top-[80px] z-10">
            <img 
              src="/icons/Star 3.png" 
              alt="Star" 
              className="w-10 h-10"
            />
          </div>

          <h1 className="text-[52px] text-sm md:text-5xl font-bold text-black leading-tight mb-4">
            The All-in one production
            <br />
            tracker tool
          </h1>
          
          <p className="text-[16px] text-poppins text-black mb-8 max-w-lg">
            Manage production chain in one dashboard, monitor product movement, and keep 
            your customers in the loop.
          </p>
          
          <button className="border border-[#7A5C00] text-[#181000] px-8 py-3 rounded-full text-lg hover:bg-[#181000] hover:text-[#FFF2E0] transition-colors">
            Get started
          </button>
        </div>

        {/* Dashboard Image Section */}
        <div className="w-full max-w-5xl px-4">
          <img 
            src="/image 2.png" 
            alt="Production Dashboard" 
            className="w-full object-contain rounded-lg"
          />
        </div>

        {/* Features Section */}
        <div className="w-full max-w-6xl px-6 py-16 flex flex-col items-left">
          {/* Our Features Badge */}
          <div className="bg-[#FFF2E0] text-[#181000] px-4 py-2 rounded-full text-sm font-medium mb-8 inline-flex items-center w-fit">
            <img 
              src="/icons/Star 2.png" 
              alt="Star" 
              className="w-4 h-4 mr-2 drop-shadow-lg"
            />
            Our features
          </div>

          {/* Main Heading */}
          <div className="text-left mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight">
              Smart inventory just
              <br />
              <span className="text-[#B8860B]">for you!</span>
            </h2>
          </div>

          {/* Three Feature Cards */}
          <div className="flex justify-between gap-8 w-full">
            {/* Easy tracking for customer */}
            <div className="flex items-start p-6 border-t-1 border-black flex-1">
              <img 
                src="/icons/material-symbols-light_footprint-outline.png" 
                alt="Footprint Icon" 
                className="w-4 h-4 mr-4 mt-1"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-black mb-2">Easy tracking for customer</h3>
                <p className="text-[14px] text-poppins text-black">
                  customers can track all their orders in one place with our system
                </p>
              </div>
            </div>

            {/* Smart scanning */}
            <div className="flex items-start p-6 border-t-1 border-black flex-1">
              <img 
                src="/icons/icon-park-outline_scanning-two.png" 
                alt="Scanning Icon" 
                className="w-4 h-4 mr-4 mt-1"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-black mb-2">Smart scanning</h3>
                <p className="text-[14px] text-poppins text-black">
                  product fast and logged into your dashboard to keep track!
                </p>
              </div>
            </div>

            {/* Management made easy */}
            <div className="flex items-start p-6 border-t-1 border-black flex-1">
              <img 
                src="/icons/material-symbols_factory-outline.png" 
                alt="Factory Icon" 
                className="w-4 h-4 mr-4 mt-1"
              />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold text-black mb-2">Management made easy</h3>
                <p className="text-[14px] text-poppins text-black">
                  manage your scanned product all in one place with orderly.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Skip Spreadsheet Section */}
        <div className="w-full bg-[#3B3B3B] py-16 px-2 pr-0 relative">
          <div className="max-w-6xl mx-auto flex flex-col">
            
            {/* Header with Icons */}
            <div className="text-center mb-16 relative">
              {/* Decorative Icons - Absolute positioned */}
              <div className="absolute left-[10%] top-[20px]">
                <img 
                  src="/icons/Star 2.png" 
                  alt="Star" 
                  className="w-6 h-6"
                />
              </div>
              
              <div className="absolute right-[10%] top-[10px]">
                <img 
                  src="/icons/Star 3.png" 
                  alt="Star" 
                  className="w-8 h-8"
                />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Skip the spreadsheet,
                <br />
                Manage easily with <span className="text-[#B8860B]">Orderly</span>
              </h2>
            </div>

            {/* Content Row */}
            <div className="flex justify-between items-center">
              
              {/* Left Side - Features List */}
              <div className=" flex-col justify-center items-center pl-4">
                <div className="space-y-6 mb-8 p-2 mr-4">
                  
                  <div className="flex items-center justify-start text-white">
                    <img 
                      src="/icons/lets-icons_check-fill.png" 
                      alt="Check" 
                      className="w-6 h-6 mr-4"
                    />
                    <span className="text-[14px]">Orderly keeps you organized, efficient, and always in control.</span>
                  </div>

                  <div className="flex items-center justify-start text-white">
                    <img 
                      src="/icons/lets-icons_check-fill.png" 
                      alt="Check" 
                      className="w-6 h-6 mr-4"
                    />
                    <span className="text-[14px]">Track orders in real time, spot delays before they happen</span>
                  </div>

                  <div className="flex items-center justify-start text-white">
                    <img 
                      src="/icons/lets-icons_check-fill.png" 
                      alt="Check" 
                      className="w-6 h-6 mr-4"
                    />
                    <span className="text-[14px]">Track orders in real time, spot delays before they happen</span>
                  </div>

                  <div className="flex items-center justify-start text-white">
                    <img 
                      src="/icons/lets-icons_check-fill.png" 
                      alt="Check" 
                      className="w-6 h-6 mr-4"
                    />
                    <span className="text-[14px]">Your orders. One view. Zero stress.</span>
                  </div>
                </div>

                <button className="w-[260px] h-[48px] border border-[#B8860B] text-[#B8860B] px-10 py-2 rounded-md text-lg hover:bg-[#B8860B] hover:text-white transition-colors">
                  Try for free
                </button>
              </div>

              {/* Right Side - Images */}
              <div className="relative">
                <div className="pl-16 relative bg-white/15 backdrop-blur-sm shadow-2xl">

                              <div className="absolute left-[-4px] top-[-4px]">
                <img 
                  src="/icons/Star 2.png" 
                  alt="Star" 
                  className="w-6 h-6"
                />
              </div>
                  {/* Back Image - Dashboard table view */}
                    <img 
                      src="/image 3.png" 
                      alt="Dashboard Background" 
                      className=" w-[836px] h-[539.49px] object-contain"
                    />
                  
                  {/* Front Image - Dashboard card/modal */}
                    <img 
                      src="/image 5.png" 
                      alt="Dashboard Front" 
                      className="absolute bottom-6 left-3 w-[202.18px] h-[438.31px] object-contain z-10 rounded-lg shadow-2xl"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
