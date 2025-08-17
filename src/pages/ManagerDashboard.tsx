import { DashboardLayout } from '../layouts/DashboardLayout';
import DashboardWithDetails from './DashboardWithDetails';

const ManagerDashboard = () => {
  const handleSearchChange = (value: string) => {
    console.log('Search:', value);
    // Implement search functionality
  };

  const handleFilterClick = () => {
    console.log('Filter clicked');
    // Implement filter functionality
  };

  return (
    <DashboardLayout 
      welcomeData={{ name: "Josiah", message: "Welcome to your manager dashboard" }}
      showWelcome={true}
      showDashboardBar={true}
      dashboardBarConfig={{
        searchPlaceholder: "search product",
        onSearchChange: handleSearchChange,
        onFilterClick: handleFilterClick
      }}
    >
        {/* Empty State */}
        <DashboardWithDetails />
    </DashboardLayout>
  );
};

export default ManagerDashboard;
