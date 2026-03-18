import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost';
};

const Button: React.FC<Props> = ({ variant = 'primary', children, ...rest }) => {
  const base = 'px-4 py-2 rounded text-sm font-medium';
  const style = variant === 'primary' ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-transparent text-gray-200 border border-gray-700';
  return (
    <button className={`${base} ${style}`} {...rest}>
      {children}
    </button>
  );
};

export default Button;
