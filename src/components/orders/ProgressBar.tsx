import React from 'react';

type OrderStatus = 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';

interface ProgressBarProps {
  currentStatus: OrderStatus;
}

const stages = [
  { 
    label: 'Production', 
    shortLabel: 'Prod',
    color: '#6366F1',
    icon: '⚡'
  },
  { 
    label: 'In Print', 
    shortLabel: 'Print',
    color: '#8B5CF6',
    icon: '🖨️'
  },
  { 
    label: 'Binding', 
    shortLabel: 'Bind',
    color: '#EC4899',
    icon: '📚'
  },
  { 
    label: 'Packaging', 
    shortLabel: 'Pack',
    color: '#F59E0B',
    icon: '📦'
  },
  { 
    label: 'Delivery', 
    shortLabel: 'Ready',
    color: '#10B981',
    icon: '🚚'
  }
];

export const ProgressBar: React.FC<ProgressBarProps> = ({ currentStatus }) => {
  const getCurrentStep = () => {
    switch (currentStatus) {
      case 'In Production':
        return 0;
      case 'In Printing':
        return 1;
      case 'In Binding':
        return 2;
      case 'Packaging':
        return 3;
      case 'Delivery':
        return 4;
      default:
        return 0;
    }
  };

  const currentStep = getCurrentStep();
  const progressPercentage = (currentStep / (stages.length - 1)) * 100;

  return (
    <div className="w-full py-8">
      {/* Progress Track */}
      <div className="relative mb-8">
        {/* Background Track */}
        <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
          {/* Animated Progress Fill */}
          <div 
            className="h-full  bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-1000 ease-out relative"
            style={{ 
              width: `${progressPercentage}%`,
              background: `linear-gradient(90deg, ${stages.slice(0, currentStep + 1).map(stage => stage.color).join(', ')})`
            }}
          >
            {/* Glowing effect at the end */}
            <div 
              className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 rounded-full opacity-75 animate-pulse"
              style={{ 
                backgroundColor: stages[currentStep]?.color || '#6366F1',
                boxShadow: `0 0 12px ${stages[currentStep]?.color || '#6366F1'}66`
              }}
            />
          </div>
        </div>

        {/* Stage Indicators */}
        <div className="absolute inset-0 flex justify-between items-center -mt-1 top-3">
          {stages.map((stage, index) => {
            const isCompleted = index < currentStep;
            const isCurrent = index === currentStep;
            const isPending = index > currentStep;

            return (
              <div key={stage.label} className="relative flex flex-col items-center gap-5 min-h-24">
                {/* Circle Indicator */}
                <div className="relative">
                  <div 
                    className={`w-6 h-6 rounded-full border-2 transition-all duration-500 flex items-center justify-center text-xs ${
                      isCompleted 
                        ? 'border-white bg-white shadow-lg' 
                        : isCurrent 
                        ? 'border-white bg-white shadow-lg animate-pulse' 
                        : 'border-gray-300 bg-white'
                    }`}
                    style={{
                      borderColor: isCompleted || isCurrent ? stage.color : '#D1D5DB',
                      color: isCompleted || isCurrent ? stage.color : '#9CA3AF'
                    }}
                  >
                    {/* Checkmark for completed */}
                    {isCompleted && (
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                    {/* Current step indicator */}
                    {isCurrent && (
                      <div 
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: stage.color }}
                      />
                    )}
                    {/* Future step number */}
                    {isPending && (
                      <span className="text-xs font-medium text-gray-400">
                        {index + 1}
                      </span>
                    )}
                  </div>

                  {/* Pulsing ring for current step */}
                  {isCurrent && (
                    <div 
                      className="absolute inset-0 rounded-full animate-ping opacity-20"
                      style={{ 
                        backgroundColor: stage.color,
                        transform: 'scale(1.5)'
                      }}
                    />
                  )}
                </div>

                {/* Stage Label */}
                <div className="mt-3 text-center">
                  <div className={`text-sm font-medium transition-colors duration-300 ${
                    isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'
                  }`}>
                    {stage.label}
                  </div>
                  {isCurrent && (
                    <div 
                      className="text-xs font-medium mt-1 px-2 py-1 rounded-full"
                      style={{ 
                        backgroundColor: `${stage.color}15`,
                        color: stage.color
                      }}
                    >
                      In Progress
                    </div>
                  )}
                  {isCompleted && (
                    <div className="text-xs text-green-600 font-medium mt-1">
                      ✓ Complete
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Progress Summary */}
      <div className="text-center mt-24">
        <div className="text-lg font-semibold text-gray-900 mb-1">
          {stages[currentStep]?.label || 'Getting Started'}
        </div>
        <div className="text-sm text-gray-500">
          Step {currentStep + 1} of {stages.length} • {Math.round(progressPercentage)}% Complete
        </div>
      </div>
    </div>
  );
};
