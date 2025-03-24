
import React from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'pink' | 'green' | 'cyan' | 'orange';

interface AnimatedBadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const variantClasses: Record<BadgeVariant, string> = {
  pink: 'abitur-badge-pink',
  green: 'abitur-badge-green',
  cyan: 'abitur-badge-cyan',
  orange: 'abitur-badge-orange',
};

const AnimatedBadge: React.FC<AnimatedBadgeProps> = ({ 
  variant, 
  children, 
  className,
  delay = 0
}) => {
  return (
    <div
      className={cn(
        'abitur-badge opacity-0 animate-fade-in',
        variantClasses[variant],
        className
      )}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedBadge;
