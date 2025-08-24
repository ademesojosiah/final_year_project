import React, { useState, useEffect } from 'react';
import type { Order } from '../../types/orders';
import { OrderRow } from '../orders/OrderRow';
import { Pagination } from '../ui/Pagination';
import { OrdersAPI } from '../../services/ordersAPI';
import Barcode from 'react-barcode';

const ITEMS_PER_PAGE = 10;

interface ProductLogViewProps {
  orders: Order[]; // Accept orders as prop
  searchQuery?: string;
  statusFilter?: string;
  sortBy?: string;
  onOrdersChange?: () => void; // Callback to refresh orders after delete
}

export const ProductLogView: React.FC<ProductLogViewProps> = ({
  orders, // Now receive orders as prop
  searchQuery = '',
  statusFilter = '',
  sortBy = '',
  onOrdersChange
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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

  const handleDelete = async (orderId: string) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return;
    }

    try {
      await OrdersAPI.deleteOrder(orderId);
      
      // Call the callback to refresh orders in parent component
      if (onOrdersChange) {
        onOrdersChange();
      }
      
      console.log('Order deleted successfully:', orderId);
    } catch (error) {
      console.error('Error deleting order:', error);
      alert('Failed to delete order. Please try again.');
    }
  };

  const handlePrint = (orderId: string) => {
    const order = orders.find(o => o.orderId === orderId);
    if (order) {
      setSelectedOrder(order);
      setShowPrintModal(true);
    }
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

      {/* Print Modal */}
      {showPrintModal && selectedOrder && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={() => {
                setShowPrintModal(false);
                setSelectedOrder(null);
              }}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Receipt Content */}
            <div className="p-6">
              {/* Header */}
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">Order Receipt</h2>
                <div className="h-1 w-16 bg-primary mx-auto rounded"></div>
              </div>

              {/* Order Details */}
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Customer Name:</span>
                  <span className="text-gray-800">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Order Code:</span>
                  <span className="text-gray-800 font-mono">{selectedOrder.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Sheet Type:</span>
                  <span className="text-gray-800">{selectedOrder.sheetType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Quantity:</span>
                  <span className="text-gray-800">{selectedOrder.quantity.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Delivery Date:</span>
                  <span className="text-gray-800">{new Date(selectedOrder.deliverySchedule).toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-600">Date Issued:</span>
                  <span className="text-gray-800">
                    {selectedOrder.dateIssued ? new Date(selectedOrder.dateIssued).toLocaleDateString() : new Date().toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Barcode */}
              <div className="text-center mb-4">
                <div className="bg-white border-2 border-gray-300 rounded-lg p-3 inline-block">
                  <Barcode 
                    value={selectedOrder.orderId}
                    width={1.5}
                    height={50}
                    fontSize={10}
                    background="#ffffff"
                    lineColor="#000000"
                    displayValue={true}
                  />
                </div>
              </div>

              {/* Print Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    window.print();
                    setShowPrintModal(false);
                    setSelectedOrder(null);
                  }}
                  className="bg-primary hover:bg-primary/80 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
                >
                  Print Receipt
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductLogView;
