import type { InputHTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, type = 'text', className = '', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-text-primary mb-1">
          {label}
        </label>
        <input
          type={type}
          className={`
            w-full px-4 py-3 
            border border-border 
            rounded-input
            text-text-primary text-body
            placeholder:text-text-secondary
            focus:outline-none focus:border-border-focus focus:ring-1 focus:ring-border-focus
            transition-colors
            ${className}
          `}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
