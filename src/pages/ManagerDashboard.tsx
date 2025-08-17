import { useState } from 'react';
import { DashboardLayout } from '../layouts/DashboardLayout';
import DashboardWithDetails from './DashboardWithDetails';

const ManagerDashboard = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'productLog'>('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterClick = () => {
    console.log('Filter clicked');
    // This could toggle a filter modal or panel
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
  };

  const handleSortChange = (sortBy: string) => {
    setSortBy(sortBy);
  };

  const handleScanNewProduct = () => {
    console.log('Scan new product clicked');
    // Implement scan functionality
  };

  const handleDashboardClick = () => {
    setCurrentView('dashboard');
    setSearchQuery(''); // Clear search when switching views
  };

  const handleProductLogClick = () => {
    setCurrentView('productLog');
    setSearchQuery(''); // Clear search when switching views
  };

  return (
    <DashboardLayout 
      welcomeData={{ name: "Josiah", message: "Welcome to your manager dashboard" }}
      showWelcome={true}
      showDashboardBar={true}
      dashboardBarConfig={{
        searchPlaceholder: currentView === 'productLog' ? "search order id" : "search product",
        searchValue: searchQuery,
        onSearchChange: handleSearchChange,
        onFilterClick: handleFilterClick,
        onDashboardClick: handleDashboardClick,
        onProductLogClick: handleProductLogClick
      }}
      filterBarConfig={{
        onStatusFilter: handleStatusFilter,
        onSortChange: handleSortChange,
        onScanNewProduct: handleScanNewProduct
      }}
    >
        {/* Dashboard Content */}
        <DashboardWithDetails 
          currentView={currentView}
          searchQuery={searchQuery}
          statusFilter={statusFilter}
          sortBy={sortBy}
        />
    </DashboardLayout>
  );
};

export default ManagerDashboard;
