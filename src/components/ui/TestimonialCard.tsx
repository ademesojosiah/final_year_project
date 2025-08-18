import React from 'react';

interface TestimonialCardProps {
  name: string;
  role: string;
  avatar: string;
  testimonial: string;
  isHighlighted?: boolean;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  role, 
  avatar, 
  testimonial, 
  isHighlighted = false 
}) => {
  return (
    <div className={`p-6 rounded-lg border ${isHighlighted ? 'border-[#B8860B] bg-[#FFF9E6]' : 'border-gray-200 bg-white'} shadow-sm`}>
      <div className="flex items-center mb-4">
        <img 
          src={avatar} 
          alt={name} 
          className="w-10 h-10 rounded-full mr-3"
        />
        <div>
          <h4 className="font-semibold text-black text-sm">{name}</h4>
          <p className="text-gray-600 text-xs">{role}</p>
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">
        {testimonial}
      </p>
    </div>
  );
};

export default TestimonialCard;
