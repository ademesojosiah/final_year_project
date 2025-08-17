import { MainWelcomeDashboardWithDetails } from '../components/dashboard/MainWelcomeDashboardWithDetails';
import { EmptyState } from '../components/ui/EmptyState';
import { mockOrders } from '../data/mockOrders';

interface DashboardWithDetailsProps {
  hasOrders?: boolean;
}

export const DashboardWithDetails: React.FC<DashboardWithDetailsProps> = ({ 
  hasOrders = true 
}) => {
  if (!hasOrders) {
    return (
      <EmptyState
        title="No Orders Found"
        message="You haven't placed any orders yet. Start by creating your first order."
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
    <MainWelcomeDashboardWithDetails 
      orders={mockOrders}
    />
  );
};

export default DashboardWithDetails;
