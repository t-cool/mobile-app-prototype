'use client';

import React, { useState, useEffect } from 'react';
import { Home, Settings, User, Menu, Sun, Moon } from 'lucide-react';
import TabButton from './TabButton';
import SideMenuItem from './SideMenuItem';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import SettingsScreen from './screens/SettingsScreen';

const MobileApp = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [isDesktop, setIsDesktop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  // ダークモードを切り替える関数
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // 画面サイズを監視し、デスクトップかモバイルかを判定
  useEffect(() => {
    const checkIfDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    
    // 初期チェック
    checkIfDesktop();
    
    // リサイズイベントのリスナー追加
    window.addEventListener('resize', checkIfDesktop);
    
    // クリーンアップ
    return () => {
      window.removeEventListener('resize', checkIfDesktop);
    };
  }, []);

  // タブを切り替える関数
  const switchTab = (tabName: string) => {
    setActiveTab(tabName);
  };

  // 画面コンテンツを表示する関数
  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen switchTab={switchTab} darkMode={darkMode} />;
      case 'profile':
        return <ProfileScreen switchTab={switchTab} darkMode={darkMode} />;
      case 'settings':
        return <SettingsScreen switchTab={switchTab} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />;
      default:
        return <HomeScreen switchTab={switchTab} darkMode={darkMode} />;
    }
  };

  // サイドメニュー
  const SideMenu = () => (
    <div className={`${darkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white h-full w-64 flex-shrink-0 ${menuOpen ? 'block' : 'hidden'} md:block`}>
      <div className={`p-4 border-b ${darkMode ? 'border-gray-800' : 'border-gray-700'}`}>
        <h1 className="text-xl font-bold">アプリ名</h1>
      </div>
      <nav className="mt-6">
        <SideMenuItem 
          icon={<Home size={20} />} 
          label="ホーム" 
          isActive={activeTab === 'home'} 
          onClick={() => switchTab('home')} 
        />
        <SideMenuItem 
          icon={<User size={20} />} 
          label="プロフィール" 
          isActive={activeTab === 'profile'} 
          onClick={() => switchTab('profile')} 
        />
        <SideMenuItem 
          icon={<Settings size={20} />} 
          label="設定" 
          isActive={activeTab === 'settings'} 
          onClick={() => switchTab('settings')} 
        />
      </nav>
    </div>
  );

  // モバイル表示時のコンテンツ
  const MobileView = () => (
    <div className={`flex flex-col h-screen max-w-sm mx-auto border ${darkMode ? 'border-gray-700' : 'border-gray-300'} rounded-lg overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* アプリコンテンツ */}
      <div className={`flex-1 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
        {renderContent()}
      </div>

      {/* ナビゲーションタブ */}
      <div className={`flex justify-around items-center h-16 ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'} border-t`}>
        <TabButton 
          icon={<Home size={24} />} 
          label="ホーム" 
          isActive={activeTab === 'home'} 
          onClick={() => switchTab('home')} 
          darkMode={darkMode}
        />
        <TabButton 
          icon={<User size={24} />} 
          label="プロフィール" 
          isActive={activeTab === 'profile'} 
          onClick={() => switchTab('profile')} 
          darkMode={darkMode}
        />
        <TabButton 
          icon={<Settings size={24} />} 
          label="設定" 
          isActive={activeTab === 'settings'} 
          onClick={() => switchTab('settings')} 
          darkMode={darkMode}
        />
      </div>
    </div>
  );

  // デスクトップ表示時のコンテンツ
  const DesktopView = () => (
    <div className={`flex h-screen overflow-hidden ${darkMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
      {/* サイドメニュー */}
      <SideMenu />
      
      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ヘッダー */}
        <header className={`${darkMode ? 'bg-gray-800 border-gray-700 text-white' : 'bg-white border-gray-200'} border-b h-16 flex items-center px-4`}>
          <button 
            className={`${darkMode ? 'text-gray-300' : 'text-gray-500'} mr-4 md:hidden`}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-medium">
            {activeTab === 'home' ? 'ホーム' : 
             activeTab === 'profile' ? 'プロフィール' : '設定'}
          </h2>
          
          {/* ダークモード切り替えボタン（デスクトップのヘッダーに追加） */}
          <button 
            className={`ml-auto p-2 rounded-full ${darkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-800'}`}
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'ライトモードに切り替え' : 'ダークモードに切り替え'}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </header>
        
        {/* コンテンツエリア */}
        <main className={`flex-1 overflow-y-auto ${darkMode ? 'bg-gray-800' : 'bg-white'} p-6`}>
          {renderContent()}
        </main>
      </div>
    </div>
  );

  return isDesktop ? <DesktopView /> : <MobileView />;
};

export default MobileApp; 