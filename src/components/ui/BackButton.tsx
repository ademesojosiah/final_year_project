import { useNavigate } from 'react-router-dom';

interface BackButtonProps {
  label?: string;
  to?: string;
}

export const BackButton: React.FC<BackButtonProps> = ({ 
  label = "Back to Orders", 
  to 
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) {
      navigate(to);
    } else {
      navigate(-1);
    }
  };

  return (
    <button
      onClick={handleBack}
      className="flex items-center gap-2 text-orderTextColor hover:text-gray-900 transition-colors group"
    >
      <svg 
        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M15 19l-7-7 7-7" 
        />
      </svg>
      <span className="text-lg font-medium">{label}</span>
    </button>
  );
};
