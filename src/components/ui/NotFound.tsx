
export const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] bg-white rounded-lg shadow-sm p-8">
      <div className="w-16 h-16 mb-4">
        <svg 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-full text-gray-400"
        >
          <path 
            d="M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h12V4H6zm2 4h8v2H8V8zm0 4h8v2H8v-2z" 
            fill="currentColor"
          />
        </svg>
      </div>
      <h2 className="text-lg font-medium text-[#000000] mb-2">No Orders Yet</h2>
      <p className="text-gray-500 text-center text-sm">Customer hasn't placed any orders yet. New orders will appear here once they are created.</p>
    </div>
  );
};
