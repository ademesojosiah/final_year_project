import type { ReactNode } from 'react';
import { useState } from 'react';
import { Header } from '../components/ui/Header';
import { DashboardBar } from '../components/ui/DashboardBar';
import { FilterBar } from '../components/ui/FilterBar';
import { WelcomeSection } from '../components/ui/WelcomeSection';

interface WelcomeData {
  name: string;
  message: string;
}

interface DashboardBarConfig {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onDashboardClick?: () => void;
  onProductLogClick?: () => void;
}

interface FilterBarConfig {
  onStatusFilter?: (status: string) => void;
  onSortChange?: (sortBy: string) => void;
  onScanNewProduct?: () => void;
}

interface DashboardLayoutProps {
  children: ReactNode;
  welcomeSection?: ReactNode;
  showWelcome?: boolean;
  welcomeData?: WelcomeData;
  showWelcomeSearch?: boolean;
  welcomeSearchPlaceholder?: string;
  welcomeSearchValue?: string;
  onWelcomeSearchChange?: (value: string) => void;
  showDashBoardButton?: boolean;
  showPlaceOrderButton?: boolean;
  onPlaceOrderClick?: () => void;
  showDashboardBar?: boolean;
  showFilterBar?: boolean;
  dashboardBarConfig?: DashboardBarConfig;
  filterBarConfig?: FilterBarConfig;
}

export const DashboardLayout = ({ 
  children, 
  welcomeSection, 
  showWelcome: initialShowWelcome = true, 
  welcomeData = { name: "Bolarinwa", message: "Welcome to your order page" },
  showWelcomeSearch = false,
  welcomeSearchPlaceholder = "search order id",
  welcomeSearchValue = "",
  showDashBoardButton = false,
  showPlaceOrderButton = false,
  onPlaceOrderClick,
  showDashboardBar = false,
  showFilterBar: initialShowFilterBar = false,
  dashboardBarConfig,
  filterBarConfig
}: DashboardLayoutProps) => {
  // Internal state management for navigation
  const [activeSection, setActiveSection] = useState<'dashboard' | 'productLog'>('dashboard');
  const [showWelcome, setShowWelcome] = useState(initialShowWelcome);
  const [showFilterBar, setShowFilterBar] = useState(initialShowFilterBar);

  // Navigation handlers
  const handleDashboardClick = () => {
    setActiveSection('dashboard');
    setShowWelcome(true);
    setShowFilterBar(false);
  };

  const handleProductLogClick = () => {
    setActiveSection('productLog');
    setShowWelcome(false);
    setShowFilterBar(true);
  };

  // Combined handlers that update internal state and call external handlers
  const combinedDashboardClick = () => {
    setActiveSection('dashboard');
    setShowWelcome(true);
    setShowFilterBar(false);
    dashboardBarConfig?.onDashboardClick?.();
  };

  const combinedProductLogClick = () => {
    setActiveSection('productLog');
    setShowWelcome(false);
    setShowFilterBar(true);
    dashboardBarConfig?.onProductLogClick?.();
  };
  return (
    <div className="min-h-screen bg-[#ECECEC]">
      {/* Header */}
      <Header />

      {/* Dashboard Bar */}
      {showDashboardBar && (
        <DashboardBar 
          searchPlaceholder={dashboardBarConfig?.searchPlaceholder}
          searchValue={dashboardBarConfig?.searchValue}
          onSearchChange={dashboardBarConfig?.onSearchChange}
          activeSection={activeSection}
          onDashboardClick={dashboardBarConfig?.onDashboardClick ? combinedDashboardClick : handleDashboardClick}
          onProductLogClick={dashboardBarConfig?.onProductLogClick ? combinedProductLogClick : handleProductLogClick}
        />
      )}

      {/* Welcome Section */}
      {showWelcome && (
        <WelcomeSection
          welcomeSection={welcomeSection}
          welcomeData={welcomeData}
          showSearch={showWelcomeSearch}
          searchPlaceholder={welcomeSearchPlaceholder}
          showDashBoardButton={showDashBoardButton}
          searchValue={welcomeSearchValue}
          onSearchChange={dashboardBarConfig?.onSearchChange}
          showPlaceOrderButton={showPlaceOrderButton}
          onPlaceOrderClick={onPlaceOrderClick}
        />
      )}

      {/* Filter Bar */}
      {showFilterBar && (
        <FilterBar 
          onStatusFilter={filterBarConfig?.onStatusFilter}
          onSortChange={filterBarConfig?.onSortChange}
          onScanNewProduct={filterBarConfig?.onScanNewProduct}
        />
      )}

      {/* Main Content */}
      <main className="container mx-auto min-h-screen pt-1 pb-6 py-8 px-6">
        {children}
      </main>
    </div>
  );
};
