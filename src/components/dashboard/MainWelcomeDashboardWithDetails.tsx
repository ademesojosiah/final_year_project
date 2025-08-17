import React from 'react';
import statusColors from './statusColors';
import { OrderCard } from './OrderCard';

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

interface MainWelcomeDashboardWithDetailsProps {
  orders: Order[];
}

export const MainWelcomeDashboardWithDetails: React.FC<MainWelcomeDashboardWithDetailsProps> = ({
  orders,
}) => {
  // Group orders by status
  const groupedOrders = orders.reduce((acc, order) => {
    const status = order.status;
    if (!acc[status]) {
      acc[status] = [];
    }
    acc[status].push(order);
    return acc;
  }, {} as Record<OrderStatus, Order[]>);

  const statusColumns: { status: OrderStatus; label: string; icon: string }[] = [
    { status: 'In Production', label: 'In production', icon: '●' },
    { status: 'In Printing', label: 'Printing', icon: '●' },
    { status: 'In Binding', label: 'Binding', icon: '●' },
    { status: 'Packaging', label: 'Packaging', icon: '●' },
    { status: 'Delivery', label: 'Ready for delivery', icon: '●' },
  ];

  return (
    <div className="w-full h-full bg-white shadow-lg rounded-2xl flex flex-col p-6">
      {/* Status Columns */}
      <div className="grid grid-cols-5 gap-4 h-full mt-2">
        {statusColumns.map((column) => {
          const columnOrders = groupedOrders[column.status] || [];
          const statusColor = statusColors[column.status];
          
          return (
            <div key={column.status} className="flex flex-col h-full">
              {/* Column Header */}
              <div 
                className="rounded-lg p-3 mb-4 font-medium text-sm border-2"
                style={{ borderColor: statusColor }}
              >
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: statusColor }}
                  ></div>
                  <span className="text-black">{column.label}</span>
                </div>
                <div className="text-xs mt-1 text-gray-600">
                  {columnOrders.length} products
                </div>
              </div>

              {/* Order Cards */}
              <div 
                className="flex flex-col gap-3 flex-1 min-h-0 overflow-y-auto py-4 px-2 bg-[#FFFDF9] rounded-2xl border"
                style={{ borderColor: `${statusColor}50` }}
              >
                {columnOrders.map((order) => (
                  <OrderCard 
                    key={order.batchId}
                    order={order}
                    statusColor={statusColor}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
