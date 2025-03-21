'use client';

import React from 'react';

interface TabButtonProps {
  icon: React.ReactElement;
  label: string;
  isActive: boolean;
  onClick: () => void;
  darkMode: boolean;
}

const TabButton = ({ icon, label, isActive, onClick, darkMode }: TabButtonProps) => {
  return (
    <button 
      className={`flex flex-col items-center justify-center w-20 py-1 ${
        isActive 
          ? 'text-blue-500' 
          : darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </button>
  );
};

export default TabButton; 