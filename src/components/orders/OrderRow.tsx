import { useNavigate } from 'react-router-dom';
import statusColors from '../dashboard/statusColors';

interface OrderRowProps {
  batchId?: string;
  orderId: string;
  productName?: string;
  customerName?: string;
  quantity: number;
  deliverySchedule: string;
  status: 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';
  variant?: 'orders' | 'productLog';
  onDelete?: () => void;
  onPrint?: () => void;
}

export const OrderRow = ({ 
  orderId, 
  productName,
  customerName,
  quantity, 
  deliverySchedule, 
  status,
  variant = 'orders',
  onDelete,
  onPrint
}: OrderRowProps) => {
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

  if (variant === 'productLog') {
    return (
      <div className="grid grid-cols-7 gap-4 items-center py-4 border-b border-gray-100 mx-3 pl-2">
        <div className="text-orderTextColor font-semibold">{orderId}</div>
        <div className="text-orderTextColor font-semibold">
          <span 
            className="block truncate max-w-[150px]" 
            title={productName}
          >
            {productName}
          </span>
        </div>
        <div className="text-orderTextColor font-semibold">{customerName}</div>
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
        <div className="flex items-center space-x-2">
          {/* Delete Icon */}
          <button 
            onClick={onDelete}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Delete order"
          >
            <img 
              src="/icons/material-symbols_delete-outline-rounded.png" 
              alt="Delete" 
              className="w-4 h-4"
            />
          </button>

          {/* Print Icon */}
          <button 
            onClick={onPrint}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
            title="Print order"
          >
            <img 
              src="/icons/material-symbols_print.png" 
              alt="Print" 
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>
    );
  }

  // Default orders variant
  return (
    <div className="grid grid-cols-6 gap-4 items-center py-4 border-b border-gray-100 mx-3 pl-2">
      <div className="text-orderTextColor font-semibold">
         <span 
            className="block truncate max-w-[150px]" 
            title={productName}
          >
            {productName}
          </span>
        </div>
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
