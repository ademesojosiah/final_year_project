import React, { useState, useEffect } from 'react';

interface ScanSuccessModalProps {
  isOpen: boolean;
  scannedCode: string;
  onContinue: () => void;
  onCancel: () => void;
}

export const ScanSuccessModal: React.FC<ScanSuccessModalProps> = ({ 
  isOpen, 
  scannedCode, 
  onContinue,
  onCancel
}) => {
  const [progress, setProgress] = useState(0);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setProgress(0);
      setIsCancelled(false);
      return;
    }

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          if (!isCancelled) {
            onContinue();
          }
          return 100;
        }
        return prev + 2; // Increase by 2% every interval (50 intervals = 100%)
      });
    }, 100); // Update every 100ms, so 5 seconds total

    return () => clearInterval(interval);
  }, [isOpen, isCancelled, onContinue]);

  const handleCancel = () => {
    setIsCancelled(true);
    onCancel();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full mx-4 text-center shadow-2xl">
        {/* Success Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-15 h-15 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={3}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Scan Successful
        </h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Moving products <span className="font-semibold text-primary">{scannedCode}</span> from pending to Packaging
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-orderTextColor h-2 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">Auto-continuing in {Math.ceil((100 - progress) / 20)} seconds...</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between align-center">
          <button
            onClick={onContinue}
            className="border-1 border-primary text-primary py-3 px-6 rounded-xl hover:bg-primary/60 transition-colors font-semibold text-lg"
          >
            Continue
          </button>
          <button
            onClick={handleCancel}
            className="bg-[#B60000] text-white py-3 px-6 rounded-xl hover:bg-[#B60000]/20 transition-colors font-semibold text-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
