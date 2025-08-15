import type { ReactNode } from 'react';
import { Header } from '../components/ui/Header';

interface DashboardLayoutProps {
  children: ReactNode;
  welcomeSection?: ReactNode;
}

export const DashboardLayout = ({ children, welcomeSection }: DashboardLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#FDFCFA]">
      {/* Header */}
      <Header />

      {/* Welcome Section */}
      {welcomeSection ? (
        <div className="container px-6 pt-6 pb">
          {welcomeSection}
        </div>
      ) : (
        <div className="container px-6 pt-6 pb">
          <h2 className="text-3xl font-semibold text-[#000000]-900">Hello Bolarinwa!</h2>
          <p className="mt-1 text-[#000000]-600">Welcome to your order page</p>
        </div>
      )}

      {/* Main Content */}
                    <main className="container mx-auto pt-5 pb-6 py-8 px-6">
        {children}
      </main>
    </div>
  );
};
