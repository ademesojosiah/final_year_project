import { MainWelcomeDashboardWithDetails } from '../components/dashboard/MainWelcomeDashboardWithDetails';
import { ProductLogView } from '../components/dashboard/ProductLogView';
import { EmptyState } from '../components/ui/EmptyState';
import { OrdersAPI } from '../services/ordersAPI';
import type { Order } from '../types/orders';
import { useState, useEffect } from 'react';

interface DashboardWithDetailsProps {
  hasOrders?: boolean;
  currentView?: 'dashboard' | 'productLog';
  searchQuery?: string;
  statusFilter?: string;
  sortBy?: string;
}

export const DashboardWithDetails: React.FC<DashboardWithDetailsProps> = ({ 
  hasOrders = true,
  currentView = 'dashboard',
  searchQuery = '',
  statusFilter = '',
  sortBy = ''
}) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders function
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const fetchedOrders = await OrdersAPI.getAllOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Refetch data when view changes to ensure fresh data
  useEffect(() => {
    fetchOrders();
  }, [currentView]);

  // Filter orders based on search and filters
  let filteredOrders = orders;

  console.log('DashboardWithDetails - searchQuery:', searchQuery);
  console.log('DashboardWithDetails - currentView:', currentView);
  console.log('DashboardWithDetails - Total orders before filter:', orders.length);

  if (searchQuery) {
    filteredOrders = filteredOrders.filter((order: Order) => 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('DashboardWithDetails - Orders after search filter:', filteredOrders.length);
  }

  if (statusFilter && statusFilter !== 'All products' && statusFilter !== '') {
    filteredOrders = filteredOrders.filter(order => 
      order.status.toLowerCase() === statusFilter.toLowerCase()
    );
  }

  // Sort orders
  if (sortBy && sortBy !== '') {
    filteredOrders = [...filteredOrders].sort((a, b) => {
      switch (sortBy) {
        case 'Customer name':
          return a.customerName.localeCompare(b.customerName);
        case 'Product name':
          return a.productName.localeCompare(b.productName);
        case 'Quantity':
          return b.quantity - a.quantity;
        case 'Delivery deadline':
          return new Date(a.deliverySchedule).getTime() - new Date(b.deliverySchedule).getTime();
        case 'Status':
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });
  }

  if (!hasOrders || filteredOrders.length === 0) {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-gray-600">Loading orders...</span>
        </div>
      );
    }

    return (
      <EmptyState
        title="No Orders Found"
        message={searchQuery || statusFilter ? "No orders match your search criteria." : "You haven't placed any orders yet. Start by creating your first order."}
        icon={
          <img 
            src="/icons/fluent-mdl2_product-list.png" 
            alt="No Orders" 
            className="w-8 h-8 opacity-50" 
          />
        }
      />
    );
  }

  // Render based on current view
  if (currentView === 'productLog') {
    if (loading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <span className="ml-3 text-gray-600">Loading product log...</span>
        </div>
      );
    }

    return (
      <ProductLogView 
        orders={filteredOrders}
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        sortBy={sortBy}
      />
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-3 text-gray-600">Loading dashboard...</span>
      </div>
    );
  }

  return (
    <MainWelcomeDashboardWithDetails 
      orders={filteredOrders}
    />
  );
};

export default DashboardWithDetails;
