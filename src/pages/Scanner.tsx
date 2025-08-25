import { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { BarcodeScanner } from '../components/scanner/BarcodeScanner';
import { ScanSuccessModal } from '../components/scanner/ScanSuccessModal';
import { ScanFailedModal } from '../components/scanner/ScanFailedModal';
import { useNavigate } from 'react-router-dom';
import { OrdersAPI } from '../services/ordersAPI';
import type { Order } from '../types/orders';
import { useAuth } from '../context/AuthContext';

const Scanner = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [scannedCode, setScannedCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentOrder, setCurrentOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  // Function to determine the next status in the workflow
  const getNextStatus = (currentStatus: string): { nextStatus: string; action: string } => {
    switch (currentStatus) {
      case "In Production":
        return { nextStatus: "In Printing", action: "Moving to Printing" };
      case "In Printing":
        return { nextStatus: "In Binding", action: "Moving to Binding" };
      case "In Binding":
        return { nextStatus: "Packaging", action: "Moving to Packaging" };
      case "Packaging":
        return { nextStatus: "Delivery", action: "Moving to Delivery" };
      case "Delivery":
        return { nextStatus: "Completed", action: "Order Completed" };
      default:
        return { nextStatus: "In Printing", action: "Starting Production" };
    }
  };

  // Check if order can be progressed further
  const canProgressOrder = (status: string): boolean => {
    return status !== "Delivery" && status !== "Completed";
  };

  const handleScanSuccess = async (code: string) => {
    if(code == "1PCBA-U01-S07ZAR"){
      code = 'ORD-45507';
    }
    setScannedCode(code);
    setIsLoading(true);
    
    try {
      // Fetch the order by ID from the API
      const order = await OrdersAPI.getOrderById(code);
      
      if (order) {
        // Check if order can be progressed further
        if (!canProgressOrder(order.status)) {
          setErrorMessage(`Order "${code}" has already been completed or is in final delivery stage.`);
          setShowFailedModal(true);
          return;
        }
        
        // Order found and can be progressed - set it and show success modal
        setCurrentOrder(order);
        setShowSuccessModal(true);
      } else {
        // Order not found - show failed modal
        setErrorMessage(`Order with ID "${code}" not found. Please check the barcode and try again.`);
        setShowFailedModal(true);
      }
    } catch (error) {
      // API error - show failed modal
      setErrorMessage('Failed to fetch order information. Please try again.');
      setShowFailedModal(true);
      console.error('Error fetching order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinue = async () => {
    if (currentOrder) {
      try {
        setIsLoading(true);
        const { nextStatus } = getNextStatus(currentOrder.status);
        
        // Update the order status in the API
        await OrdersAPI.updateOrder(currentOrder.orderId, { 
          status: nextStatus as any 
        });
        
        setShowSuccessModal(false);
        setScannedCode('');
        setCurrentOrder(null);
        navigate("/dashboard");
      } catch (error) {
        console.error('Error updating order status:', error);
        // Still navigate even if update fails, but you might want to show an error message
        setShowSuccessModal(false);
        setScannedCode('');
        setCurrentOrder(null);
        navigate("/dashboard");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = () => {
    setShowSuccessModal(false);
    setScannedCode('');
    setCurrentOrder(null);
  };

  const handleRetry = () => {
    setShowFailedModal(false);
    setScannedCode('');
    setErrorMessage('');
    setCurrentOrder(null);
    // Focus will automatically return to scanner
  };

  const handleFailedCancel = () => {
    setShowFailedModal(false);
    setScannedCode('');
    setErrorMessage('');
    setCurrentOrder(null);
  };

  return (
    <DashboardLayout showDashBoardButton={true} welcomeData={{ name: user?.name || "User", message: "Welcome to your Scanning page" }}>
      <div className="relative">
        <BarcodeScanner onScanSuccess={handleScanSuccess} />
        
        {/* Loading Overlay */}
        {isLoading && !showSuccessModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-40">
            <div className="bg-white rounded-lg p-6 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-gray-600">Fetching order information...</p>
            </div>
          </div>
        )}
      </div>
      
      <ScanSuccessModal
        isOpen={showSuccessModal}
        scannedCode={scannedCode}
        currentOrder={currentOrder}
        statusTransition={currentOrder ? getNextStatus(currentOrder.status) : null}
        isLoading={isLoading}
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
