import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { OrderContent } from '../components/orders/OrderContent';
import { BackButton } from '../components/ui/BackButton';
import { OrdersAPI } from '../services/ordersAPI';
import type { Order } from '../types/orders';

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
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Use props if provided, otherwise use URL params
  const orderId = propOrderId || paramOrderId || "";

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;
      
      try {
        setLoading(true);
        const fetchedOrder = await OrdersAPI.getOrderById(orderId);
        setOrder(fetchedOrder);
        setError(null);
      } catch (err) {
        setError('Failed to fetch order details. Please try again.');
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);
  
  const estimatedDate = propEstimatedDate || order?.deliverySchedule || "July 08, 2025";
  const status = propStatus || order?.status || "In Production";

  // Show loading state
  if (loading) {
    return (
      <DashboardLayout welcomeSection={<BackButton to="/orders" />}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading order details...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  // Show error state
  if (error || (!order && !loading)) {
    return (
      <DashboardLayout welcomeSection={<BackButton to="/orders" />}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-red-600 mb-4">{error || 'Order not found'}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

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
          customerName={order?.customerName}
          productName={order?.productName}
          quantity={order?.quantity}
          dateIssued={order?.dateIssued}
        />
      </div>
    </DashboardLayout>
  );
};
