'use client';

import React from 'react';

interface SideMenuItemProps {
  icon: React.ReactElement;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const SideMenuItem = ({ icon, label, isActive, onClick }: SideMenuItemProps) => {
  return (
    <button 
      className={`flex items-center px-6 py-3 w-full ${isActive 
        ? 'bg-blue-700 text-white' 
        : 'text-gray-300 hover:bg-gray-700'}`}
      onClick={onClick}
    >
      <span className="mr-3">{icon}</span>
      <span>{label}</span>
    </button>
  );
};

export default SideMenuItem; 