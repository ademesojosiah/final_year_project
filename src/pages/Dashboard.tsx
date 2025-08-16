import { useNavigate } from 'react-router-dom';
import { DashboardLayout } from '../layouts/DashboardLayout';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleScanClick = () => {
    navigate('/scanner');
  };

  return (
    <DashboardLayout 
      welcomeData={{ 
        name: "Bolarinwa", 
        message: "Welcome to your order page" 
      }}
    >
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        {/* Empty State Illustration */}
        <div className="mb-8">
          <svg
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gray-300"
          >
            {/* Package/Order Icon */}
            <rect
              x="30"
              y="40"
              width="60"
              height="45"
              rx="4"
              fill="currentColor"
              fillOpacity="0.2"
              stroke="currentColor"
              strokeWidth="2"
            />
            {/* Package tape lines */}
            <line x1="30" y1="55" x2="90" y2="55" stroke="currentColor" strokeWidth="1.5" />
            <line x1="60" y1="40" x2="60" y2="85" stroke="currentColor" strokeWidth="1.5" />
            {/* Document/order lines */}
            <rect x="40" y="25" width="40" height="30" rx="2" fill="white" stroke="currentColor" strokeWidth="1.5" />
            <line x1="45" y1="32" x2="75" y2="32" stroke="currentColor" strokeWidth="1" />
            <line x1="45" y1="37" x2="70" y2="37" stroke="currentColor" strokeWidth="1" />
            <line x1="45" y1="42" x2="65" y2="42" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Content */}
        <div className="max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            You have no order yet
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed">
            your orders appears here, or click on the button to enter a custom order
          </p>
          
          {/* Scan Button */}
          <button
            onClick={handleScanClick}
            className="bg-[#F4C724] text-gray-900 px-8 py-3 rounded-lg hover:bg-[#F4C724]/90 transition-colors font-semibold text-lg flex items-center gap-2 mx-auto"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M3 7V5a2 2 0 0 1 2-2h2"/>
              <path d="M17 3h2a2 2 0 0 1 2 2v2"/>
              <path d="M21 17v2a2 2 0 0 1-2 2h-2"/>
              <path d="M7 21H5a2 2 0 0 1-2-2v-2"/>
              <path d="M8 12h8"/>
            </svg>
            Scan
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
