import React from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { OrderContent } from '../components/orders/OrderContent';
import { BackButton } from '../components/ui/BackButton';
import { mockOrders } from '../data/mockOrders';

type OrderStatus = 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';

interface OrderDetailsProps {
  orderId?: string;
  estimatedDate?: string;
  status?: OrderStatus;
}

export const OrderDetails: React.FC<OrderDetailsProps> = ({
  orderId: propOrderId,
  estimatedDate: propEstimatedDate,
  status: propStatus,
}) => {
  const { orderId: paramOrderId } = useParams();
  
  // Use props if provided, otherwise use URL params
  const orderId = propOrderId || paramOrderId || "";
  
  // Find the order in mock data to get actual status
  const order = mockOrders.find(order => order.orderId === orderId);
  
  const estimatedDate = propEstimatedDate || order?.deliverySchedule || "July 08, 2025";
  const status = propStatus || order?.status || "In Production";

  return (
    <DashboardLayout 
      welcomeSection={<BackButton to="/orders" />}
    >
      <div className="bg-white rounded-lg shadow-sm p-8">
        <OrderContent
          orderId={orderId}
          estimatedDate={estimatedDate}
          status={status}
          sheetType={order?.sheetType}
        />
      </div>
    </DashboardLayout>
  );
};
