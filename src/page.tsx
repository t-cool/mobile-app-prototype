import React, { useState, useEffect } from 'react';
import { Home, Settings, User, Menu, Sun, Moon } from 'lucide-react';

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

// タブボタンコンポーネント
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

// サイドメニューアイテムコンポーネント
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

// 各画面のコンポーネント用インターフェース
interface ScreenProps {
  switchTab: (tabName: string) => void;
  darkMode: boolean;
}

interface SettingsScreenProps extends ScreenProps {
  toggleDarkMode: () => void;
}

// ホーム画面
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

// プロフィール画面
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

// 設定画面
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

export default MobileApp;
