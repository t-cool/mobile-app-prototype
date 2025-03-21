'use client';

import React from 'react';

interface ScreenProps {
  switchTab: (tabName: string) => void;
  darkMode: boolean;
}

const HomeScreen = ({ switchTab, darkMode }: ScreenProps) => {
  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>ホーム</h1>
        <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>ようこそ！最新情報をチェック</p>
      </div>
      
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div 
            key={item} 
            className={`p-4 rounded-lg border ${
              darkMode 
                ? 'bg-gray-700 border-gray-600 text-white' 
                : 'bg-gray-50 border-gray-200'
            }`}
          >
            <h3 className="font-medium">お知らせ {item}</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              これは新しいお知らせです。
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeScreen; 