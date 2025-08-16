import React, { useState } from 'react';

type OrderStatus = 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';

interface OrderDetail {
  id: string;
  name: string;
  status: OrderStatus;
  quantity: number;
  date: string;
  orderId: string;
}

interface OrderCardProps {
  order: OrderDetail;
  statusColor: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, statusColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Order Header - Always Visible */}
      <div className="p-4">
        {/* Order ID and Toggle */}
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold text-gray-900 text-sm">
            {order.orderId}
          </span>
          <button 
            onClick={toggleExpanded}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <img 
              src={isExpanded ? "/icons/weui_arrow-outlined.png" : "/icons/weui_arrow-outlined (1).png"}
              alt={isExpanded ? "Collapse" : "Expand"}
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* Product Name */}
        <div className="mb-3">
          <p className="text-gray-700 text-sm font-medium mb-1">
            {order.name}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
            </svg>
            <span>{order.quantity} sheets</span>
          </div>
        </div>

        {/* Status Tags */}
        <div className="flex flex-wrap gap-2">
          {order.id === '123457' && (
            <span className="inline-block px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
              Delayed
            </span>
          )}
          {order.id === '123458' && (
            <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
              At risk
            </span>
          )}
          {order.status === 'Delivery' && (
            <span className="inline-block px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
              On time
            </span>
          )}
          {order.status === 'Packaging' && (
            <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
              At risk
            </span>
          )}
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {/* Time/Date Info */}
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
            </svg>
            <span>1hr: 30 min</span>
          </div>

          {/* Assignee */}
          <div className="flex items-center gap-2 mb-3">
            <div className="w-6 h-6 bg-orange-300 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium text-white">A</span>
            </div>
            <span className="text-sm text-gray-700">Amina dee</span>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: statusColor }}
            ></div>
            {order.status === 'In Production' && (
              <span className="text-xs" style={{ color: statusColor }}>
                Amina dee
              </span>
            )}
            {order.status === 'In Printing' && (
              <span className="text-xs" style={{ color: statusColor }}>
                1hr 30min
              </span>
            )}
            {order.status === 'In Binding' && (
              <span className="text-xs" style={{ color: statusColor }}>
                Amina dee
              </span>
            )}
            {order.status === 'Packaging' && (
              <span className="text-xs" style={{ color: statusColor }}>
                50 min
              </span>
            )}
            {order.status === 'Delivery' && (
              <span className="text-xs" style={{ color: statusColor }}>
                On time
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
