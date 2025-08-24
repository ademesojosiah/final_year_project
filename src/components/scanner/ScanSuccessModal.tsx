import React, { useState, useEffect } from 'react';
import type { Order } from '../../types/orders';

interface ScanSuccessModalProps {
  isOpen: boolean;
  scannedCode: string;
  currentOrder: Order | null;
  statusTransition: { nextStatus: string; action: string } | null;
  isLoading: boolean;
  onContinue: () => void;
  onCancel: () => void;
}

export const ScanSuccessModal: React.FC<ScanSuccessModalProps> = ({ 
  isOpen, 
  scannedCode, 
  currentOrder,
  statusTransition,
  isLoading,
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
        return prev + 1.25; // Increase by 1.25% every interval (80 intervals = 100%)
      });
    }, 100); // Update every 100ms, so 8 seconds total

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
          {currentOrder && statusTransition ? (
            <>Moving products <span className="font-semibold text-primary">{scannedCode}</span> from <strong>{currentOrder.status}</strong> to <strong>{statusTransition.nextStatus}</strong></>
          ) : (
            <>Processing order <span className="font-semibold text-primary">{scannedCode}</span>...</>
          )}
        </p>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="bg-orderTextColor h-2 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-gray-500">Auto-continuing in {Math.ceil((100 - progress) / 12.5)} seconds...</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between align-center">
          <button
            onClick={onContinue}
            disabled={isLoading}
            className="border-1 border-primary text-primary py-3 px-6 rounded-xl hover:bg-primary/60 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Processing...' : 'Continue'}
          </button>
          <button
            onClick={handleCancel}
            disabled={isLoading}
            className="bg-[#B60000] text-white py-3 px-6 rounded-xl hover:bg-[#B60000]/20 transition-colors font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
