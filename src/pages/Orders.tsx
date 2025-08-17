import { DashboardLayout } from '../layouts/DashboardLayout';
import { OrderRow } from '../components/orders/OrderRow';
import { mockOrders } from '../data/mockOrders';
import { NotFound } from '../components/ui/NotFound';
import { Pagination } from '../components/ui/Pagination';
import { useSearchParams } from 'react-router-dom';

const ITEMS_PER_PAGE = 10;

const OrdersComp = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(mockOrders.length / ITEMS_PER_PAGE);
  
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentOrders = mockOrders.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  if (mockOrders.length === 0) {
    return <NotFound />;
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
              {currentOrders.length > 0 ? (
                currentOrders.map((order) => (
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
                ))
              ) : (
                <NotFound />
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};



const Orders = () => {
  return (
    <DashboardLayout>
      <OrdersComp />
    </DashboardLayout>
  );
};

export default Orders;
