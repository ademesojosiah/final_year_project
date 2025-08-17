import React, { useState } from 'react';

type OrderStatus = 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';

interface Order {
  batchId: string;
  orderId: string;
  customerName: string;
  productName: string;
  quantity: number;
  deliverySchedule: string;
  status: OrderStatus;
}

interface OrderCardProps {
  order: Order;
  statusColor: string;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, statusColor }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Function to determine delivery status based on delivery date
  const getDeliveryStatus = () => {
    const today = new Date();
    const deliveryDate = new Date(order.deliverySchedule);
    const timeDiff = deliveryDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysDiff < -1) {
      return { status: 'delayed', label: 'Delayed', bgColor: 'bg-red-100', textColor: 'text-red-700' };
    } else if (daysDiff === -1 || daysDiff === 0) {
      return { status: 'at-risk', label: 'At risk', bgColor: 'bg-yellow-100', textColor: 'text-yellow-700' };
    } else {
      return { status: 'on-time', label: 'On time', bgColor: 'bg-green-100', textColor: 'text-green-700' };
    }
  };

  const deliveryStatus = getDeliveryStatus();

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      {/* Order Header - Always Visible */}
      <div className={"px-3 py-2"}>
        {/* Order ID and Toggle */}
        <div className={`flex items-center justify-between ${isExpanded ? ' pb-2 border-b border-gray-200' : ''}`}>
          <span className="font-semibold text-gray-900 text-sm">
            {order.orderId}
          </span>
          <button 
            onClick={toggleExpanded}
            className="text-gray-400 hover:text-gray-900 p-1"
          >
            <img 
              src={isExpanded ? "/icons/weui_arrow-outlined_down.png" : "/icons/weui_arrow-outlined (1).png"}
              alt={isExpanded ? "Collapse" : "Expand"}
              className={isExpanded ? "h-3 object-contain" : "h-6 object-contain"}
            />
          </button>
        </div>

        {/* Expanded Content - Only show when expanded */}
        {isExpanded && (
          <div className="flex flex-col space-y-3 py-2 px-1 items-start mt-2">
            {/* Product Name */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-xs font-medium">
                {order.productName}
              </span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-2">
              <img 
                src="/icons/icon-park-outline_upload-logs.png" 
                alt="Quantity" 
                className="w-4 h-4"
              />
              <span className="text-gray-600 text-xs">
                {order.quantity} sheets
              </span>
            </div>

            {/* Delivery Date */}
            <div className="flex items-center gap-2">
              <img 
                src="/icons/game-icons_sands-of-time.png" 
                alt="Delivery" 
                className="w-4 h-4"
              />
              <span className="text-gray-600 text-xs">
                {order.deliverySchedule}
              </span>
            </div>

            {/* Customer Name */}
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-300 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-white">
                  {order.customerName.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="text-gray-700 text-xs">
                {order.customerName}
              </span>
            </div>

            {/* Delivery Status Button */}
            <div className="mt-1">
              <span className={`inline-block px-3 py-1 text-xs rounded-full ${deliveryStatus.bgColor} ${deliveryStatus.textColor}`}>
                {deliveryStatus.label}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
