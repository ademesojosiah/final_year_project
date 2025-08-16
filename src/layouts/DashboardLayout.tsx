import type { ReactNode } from 'react';
import { Header } from '../components/ui/Header';
import { DashboardBar } from '../components/ui/DashboardBar';

interface WelcomeData {
  name: string;
  message: string;
}

interface DashboardBarConfig {
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  onFilterClick?: () => void;
}

interface DashboardLayoutProps {
  children: ReactNode;
  welcomeSection?: ReactNode;
  showWelcome?: boolean;
  welcomeData?: WelcomeData;
  showDashboardBar?: boolean;
  dashboardBarConfig?: DashboardBarConfig;
}

export const DashboardLayout = ({ 
  children, 
  welcomeSection, 
  showWelcome = true, 
  welcomeData = { name: "Bolarinwa", message: "Welcome to your order page" },
  showDashboardBar = false,
  dashboardBarConfig
}: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#ECECEC]">
      {/* Header */}
      <Header />

      {/* Dashboard Bar */}
      {showDashboardBar && (
        <DashboardBar 
          searchPlaceholder={dashboardBarConfig?.searchPlaceholder}
          onSearchChange={dashboardBarConfig?.onSearchChange}
          onFilterClick={dashboardBarConfig?.onFilterClick}
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

      {/* Main Content */}
      <main className="container mx-auto min-h-screen pt-1 pb-6 py-8 px-6">
        {children}
      </main>
    </div>
  );
};
