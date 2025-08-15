import React from 'react';

interface BarcodeScannerProps {
  onScanSuccess?: (code: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({onScanSuccess}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-lg shadow-sm p-8">
      {/* Scanner Illustration */}
      <div className="mb-8">
        <img 
          className="w-40 h-46 object-contain" 
          src="/portable-scanner.png" 
          alt="Portable Barcode Scanner"
        />
      </div>

      {/* Content */}
      <div className="text-center max-w-md">        
        {/* Scan Instruction */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-5">
          <p className="text-orderTextColor font-medium mb-2">
            Ready to scan
          </p>
          <p className="text-orderTextColor text-l">
          Point your scanner at the barcode to scan successfully
          </p>
        </div>

        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
          onClick={() => onScanSuccess && onScanSuccess('sample-barcode')}
        >
          Simulate Scan
        </button>
      </div>
    </div>
  );
};
