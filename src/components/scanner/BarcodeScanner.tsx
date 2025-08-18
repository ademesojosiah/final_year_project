import React, { useEffect, useRef } from 'react';

interface BarcodeScannerProps {
  onScanSuccess?: (code: string) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({onScanSuccess}) => {
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const scanTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const inputBufferRef = useRef<string>('');
  const lastInputTimeRef = useRef<number>(0);
  const consecutiveInputsRef = useRef<number>(0);

  // Scanner detection settings
  const SCANNER_MIN_LENGTH = 8; // Minimum length for a valid scan
  const SCANNER_MAX_INPUT_INTERVAL = 50; // Max ms between characters for scanner
  const SCANNER_MIN_SPEED = 10; // Minimum characters per second for scanner
  const SCAN_COMPLETE_DELAY = 100; // Delay after last character to process scan

  useEffect(() => {
    // Focus the hidden input when component mounts
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }

    // Add interval to ensure focus is maintained
    const focusInterval = setInterval(() => {
      if (hiddenInputRef.current && document.activeElement !== hiddenInputRef.current) {
        hiddenInputRef.current.focus();
      }
    }, 100);

    return () => {
      clearInterval(focusInterval);
      // Clean up any pending scan timeout
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }
    };
  }, []);

  const ensureFocus = () => {
    // Ensure the hidden input always has focus when anything is clicked
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };

  const handleContainerClick = (e: React.MouseEvent) => {
    // Prevent any default behavior and ensure focus
    e.preventDefault();
    ensureFocus();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentTime = Date.now();
    const currentValue = e.target.value;
    const timeDiff = currentTime - lastInputTimeRef.current;

    // Clear any existing timeout
    if (scanTimeoutRef.current) {
      clearTimeout(scanTimeoutRef.current);
    }

    // Check if this is likely scanner input based on timing
    if (timeDiff < SCANNER_MAX_INPUT_INTERVAL && inputBufferRef.current.length > 0) {
      // Fast consecutive input - likely from scanner
      consecutiveInputsRef.current++;
      inputBufferRef.current = currentValue;
    } else {
      // Slow input or first character - could be manual typing
      consecutiveInputsRef.current = 1;
      inputBufferRef.current = currentValue;
      
      // If input is too slow, it's likely manual typing - ignore it
      if (timeDiff > SCANNER_MAX_INPUT_INTERVAL && currentValue.length > 1) {
        console.log('Manual typing detected - ignoring input');
        e.target.value = '';
        inputBufferRef.current = '';
        lastInputTimeRef.current = currentTime;
        return;
      }
    }

    lastInputTimeRef.current = currentTime;

    // Set timeout to process the scan after delay
    scanTimeoutRef.current = setTimeout(() => {
      const finalValue = inputBufferRef.current;
      const scanDuration = currentTime - (lastInputTimeRef.current - (consecutiveInputsRef.current * 10));
      const avgSpeed = finalValue.length / (scanDuration / 1000); // chars per second

      console.log('Scan analysis:', {
        value: finalValue,
        length: finalValue.length,
        consecutiveInputs: consecutiveInputsRef.current,
        avgSpeed: avgSpeed,
        scanDuration: scanDuration
      });

      // Validate if this is a legitimate scanner input
      if (finalValue.length >= SCANNER_MIN_LENGTH && 
          consecutiveInputsRef.current >= SCANNER_MIN_LENGTH &&
          avgSpeed >= SCANNER_MIN_SPEED) {
        
        console.log('Valid scanner input detected:', finalValue);
        
        if (onScanSuccess) {
          onScanSuccess(finalValue);
        }
      } else {
        console.log('Input rejected - likely manual typing or invalid scan');
      }

      // Clear the input and reset
      if (hiddenInputRef.current) {
        hiddenInputRef.current.value = '';
      }
      inputBufferRef.current = '';
      consecutiveInputsRef.current = 0;
    }, SCAN_COMPLETE_DELAY);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle Enter key from scanner
    if (e.key === 'Enter') {
      // Clear any pending timeout since Enter indicates scan completion
      if (scanTimeoutRef.current) {
        clearTimeout(scanTimeoutRef.current);
      }

      const input = e.target as HTMLInputElement;
      const scannedValue = input.value;
      
      console.log('Enter key detected - processing immediate scan:', scannedValue);
      
      // For Enter key scans, we're more lenient as this is a strong scanner indicator
      if (scannedValue.length >= SCANNER_MIN_LENGTH) {
        console.log('Valid scanner input via Enter key:', scannedValue);
        
        if (onScanSuccess) {
          onScanSuccess(scannedValue);
        }
      } else {
        console.log('Scan too short - rejected');
      }
      
      // Clear the input and reset
      input.value = '';
      inputBufferRef.current = '';
      consecutiveInputsRef.current = 0;
      return;
    }

    // Detect manual keyboard shortcuts and potentially block them
    if (e.ctrlKey || e.altKey || e.metaKey) {
      console.log('Keyboard shortcut detected - allowing');
      return;
    }

    // For other keys, update timing for scanner detection
    lastInputTimeRef.current = Date.now();
  };
  return (
    <div 
      className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-lg shadow-sm p-8"
      onClick={handleContainerClick}
      onMouseDown={ensureFocus}
      onTouchStart={ensureFocus}
    >
      {/* Hidden input for barcode scanner */}
      <input
        ref={hiddenInputRef}
        type="text"
        className="sr-only opacity-0 absolute -top-10 -left-10 w-1 h-1"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onBlur={ensureFocus}
        placeholder="Hidden barcode input"
        autoFocus
      />
      
      {/* Scanner Illustration */}
      <div className="mb-8" onClick={handleContainerClick}>
        <img 
          className="w-40 h-46 object-contain" 
          src="/portable-scanner.png" 
          alt="Portable Barcode Scanner"
        />
      </div>

      {/* Content */}
      <div className="text-center max-w-md" onClick={handleContainerClick}>        
        {/* Scan Instruction */}
        <div className="bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg p-5">
          <p className="text-orderTextColor font-medium mb-2">
            Ready to scan
          </p>
          <p className="text-orderTextColor text-l">
          Point your scanner at the barcode to scan successfully
          </p>
        </div>
      </div>
    </div>
  );
};
