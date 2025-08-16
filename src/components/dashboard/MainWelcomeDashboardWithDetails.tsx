import React from 'react';
import statusColors from './statusColors';
import { OrderCard } from './OrderCard';

type OrderStatus = 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';

interface OrderDetail {
  id: string;
  name: string;
  status: OrderStatus;
  quantity: number;
  date: string;
  orderId: string;
}

interface MainWelcomeDashboardWithDetailsProps {
  orders: OrderDetail[];
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
  }, {} as Record<OrderStatus, OrderDetail[]>);

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
              <div className="mt-12 py-[16px] px-[8px] flex flex-col gap-3 flex-1 overflow-y-auto border-1 border-gray-100 bg-[#FFFDF9] rounded-2xl">
                {columnOrders.map((order) => (
                  <OrderCard 
                    key={order.id}
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
