import type { ReactNode } from 'react';
import { useState } from 'react';
import { Header } from '../components/ui/Header';
import { DashboardBar } from '../components/ui/DashboardBar';
import { FilterBar } from '../components/ui/FilterBar';

interface WelcomeData {
  name: string;
  message: string;
}

interface DashboardBarConfig {
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
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
          onFilterClick={dashboardBarConfig?.onFilterClick}
          activeSection={activeSection}
          onDashboardClick={dashboardBarConfig?.onDashboardClick ? combinedDashboardClick : handleDashboardClick}
          onProductLogClick={dashboardBarConfig?.onProductLogClick ? combinedProductLogClick : handleProductLogClick}
        />
      )}

      {/* Welcome Section */}
      {showWelcome && (
        <div className=" pl-14 pr-6 pt-8 pb-4">
          <div className="container mx-auto">
            {welcomeSection ? (
              welcomeSection
            ) : (
              <div className="text-left ">
                <h2 className="text-[32px] font-semibold text-[#2D1B00] mb-2">Hello {welcomeData.name}!</h2>
                <p className="text-lg text-[#6B5B5B] font-light">{welcomeData.message}</p>
              </div>
            )}
          </div>
        </div>
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
