'use client';

import React from 'react';
import { User } from 'lucide-react';

interface ScreenProps {
  switchTab: (tabName: string) => void;
  darkMode: boolean;
}

const ProfileScreen = ({ switchTab, darkMode }: ScreenProps) => {
  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>プロフィール</h1>
        <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>あなたの情報</p>
      </div>
      
      <div className="flex flex-col items-center mb-6">
        <div className={`w-24 h-24 ${darkMode ? 'bg-gray-600' : 'bg-gray-300'} rounded-full flex items-center justify-center ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
          <User size={48} />
        </div>
        <h2 className={`mt-4 font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-800'}`}>ユーザー名</h2>
        <p className={darkMode ? 'text-gray-300' : 'text-gray-600'}>user@example.com</p>
      </div>
      
      <div className="space-y-3">
        <div className={`p-3 rounded-lg border ${
          darkMode 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>アカウント情報</h3>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>アカウントの詳細情報</p>
        </div>
        <div className={`p-3 rounded-lg border ${
          darkMode 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>お気に入り</h3>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>保存したアイテム</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen; 