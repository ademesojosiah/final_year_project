import React from 'react';
import { ProgressBar } from './ProgressBar';

type OrderStatus = 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';

interface OrderContentProps {
  orderId: string;
  estimatedDate: string;
  status: OrderStatus;
}

const getStatusColor = (status: OrderStatus) => {
  switch (status) {
    case 'In Production':
      return 'bg-indigo-50 text-indigo-600';
    case 'In Printing':
      return 'bg-pink-50 text-pink-600';
    case 'In Binding':
      return 'bg-rose-50 text-rose-600';
    case 'Packaging':
      return 'bg-amber-50 text-amber-600';
    case 'Delivery':
      return 'bg-green-50 text-green-600';
    default:
      return 'bg-gray-50 text-gray-600';
  }
};

export const OrderContent: React.FC<OrderContentProps> = ({
  orderId,
  estimatedDate,
  status,
}) => {
  const statusColorClass = getStatusColor(status);

  return (
    <div className="flex flex-col items-center text-center mb-12">
      {/* Order ID */}
      <h1 className="text-2xl font-semibold mb-8">ORD-{orderId}</h1>

      {/* Order Icon */}
      <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-8">
        <svg className="w-12 h-12 text-primary" viewBox="0 0 24 24" fill="none">
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
          Estimated completion date: {estimatedDate}
        </h3>
        <span className={`px-4 py-2 rounded-full text-sm font-medium ${statusColorClass}`}>
          {status}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full mb-12">
        <ProgressBar currentStatus={status} />
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
