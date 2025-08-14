import { useNavigate } from 'react-router-dom';

interface OrderRowProps {
  batchId: string;
  orderId: string;
  quantity: number;
  deliverySchedule: string;
  status: 'In Production' | 'In Printing' | 'In Binding' | 'Packaging' | 'Delivery';
}

export const OrderRow = ({ batchId, orderId, quantity, deliverySchedule, status }: OrderRowProps) => {
  const navigate = useNavigate();
  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'In Production':
        return 'text-indigo-600 font-bold bg-indigo-50 px-4 py-5 rounded-2xl text-sm  w-[160px] text-center';
      case 'In Printing':
        return 'text-pink-600 font-bold bg-pink-50 px-4 py-5 rounded-2xl text-sm  w-[160px] text-center';
      case 'In Binding':
        return 'text-rose-600 font-bold bg-rose-50 px-4 py-5 rounded-2xl text-sm  w-[160px] text-center';
      case 'Packaging':
        return 'text-amber-600 font-bold bg-amber-50 px-4 py-5 rounded-2xl text-sm  w-[160px] text-center';
      case 'Delivery':
        return 'text-green-600 font-bold bg-green-50 px-4 py-5 rounded-2xl text-sm  w-[160px] text-center';
      default:
        return 'text-gray-600 font-bold bg-gray-50 px-4 py-5 rounded-2xl text-sm  w-[160px] text-center';
    }
  };

  return (
    <div className="grid grid-cols-6 gap-4 items-center py-4 border-b border-gray-100 mx-3">
      <div className="text-orderTextColor font-semibold">{batchId}</div>
      <div className="text-orderTextColor font-semibold">{orderId}</div>
      <div className="text-orderTextColor font-semibold">{quantity}</div>
      <div className="text-orderTextColor font-semibold">{deliverySchedule}</div>
      <div className="flex justify-start">
        <p className={getStatusColor(status)}>{status}</p>
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
