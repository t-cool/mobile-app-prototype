'use client';

import React, { useState } from 'react';

interface ScreenProps {
  switchTab: (tabName: string) => void;
  darkMode: boolean;
}

interface SettingsScreenProps extends ScreenProps {
  toggleDarkMode: () => void;
}

const SettingsScreen = ({ switchTab, darkMode, toggleDarkMode }: SettingsScreenProps) => {
  const [notifications, setNotifications] = useState(true);
  
  return (
    <div className="p-4">
      <div className="text-center mb-6">
        <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>設定</h1>
        <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>アプリの設定を変更</p>
      </div>
      
      <div className="space-y-4">
        <div className={`p-4 rounded-lg border flex justify-between items-center ${
          darkMode 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div>
            <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>ダークモード</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              ダークテーマに切り替え
            </p>
          </div>
          <div 
            className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${darkMode ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'}`}
            onClick={toggleDarkMode}
          >
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg border flex justify-between items-center ${
          darkMode 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <div>
            <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>通知</h3>
            <p className={`text-sm mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              通知を有効にする
            </p>
          </div>
          <div 
            className={`w-12 h-6 rounded-full flex items-center p-1 cursor-pointer ${notifications ? 'bg-blue-500 justify-end' : 'bg-gray-300 justify-start'}`}
            onClick={() => setNotifications(!notifications)}
          >
            <div className="w-4 h-4 bg-white rounded-full"></div>
          </div>
        </div>
        
        <div className={`p-4 rounded-lg border ${
          darkMode 
            ? 'bg-gray-700 border-gray-600' 
            : 'bg-gray-50 border-gray-200'
        }`}>
          <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-800'}`}>言語</h3>
          <select className={`mt-2 w-full p-2 border rounded ${
            darkMode 
              ? 'bg-gray-800 border-gray-600 text-white' 
              : 'bg-white border-gray-300 text-gray-800'
          }`}>
            <option>日本語</option>
            <option>English</option>
            <option>中文</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen; 