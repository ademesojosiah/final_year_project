import React, { useState } from 'react';

type SheetType = "Fliers" | "OMR Sheets" | "Jotters";

interface PlaceOrderProps {
  onBack?: () => void;
  onSubmit?: (orderData: any) => void;
}

interface OrderFormData {
  productName: string;
  quantity: number;
  sheetType: SheetType | '';
}

export const PlaceOrder: React.FC<PlaceOrderProps> = ({
  onBack,
  onSubmit
}) => {
  const [formData, setFormData] = useState<OrderFormData>({
    productName: '',
    quantity: 0,
    sheetType: ''
  });

  const sheetTypes: SheetType[] = [
    'Fliers',
    'OMR Sheets', 
    'Jotters'
  ];

  const handleInputChange = (field: keyof OrderFormData, value: string | number | SheetType) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Order data:', formData);
    onSubmit?.(formData);
  };

  return (
    // Modal overlay with semi-transparent black background
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Order</h2>
          {onBack && (
            <button
              onClick={onBack}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name of product
            </label>
            <input
              type="text"
              value={formData.productName}
              onChange={(e) => handleInputChange('productName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
              placeholder="Enter product name"
              required
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Quantity
            </label>
            <input
              type="number"
              value={formData.quantity || ''}
              onChange={(e) => handleInputChange('quantity', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent"
              placeholder="Enter quantity"
              min="1"
              required
            />
          </div>

          {/* Sheet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sheet Type
            </label>
            <div className="relative">
              <select
                value={formData.sheetType}
                onChange={(e) => handleInputChange('sheetType', e.target.value as SheetType)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-transparent bg-white appearance-none"
                required
              >
                <option value="">Select sheet type</option>
                {sheetTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-[#F59E0B] hover:bg-[#D97706] text-white font-medium py-2 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/50"
            >
              Place order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
