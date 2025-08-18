import { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { BarcodeScanner } from '../components/scanner/BarcodeScanner';
import { ScanSuccessModal } from '../components/scanner/ScanSuccessModal';
import { ScanFailedModal } from '../components/scanner/ScanFailedModal';
import { useNavigate } from 'react-router-dom';

const Scanner = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleScanSuccess = (code: string) => {
    setScannedCode(code);
    
    // Simulate checking if order exists (you can replace this with actual API call)
    const orderExists = checkOrderExists(code);
    
    // if (orderExists) {
      setShowSuccessModal(true);    // } else {
    //   // Order not found - show failed modal
    //   setErrorMessage('Order not found. Please check the barcode and try again.');
    //   setShowFailedModal(true);
    // }
  };

  // Simulate order existence check (replace with actual API call)
  const checkOrderExists = (code: string): boolean => {
    // For demo purposes, let's say codes starting with "ORD" exist
    // You can replace this with actual API logic
    return code.startsWith('ORD') || code.includes('12345');
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    setScannedCode('');
    navigate("/dashboard");
    // Navigate to next screen or perform other actions
  };

  const handleCancel = () => {
    setShowSuccessModal(false);
    setScannedCode('');
  };

  const handleRetry = () => {
    setShowFailedModal(false);
    setScannedCode('');
    setErrorMessage('');
    // Focus will automatically return to scanner
  };

  const handleFailedCancel = () => {
    setShowFailedModal(false);
    setScannedCode('');
    setErrorMessage('');
  };

  return (
    <DashboardLayout showDashBoardButton={true} welcomeData={{ name: "Josiah", message: "Welcome to your Scanning page" }}>
      <BarcodeScanner onScanSuccess={handleScanSuccess} />
      
      <ScanSuccessModal
        isOpen={showSuccessModal}
        scannedCode={scannedCode}
        onContinue={handleContinue}
        onCancel={handleCancel}
      />

      <ScanFailedModal
        isOpen={showFailedModal}
        errorMessage={errorMessage}
        scannedCode={scannedCode}
        onRetry={handleRetry}
        onCancel={handleFailedCancel}
      />
    </DashboardLayout>
  );
};

export default Scanner;
