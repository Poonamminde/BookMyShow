import React from 'react';

const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => {
  return (
    <div className={`bg-gray-800 border border-gray-700 rounded p-4 shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export default Card;
