import { DashboardLayout } from '../layouts/DashboardLayout';
import { OrderRow } from '../components/orders/OrderRow';
import { PlaceOrder } from '../components/orders/PlaceOrder';
import { SuccessScreen } from '../components/orders/SuccessScreen';
import { OrdersAPI } from '../services/ordersAPI';
import type { Order } from '../types/orders';
import { Pagination } from '../components/ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { EmptyState } from '../components/ui';

const ITEMS_PER_PAGE = 10;

interface OrdersCompProps {
  searchQuery: string;
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const OrdersComp = ({ searchQuery, orders, loading, error }: OrdersCompProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  // Filter orders based on search
  let filteredOrders = orders;
  
  if (searchQuery) {
    filteredOrders = filteredOrders.filter((order: Order) => 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  
  // If there's a search query, show all filtered results without pagination
  let currentOrders;
  let totalPages = 1;
  
  if (searchQuery) {
    currentOrders = filteredOrders;
  } else {
    totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    currentOrders = filteredOrders.slice(startIndex, endIndex);
  }

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="text-red-500 mb-4">
            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (currentOrders.length === 0) {
    return (
      <EmptyState
        title="No Orders Found"
        message={searchQuery ? "No orders match your search criteria." : "You haven't placed any orders yet. Start by creating your first order."}
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

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Table Container with horizontal scroll for mobile */}
        <div className="overflow-x-auto min-w-full">
          <div className="min-w-[800px]"> {/* Minimum width to maintain table structure */}
            {/* Column Headers */}
            <div className="grid grid-cols-6 bg-[#FFF2E0] border-b px-3 m-1.5 border-gray-200">
              <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Product name</div>
              <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Order ID</div>
              <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Quantity</div>
              <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Delivery Deadline</div>
              <div className="px-4 py-4 text-center font-semibold text-orderTextColor">Status</div>
              <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Action</div>
            </div>

            {/* Order Rows */}
            <div>
              {currentOrders.map((order) => (
                  <OrderRow
                    key={order.orderId}
                    orderId={order.orderId}
                    productName={order.productName}
                    quantity={order.quantity}
                    deliverySchedule={order.deliverySchedule}
                    status={order.status}
                    variant="orders"
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Pagination - only show when not searching */}
      {!searchQuery && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};



const Orders = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentView, setCurrentView] = useState<'orders' | 'placeOrder' | 'success'>('orders');
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders on component mount
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const fetchedOrders = await OrdersAPI.getAllOrders();
      setOrders(fetchedOrders);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orders. Please try again.');
      console.error('Error fetching orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handlePlaceOrderClick = () => {
    console.log('Place order clicked');
    setCurrentView('placeOrder');
  };

  const handleBackToOrders = () => {
    setCurrentView('orders');
  };

  const handleOrderSubmit = async (orderData: any) => {
    console.log('Order submitted:', orderData);
    
    try {
      // Create the new order via API
      const newOrder = await OrdersAPI.createOrder({
        customerName: orderData.customerName || 'Unknown Customer',
        productName: orderData.productName,
        quantity: orderData.quantity,
        sheetType: orderData.sheetType,
        deliverySchedule: orderData.deliverySchedule || new Date().toISOString().split('T')[0],
        status: 'In Production'
      });
      
      console.log('New order created:', newOrder);
      
      // Refresh the orders list
      await fetchOrders();
      
      // Show success screen
      setCurrentView('success');
    } catch (error) {
      console.error('Error creating order:', error);
      // You might want to show an error message to the user here
      alert('Failed to create order. Please try again.');
    }
  };

  const handleSuccessContinue = () => {
    setCurrentView('orders');
  };

  return (
    <DashboardLayout
      showWelcomeSearch={currentView === 'orders'}
      welcomeSearchPlaceholder="search order id"
      welcomeSearchValue={searchQuery}
      onWelcomeSearchChange={handleSearchChange}
      showPlaceOrderButton={currentView === 'orders'}
      onPlaceOrderClick={handlePlaceOrderClick}
      welcomeData={{ 
        name: "Bolarinwa", 
        message: currentView === 'orders' ? "Welcome to your order page" : 
                currentView === 'placeOrder' ? "Create a new order" : "Order Confirmation"
      }}
      dashboardBarConfig={{
        onSearchChange: handleSearchChange,
      }}
    >
      <OrdersComp 
        searchQuery={searchQuery} 
        orders={orders}
        loading={loading}
        error={error}
      />
      {currentView === 'placeOrder' && (
        <PlaceOrder 
          onBack={handleBackToOrders}
          onSubmit={handleOrderSubmit}
        />
      )}
      {currentView === 'success' && (
        <SuccessScreen 
          onContinue={handleSuccessContinue}
        />
      )}
    </DashboardLayout>
  );
};

export default Orders;
