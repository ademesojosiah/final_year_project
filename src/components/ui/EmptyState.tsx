import React from 'react';

interface EmptyStateProps {
  icon?: React.ReactNode;
  title?: string;
  message?: string;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title = 'Nothing Found',
  message = 'No action has been carried out yet',
  className = '',
}) => (
  <div className={`flex flex-col items-center justify-center flex-1 text-center ${className}`}>
    <div className="mb-6">
      <div className="w-16 h-16 flex items-center justify-center mb-4">
        {icon || (
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-gray-400">
            <rect x="3" y="8" width="18" height="4" rx="1"/>
            <path d="M12 8v13"/>
            <path d="M19 12v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-7"/>
            <path d="M7.5 8a2.5 2.5 0 0 1 0-5A2.5 2.5 0 0 1 10 5.5a2.5 2.5 0 0 1 0 5A2.5 2.5 0 0 1 7.5 8Z"/>
          </svg>
        )}
      </div>
    </div>
    <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
    <p className="text-gray-500 text-sm">{message}</p>
  </div>
);
