export const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={`w-[540px] flex items-center justify-center px-8 relative z-10 ${className}`}>
      <div className="w-full max-w-[420px] bg-white/95 backdrop-blur-sm rounded-3xl p-10 border border-[#F0E5C9]/50 shadow-[0_8px_32px_rgba(62,40,0,0.08)]">
        {children}
      </div>
    </div>
  );
};
