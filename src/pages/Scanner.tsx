import { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { BarcodeScanner } from '../components/scanner/BarcodeScanner';
import { ScanSuccessModal } from '../components/scanner/ScanSuccessModal';

const Scanner = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [scannedCode, setScannedCode] = useState('');

  const handleScanSuccess = (code: string) => {
    setScannedCode(code);
    setShowSuccessModal(true);
  };

  const handleContinue = () => {
    setShowSuccessModal(false);
    setScannedCode('');
    // Navigate to next screen or perform other actions
  };

  const handleCancel = () => {
    setShowSuccessModal(false);
    setScannedCode('');
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
    </DashboardLayout>
  );
};

export default Scanner;
