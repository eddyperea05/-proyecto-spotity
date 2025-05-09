import React from 'react';

export default function Badge({ variant, children }) {
  const base = 'inline-block px-3 py-1 text-sm font-semibold rounded-full border';
  const styles = {
    checking:    'bg-gray-100 text-gray-700 border-gray-300',
    connected:   'bg-green-100 text-green-800 border-green-300',
    disconnected:'bg-red-100 text-red-800 border-red-300',
    error:       'bg-yellow-100 text-yellow-800 border-yellow-300',
  };

  return (
    <span className={`${base} ${styles[variant] || styles.error}`}>
      {children}
    </span>
  );
}
