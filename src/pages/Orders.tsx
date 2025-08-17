import { DashboardLayout } from '../layouts/DashboardLayout';
import { OrderRow } from '../components/orders/OrderRow';
import { mockOrders } from '../data/mockOrders';
import { Pagination } from '../components/ui/Pagination';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { EmptyState } from '../components/ui';

const ITEMS_PER_PAGE = 10;

interface OrdersCompProps {
  searchQuery: string;
}

const OrdersComp = ({ searchQuery }: OrdersCompProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  
  // Filter orders based on search
  let filteredOrders = mockOrders;
  
  if (searchQuery) {
    filteredOrders = filteredOrders.filter(order => 
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
                    batchId={order.batchId}
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

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <DashboardLayout
      showWelcomeSearch={true}
      welcomeSearchPlaceholder="search order id"
      welcomeSearchValue={searchQuery}
      dashboardBarConfig={{
        onSearchChange: handleSearchChange,
      }}
    >
      <OrdersComp searchQuery={searchQuery} />
    </DashboardLayout>
  );
};

export default Orders;
