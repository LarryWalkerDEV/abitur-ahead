
import React from 'react';
import { cn } from '@/lib/utils';

interface StarElementProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'pink' | 'green' | 'cyan' | 'orange';
  className?: string;
  spin?: boolean;
  pulse?: boolean;
}

const StarElement: React.FC<StarElementProps> = ({
  size = 'md',
  color = 'pink',
  className,
  spin = true,
  pulse = true,
}) => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-5 h-5',
    lg: 'w-8 h-8',
  };

  const colorClasses = {
    pink: 'text-abitur-pink',
    green: 'text-abitur-green',
    cyan: 'text-abitur-cyan',
    orange: 'text-abitur-orange',
  };

  return (
    <div className={cn(
      sizeClasses[size],
      colorClasses[color],
      spin && 'animate-spin-slow',
      pulse && 'animate-pulse-soft',
      className
    )}>
      <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L15.09 7.26L22 8.27L17 13.14L18.18 20.02L12 16.77L5.82 20.02L7 13.14L2 8.27L8.91 7.26L12 1Z" />
      </svg>
    </div>
  );
};

export default StarElement;
