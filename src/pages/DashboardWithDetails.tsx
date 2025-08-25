import { MainWelcomeDashboardWithDetails } from '../components/dashboard/MainWelcomeDashboardWithDetails';
import { ProductLogView } from '../components/dashboard/ProductLogView';
import { EmptyState } from '../components/ui/EmptyState';
import { OrdersAPI } from '../services/ordersAPI';
import type { Order } from '../types/orders';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

type OrderStatus = 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';

// Interface for order created events
interface OrderCreatedEvent {
  orderId: string;
  customerName: string;
  productName: string;
  quantity: number;
  sheetType: string;
  status: string;
  dateIssued: string;
  estimatedDate: string;
  timestamp: string;
  message: string;
}

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
  const [isConnected, setIsConnected] = useState(false);

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

  // Setup Socket.IO connection for real-time order updates
  useEffect(() => {
    const socket = io('https://final-year-project-backend-ubk7.onrender.com');

    // Handle connection
    socket.on('connect', () => {
      console.log('✅ Manager Dashboard connected to Socket.IO:', socket.id);
      setIsConnected(true);
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Manager Dashboard Socket.IO connection failed:', error);
      setIsConnected(false);
    });

    socket.on('disconnect', () => {
      console.log('🔌 Manager Dashboard disconnected from Socket.IO');
      setIsConnected(false);
    });

    // Listen for new order creation events
    socket.on('orderCreated', (orderEvent: OrderCreatedEvent) => {
      console.log('🆕 New order created:', orderEvent);
      
      // Add the new order to the orders list
      const newOrder: Order = {
        batchId: Date.now().toString(), // Generate a batch ID
        orderId: orderEvent.orderId,
        customerName: orderEvent.customerName,
        productName: orderEvent.productName,
        quantity: orderEvent.quantity,
        sheetType: orderEvent.sheetType as any,
        deliverySchedule: orderEvent.estimatedDate,
        status: orderEvent.status as any,
        dateIssued: orderEvent.dateIssued
      };
      
      setOrders(prevOrders => [newOrder, ...prevOrders]);
    });

    // Listen for order updates
    socket.on('order-updated', (updateEvent: any) => {
      console.log('📦 Order update received on manager dashboard:', updateEvent);
      
      // Update the specific order in the orders list
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.orderId === updateEvent.orderId 
            ? { 
                ...order, 
                status: updateEvent.status as any,
                ...(updateEvent.estimatedDate && { deliverySchedule: updateEvent.estimatedDate })
              }
            : order
        )
      );
    });

    // Cleanup on component unmount
    return () => {
      console.log('🔌 Closing Socket.IO connection on manager dashboard');
      socket.disconnect();
    };
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
        onOrdersChange={fetchOrders}
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

  // Handle order updates from drag and drop
  const handleOrderUpdate = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.orderId === orderId 
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  return (
    <div>
      {/* Real-time Connection Status */}
      <div className="mb-4 flex items-center justify-between">
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
        
        {isConnected && (
          <div className="text-xs text-gray-600 bg-blue-50 px-3 py-1 rounded-lg">
            💡 Drag orders backward to previous status
          </div>
        )}
      </div>
      
      <MainWelcomeDashboardWithDetails 
        orders={filteredOrders}
        onOrderUpdate={handleOrderUpdate}
      />
    </div>
  );
};

export default DashboardWithDetails;
