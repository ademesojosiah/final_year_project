import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingPageNavbar from '../components/ui/LandingPageNavbar';
import TestimonialCard from '../components/ui/TestimonialCard';

const Landing: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(2); // Question 3 is open by default
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleGetStarted = () => {
    navigate('/dashboard');
  };
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <LandingPageNavbar />

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center pt-24">
        {/* Header Section - Centered */}
        <div id="home" className="flex flex-col items-center text-center max-w-2xl mb-12 relative">
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
          
          <button 
            onClick={handleGetStarted}
            className="border border-[#7A5C00] text-[#181000] px-8 py-3 rounded-full text-lg hover:bg-[#181000] hover:text-[#FFF2E0] transition-colors"
          >
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
        <div id="features" className="w-full max-w-6xl px-6 py-16 flex flex-col items-left">
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
        <div className="w-full bg-[#3B3B3B] py-16 relative">
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
                <div className="pl-24 py-10 relative bg-white/15 backdrop-blur-sm shadow-2xl">


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
                      className=" w-full h-[539.49px] object-contain"

                    />
                  
                  {/* Front Image - Dashboard card/modal */}
                    <img 
                      src="/image 5.png" 
                      alt="Dashboard Front" 
                      className="absolute bottom-10 left-3 w-[202.18px] h-[438.31px] object-contain z-10 rounded-lg shadow-2xl"
                    />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="w-full py-6 flex flex-col items-center justify-center">
          <div className="max-w-6xl mx-auto flex flex-col items-center">
            
            {/* First Child - Badge */}
            <div className="bg-[#FFECB2] text-[#181000] px-4 py-2 rounded-full text-sm font-medium mb-8 inline-flex items-center w-fit">
              <img 
                src="/icons/Star 2.png" 
                alt="Star" 
                className="w-4 h-4 mr-2 drop-shadow-lg"
              />
              Testimonials
            </div>

            {/* Second Child - Heading */}
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-16 text-center">
              Words on the street
            </h2>

            {/* Third Child - Testimonials Grid */}
            <div className="flex flex-col gap-8 w-full max-w-6xl">
              
              {/* First Row - 3 cards shifted right */}
              <div className="flex gap-6 ml-12">
                <TestimonialCard
                  name="ken mark"
                  role="ceo"
                  avatar="/icons/Ellipse 6.png"
                  testimonial="Orderly has increased our productivity and control. So highly recommended!"
                />

                <TestimonialCard
                  name="Ken mark"
                  role="general manager"
                  avatar="/icons/Ellipse 6.png"
                  testimonial="As an administrator of Orderly and I know specifically where every order stands"
                  isHighlighted={true}
                />

                <TestimonialCard
                  name="ken mark"
                  role="general manager"
                  avatar="/icons/Ellipse 6.png"
                  testimonial="Tracking orders is now so easy that my old days using a..."
                />
              </div>

              {/* Second Row - 3 cards shifted left */}
              <div className="flex gap-6 mr-12">
                <TestimonialCard
                  name="Nkem edozie"
                  role="engineer"
                  avatar="/icons/Ellipse 6.png"
                  testimonial="It increased, communication is at its utmost level within ourselves"
                />

                <TestimonialCard
                  name="ken mark"
                  role="supervisor"
                  avatar="/icons/Ellipse 6.png"
                  testimonial="Orderly has increased our productivity and control. So highly recommended!"
                  isHighlighted={true}
                />

                <TestimonialCard
                  name="Kemi Adebayo"
                  role="manager"
                  avatar="/icons/Ellipse 6.png"
                  testimonial="Now, everything updates in real time and we can spot delays before issues happen. Our productivity has increased!"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Section 5 - FAQ and Join Section */}
        <div id="faq" className="w-full py-12 px-6 bg-gradient-to-r from-[#FFF2E0] to-white">
          <div className="max-w-5xl mx-auto">
            
            {/* First Child - FAQ Section */}
            <div className="flex gap-8 mb-12">
              
              {/* Left - FAQ Title */}
              <div className="flex-1">
                <h2 className="text-[40px] md:text-4xl font-semibold text-[#251A00] leading-tight">
                  Frequently Asked
                  <br />
                  Question
                </h2>
              </div>

              {/* Right - Questions and Answers */}
              <div className="flex-1 space-y-3">
                
                {/* Question 1 */}
                <div className="border-b border-gray-200 pb-3">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === 0 ? null : 0)}
                  >
                    <h3 className="text-sm font-medium text-black">What makes Orderly better than using a spreadsheet?</h3>
                    <span className="text-lg text-gray-500">{openFaq === 0 ? '↓' : '→'}</span>
                  </div>
                  {openFaq === 0 && (
                    <div className="mt-3 text-gray-600 text-xs">
                      Orderly provides real-time tracking, automated updates, and seamless collaboration features that spreadsheets simply can't match. No more manual data entry, version conflicts, or lost information.
                    </div>
                  )}
                </div>

                {/* Question 2 */}
                <div className="border-b border-gray-200 pb-3">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === 1 ? null : 1)}
                  >
                    <h3 className="text-sm font-medium text-black">Do I need technical skills to use Orderly?</h3>
                    <span className="text-lg text-gray-500">{openFaq === 1 ? '↓' : '→'}</span>
                  </div>
                  {openFaq === 1 && (
                    <div className="mt-3 text-gray-600 text-xs">
                      Not at all! Orderly is designed for everyone, regardless of technical background. Our intuitive interface makes it easy to get started in minutes, and our support team is always ready to help.
                    </div>
                  )}
                </div>

                {/* Question 3 - Expanded by default */}
                <div className="border-b border-gray-200 pb-3">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setOpenFaq(openFaq === 2 ? null : 2)}
                  >
                    <h3 className="text-sm font-medium text-black">Can Orderly grow with my business?</h3>
                    <span className="text-lg text-gray-500">{openFaq === 2 ? '↓' : '→'}</span>
                  </div>
                  {openFaq === 2 && (
                    <div className="mt-3 text-gray-600 text-xs">
                      Yes! Whether you're managing a few orders a week or hundreds a day, Orderly 
                      scales with you. As your team and operations expand, you can easily add more 
                      users, features, and integrations without switching tools.
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Second Child - Join Section */}
            <div className="bg-[#FFFAED] border-1 border-[#FDCD35] rounded-lg p-8 flex flex-col items-center justify-center text-center">
              
              {/* Text */}
              <h2 className="text-2xl md:text-3xl font text-black mb-6">
                Join 100+ people who've simplified
                <br />
                tracking forever with Orderly.
              </h2>

              {/* Icons */}
              <div className="flex items-center mb-6">
                <img src="/icons/Ellipse 6.png" alt="User 1" className="w-10 h-10 rounded-full border-2 border-white z-10" />
                <img src="/icons/Ellipse 6.png" alt="User 2" className="w-10 h-10 rounded-full border-2 border-white -ml-2 z-20" />
                <img src="/icons/Ellipse 6.png" alt="User 3" className="w-10 h-10 rounded-full border-2 border-white -ml-2 z-30" />
                <img src="/icons/Ellipse 6.png" alt="User 4" className="w-10 h-10 rounded-full border-2 border-white -ml-2 z-40" />
                <img src="/icons/Ellipse 6.png" alt="User 5" className="w-10 h-10 rounded-full border-2 border-white -ml-2 z-50" />
              </div>

              {/* Button */}
              <button 
                onClick={handleGetStarted}
                className="bg-[#181000] text-[#FFF2E0] px-6 py-2 rounded-md text-base hover:bg-gray-800 transition-colors"
              >
                Start for free
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full bg-[#181000] text-white py-12 px-6">
          <div className="max-w-6xl mx-auto">
            {/* Main Content */}
            <div className="flex justify-between items-start mb-8">
              
              {/* Left Side - Logo and Navigation */}
              <div className="flex flex-col items-start">
                {/* Logo */}
                <div className="mb-8">
                  <img 
                    src="/icons/logo (1).png" 
                    alt="Orderly Logo" 
                    className="h-16 w-auto"
                  />
                </div>
                
                {/* Navigation Links */}
                <div className="flex space-x-8">
                  <button 
                    onClick={() => scrollToSection('home')}
                    className="text-white hover:text-[#B8860B] transition-colors cursor-pointer text-sm"
                  >
                    Home
                  </button>
                  <button 
                    onClick={() => scrollToSection('features')}
                    className="text-white hover:text-[#B8860B] transition-colors cursor-pointer text-sm"
                  >
                    Features
                  </button>
                  <button 
                    onClick={() => scrollToSection('faq')}
                    className="text-white hover:text-[#B8860B] transition-colors cursor-pointer text-sm"
                  >
                    FAQ
                  </button>
                </div>
              </div>

              {/* Right Side - Contact Info and Social */}
              <div className="flex flex-col items-end">
                {/* Contact Info */}
                <div className="text-right mb-6">
                  <p className="text-white text-sm mb-1">
                    Email: support@orderly.com
                  </p>
                  <p className="text-white text-sm">
                    Address: 123 Tech Street, Lagos, Nigeria
                  </p>
                </div>
                
                {/* Social Icons */}
                <div className="flex space-x-3">
                  <a href="#" className="text-white hover:text-[#B8860B] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-[#B8860B] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                    </svg>
                  </a>
                  <a href="#" className="text-white hover:text-[#B8860B] transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Bottom Border Line */}
            <div className="border-t border-gray-700 pt-6 text-center">
              <p className="text-gray-400 text-sm">
                © 2025 Orderly. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Landing;
