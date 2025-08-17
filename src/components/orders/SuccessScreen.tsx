import React from 'react';

interface SuccessScreenProps {
  onContinue?: () => void;
}

export const SuccessScreen: React.FC<SuccessScreenProps> = ({
  onContinue
}) => {
  return (
    // Modal overlay with semi-transparent black background
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        {/* Success Content */}
        <div className="flex flex-col items-center text-center space-y-4">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Success Message */}
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">Successful</h2>
            <p className="text-gray-600 text-sm">
              Your order has been successfully placed and will be processed soon
            </p>
          </div>

          {/* Continue Button */}
          <div className="pt-4 w-full">
            <button
              onClick={onContinue}
              className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50"
            >
              Continue viewing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
