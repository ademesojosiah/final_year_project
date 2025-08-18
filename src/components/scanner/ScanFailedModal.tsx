import React from 'react';

interface ScanFailedModalProps {
  isOpen: boolean;
  errorMessage: string;
  scannedCode?: string;
  onRetry: () => void;
  onCancel: () => void;
}

export const ScanFailedModal: React.FC<ScanFailedModalProps> = ({
  isOpen,
  errorMessage,
  scannedCode,
  onRetry,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        {/* Error Icon */}
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-center text-gray-900 mb-2">
          Scan Failed
        </h2>

        {/* Error Message */}
        <p className="text-center text-gray-600 mb-4">
          {errorMessage}
        </p>

        {/* Scanned Code (if provided) */}
        {scannedCode && (
          <div className="bg-gray-50 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-500 mb-1">Scanned Code:</p>
            <p className="font-mono text-sm text-gray-900 break-all">{scannedCode}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onRetry}
            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};
