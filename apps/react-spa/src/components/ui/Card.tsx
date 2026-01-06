import type { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  as?: 'div' | 'article' | 'section';
}

export function Card({ 
  title, 
  children, 
  className = '', 
  onClick,
  as: Component = 'div' 
}: CardProps) {
  const isInteractive = !!onClick;

  const baseClasses = `bg-white rounded-lg shadow-md p-6 ${
    isInteractive ? 'cursor-pointer transition-transform hover:scale-105 focus-within:ring-2 focus-within:ring-blue-500' : ''
  } ${className}`;

  const cardContent = (
    <>
      {title && (
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          {title}
        </h3>
      )}
      <div>{children}</div>
    </>
  );

  if (isInteractive) {
    return (
      <Component
        className={baseClasses}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        }}
        aria-label={title}
      >
        {cardContent}
      </Component>
    );
  }

  return (
    <Component className={baseClasses}>
      {cardContent}
    </Component>
  );
}
