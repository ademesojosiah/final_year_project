import React, { useState, useEffect } from 'react';
import type { Order } from '../../types/orders';
import { OrderRow } from '../orders/OrderRow';
import { Pagination } from '../ui/Pagination';

const ITEMS_PER_PAGE = 10;

interface ProductLogViewProps {
  orders: Order[]; // Accept orders as prop
  searchQuery?: string;
  statusFilter?: string;
  sortBy?: string;
}

export const ProductLogView: React.FC<ProductLogViewProps> = ({
  orders, // Now receive orders as prop
  searchQuery = '',
  statusFilter = '',
  sortBy = ''
}) => {
  const [currentPage, setCurrentPage] = useState(1);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortBy]);
  
  // Filter and sort orders based on props (already filtered in parent, but could be used for additional filtering)
  let filteredOrders = orders;

  console.log('ProductLogView - searchQuery:', searchQuery);
  console.log('ProductLogView - Total orders before filter:', orders.length);

  if (searchQuery) {
    filteredOrders = filteredOrders.filter((order: Order) => 
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.batchId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.orderId.toLowerCase().includes(searchQuery.toLowerCase())
    );
    console.log('ProductLogView - Orders after search filter:', filteredOrders.length);
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

  // Pagination logic
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, sortBy]);

  const handleDelete = (orderId: string) => {
    console.log('Delete order:', orderId);
    // TODO: Implement delete functionality
  };

  const handlePrint = (orderId: string) => {
    console.log('Print order:', orderId);
    // TODO: Implement print functionality
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Table Container with horizontal scroll for mobile */}
      <div className="overflow-x-auto min-w-full">
        <div className="min-w-[800px]"> {/* Minimum width to maintain table structure */}
          {/* Column Headers */}
          <div className="grid grid-cols-7 bg-[#FFF2E0] border-b px-3 m-1.5 border-gray-200">
            <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Order ID</div>
            <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Product name</div>
            <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Customer name</div>
            <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Quantity</div>
            <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Delivery deadline</div>
            <div className="px-4 py-4 text-center font-semibold text-orderTextColor">Status</div>
            <div className="px-4 py-4 text-left font-semibold text-orderTextColor">Action</div>
          </div>

          {/* Order Rows */}
          <div>
            {currentOrders.length > 0 ? (
              currentOrders.map((order) => (
                <OrderRow
                  key={order.orderId}
                  orderId={order.orderId}
                  productName={order.productName}
                  customerName={order.customerName}
                  quantity={order.quantity}
                  deliverySchedule={order.deliverySchedule}
                  status={order.status}
                  variant="productLog"
                  onDelete={() => handleDelete(order.orderId)}
                  onPrint={() => handlePrint(order.orderId)}
                />
              ))
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-500 text-sm">
                  {searchQuery || statusFilter ? 'No orders match your filters' : 'No orders found'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && totalPages > 1 && (
        <div className="px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredOrders.length)} of {filteredOrders.length} orders
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductLogView;
