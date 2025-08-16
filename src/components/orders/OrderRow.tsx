import { useNavigate } from 'react-router-dom';
import statusColors from '../dashboard/statusColors';

interface OrderRowProps {
  batchId: string;
  orderId: string;
  quantity: number;
  deliverySchedule: string;
  status: 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';
}

export const OrderRow = ({ batchId, orderId, quantity, deliverySchedule, status }: OrderRowProps) => {
  const navigate = useNavigate();
  
  // Function to get status color using standardized colors
  const getStatusColor = (status: string) => {
    const color = statusColors[status as keyof typeof statusColors];
    const bgColor = color + '20'; // Add transparency for background
    
    return {
      color: color,
      backgroundColor: bgColor,
    };
  };

  const statusStyle = getStatusColor(status);

  return (
    <div className="grid grid-cols-6 gap-4 items-center py-4 border-b border-gray-100 mx-3">
      <div className="text-orderTextColor font-semibold">{batchId}</div>
      <div className="text-orderTextColor font-semibold">{orderId}</div>
      <div className="text-orderTextColor font-semibold">{quantity}</div>
      <div className="text-orderTextColor font-semibold">{deliverySchedule}</div>
      <div className="flex justify-start">
        <p 
          className="font-bold px-4 py-5 rounded-2xl text-sm w-[160px] text-center"
          style={statusStyle}
        >
          {status}
        </p>
      </div>
      <div>
        <button 
          onClick={() => navigate(`/orders/${orderId}`)}
          className="text-orderTextColor hover:bg-orderTextColor hover:text-[#FFF2E0] font-medium outline-2 px-10 py-2 rounded-[20px]"
        >
          View
        </button>
      </div>
    </div>
  );
};
