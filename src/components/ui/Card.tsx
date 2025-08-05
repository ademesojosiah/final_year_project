export const Card = ({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div 
      className={`
        bg-background-card 
        shadow-card 
        rounded-card 
        p-8
        ${className}
      `}
    >
      {children}
    </div>
  );
};
