import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ProgressBar } from './ProgressBar';
import statusColors from '../dashboard/statusColors';
import type { SheetType } from '../../types/orders';

type OrderStatus = 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';

// Interface for real-time order update events from backend
interface OrderUpdateEvent {
  orderId: string;           // The order ID being updated
  status: OrderStatus;       // New status of the order  
  estimatedDate?: string;    // Optional: Updated estimated completion date
  timestamp: string;         // ISO timestamp of when update occurred
  message?: string;          // Optional: Custom message to display to user
}

interface OrderContentProps {
  orderId: string;
  estimatedDate: string;
  status: OrderStatus;
  sheetType?: SheetType;
}

const getStatusColor = (status: OrderStatus) => {
  const color = statusColors[status as keyof typeof statusColors];
  const bgColor = color + '20'; // Add transparency for background
  
  return {
    color: color,
    backgroundColor: bgColor,
  };
};

export const OrderContent: React.FC<OrderContentProps> = ({
  orderId,
  estimatedDate: initialEstimatedDate,
  status: initialStatus,
  sheetType,
}) => {
  // State for real-time updates
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(initialStatus);
  const [currentEstimatedDate, setCurrentEstimatedDate] = useState(initialEstimatedDate);
  const [updateMessage, setUpdateMessage] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  // Setup Socket.IO connection and listen for order updates
  useEffect(() => {
    // Connect to Socket.IO server
    const socket = io('http://localhost:3000');

    // Handle connection
    socket.on('connect', () => {
      console.log('✅ Connected to Socket.IO server:', socket.id);
      setIsConnected(true);
      
      // Subscribe to this specific order's updates
      socket.emit('subscribe', { orderId });
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket.IO connection failed:', error);
      setIsConnected(false);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Disconnected from Socket.IO server');
      setIsConnected(false);
    });

    // Listen for order-specific updates
    socket.on(`${orderId}/update`, (updateEvent: OrderUpdateEvent) => {
      console.log('📦 Real-time order update received:', updateEvent);
      
      // Validate that this update is for the current order
      if (updateEvent.orderId === orderId) {
        setIsUpdating(true);
        
        // Update with smooth animation
        setTimeout(() => {
          setCurrentStatus(updateEvent.status);
          
          if (updateEvent.estimatedDate) {
            setCurrentEstimatedDate(updateEvent.estimatedDate);
          }
          
          if (updateEvent.message) {
            setUpdateMessage(updateEvent.message);
          }
          
          setIsUpdating(false);
          
          // Clear update message after 5 seconds
          setTimeout(() => setUpdateMessage(''), 5000);
        }, 300);
      }
    });

    // Cleanup on component unmount
    return () => {
      console.log('🔌 Closing Socket.IO connection');
      socket.disconnect();
    };
  }, [orderId]);

  const statusStyle = getStatusColor(currentStatus);
  const iconColor = statusColors[currentStatus as keyof typeof statusColors];

  return (
    <div className="flex flex-col items-center text-center mb-12">
      {/* Order ID */}
      <h1 className="text-2xl font-semibold mb-4">{orderId}</h1>
      
      {/* Connection Status Indicator */}
      <div className="mb-4">
        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${
          isConnected 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isConnected ? 'bg-green-500' : 'bg-yellow-500'
          }`}></div>
          {isConnected ? 'Live updates enabled' : 'Live updates unavailable'}
        </div>
      </div>
      
      {/* Sheet Type */}
      {sheetType && (
        <div className="mb-6">
          <span className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
            {sheetType}
          </span>
        </div>
      )}

      {/* Real-time Update Notification */}
      {updateMessage && (
        <div className="mb-4 px-4 py-2 bg-green-100 text-green-800 rounded-lg text-sm animate-fade-in">
          📦 {updateMessage}
        </div>
      )}

      {/* Order Icon with Update Animation */}
      <div 
        className={`w-24 h-24 rounded-full flex items-center justify-center mb-8 transition-all duration-500 ${
          isUpdating ? 'scale-110 shadow-lg' : ''
        }`}
        style={{ backgroundColor: iconColor + '20' }}
      >
        <svg 
          className={`w-12 h-12 transition-transform duration-500 ${isUpdating ? 'rotate-12' : ''}`}
          viewBox="0 0 24 24" 
          fill="none"
          style={{ color: iconColor }}
        >
          <path
            d="M12 8V12L14 14M12 3C7.03 3 3 7.03 3 12C3 16.97 7.03 21 12 21C16.97 21 21 16.97 21 12C21 7.03 16.97 3 12 3Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Order Message */}
      <p className="text-gray-600 max-w-lg mb-4">
        Your order has been successfully placed and its been processed. Be rest assured our team are working on it to give you satisfactory result.
      </p>

      {/* Estimated Completion Date */}
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">
          Estimated completion date: {currentEstimatedDate}
        </h3>
        <span 
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-500 ${
            isUpdating ? 'scale-105 shadow-md' : ''
          }`}
          style={statusStyle}
        >
          {currentStatus}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-12">
        <ProgressBar currentStatus={currentStatus} />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.36 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.63 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16ZM16 17H8V11C8 8.52 9.51 6.5 12 6.5C14.49 6.5 16 8.52 16 11V17Z" fill="currentColor"/>
          </svg>
          Notify me when its ready
        </button>
        <button className="border border-gray-200 px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-gray-50">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 3.5L18 2L16.5 3.5L15 2L13.5 3.5L12 2L10.5 3.5L9 2L7.5 3.5L6 2V22L7.5 20.5L9 22L10.5 20.5L12 22L13.5 20.5L15 22L16.5 20.5L18 22L19.5 20.5L21 22V2L19.5 3.5ZM19 19.09H5V4.91H19V19.09ZM7 15H17V17H7V15ZM7 11H17V13H7V11ZM7 7H17V9H7V7Z" fill="currentColor"/>
          </svg>
          View my receipt
        </button>
      </div>
    </div>
  );
};
