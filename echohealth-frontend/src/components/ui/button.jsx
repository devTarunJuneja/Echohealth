// src/components/ui/Button.jsx
import React from 'react';
import cn from 'clsx';

export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'px-4 py-2 rounded-lg font-medium transition';
  const styles = {
    primary: 'bg-pink-600 text-white hover:bg-pink-700',
    outline: 'border border-pink-600 text-pink-600 hover:bg-pink-50',
    secondary: 'bg-gray-200 text-gray-700 hover:bg-gray-300',
  };

  return (
    <button className={cn(base, styles[variant], className)} {...props}>
      {children}
    </button>
  );
}
