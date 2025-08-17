import { MainWelcomeDashboardWithDetails } from '../components/dashboard/MainWelcomeDashboardWithDetails';
import { ProductLogView } from '../components/dashboard/ProductLogView';
import { EmptyState } from '../components/ui/EmptyState';
import { mockOrders } from '../data/mockOrders';

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
  // Filter orders based on search and filters
  let filteredOrders = mockOrders;

  console.log('DashboardWithDetails - searchQuery:', searchQuery);
  console.log('DashboardWithDetails - currentView:', currentView);
  console.log('DashboardWithDetails - Total orders before filter:', mockOrders.length);

  if (searchQuery) {
    filteredOrders = filteredOrders.filter(order => 
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
    return (
      <ProductLogView 
        searchQuery={searchQuery}
        statusFilter={statusFilter}
        sortBy={sortBy}
      />
    );
  }

  return (
    <MainWelcomeDashboardWithDetails 
      orders={filteredOrders}
    />
  );
};

export default DashboardWithDetails;
