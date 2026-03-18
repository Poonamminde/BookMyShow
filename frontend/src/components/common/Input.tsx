import React from 'react';

type Props = React.InputHTMLAttributes<HTMLInputElement> & { label?: string };

const Input: React.FC<Props> = ({ label, ...rest }) => {
  return (
    <label className="block text-sm text-gray-200">
      {label && <div className="mb-1">{label}</div>}
      <input {...rest} className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none" />
    </label>
  );
};

export default Input;
