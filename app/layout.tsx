import './styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'モバイルアプリプロトタイプ',
  description: 'Next.jsで構築されたモバイルアプリのプロトタイプ',
  manifest: '/mobile-app-prototype/manifest.json',
  themeColor: '#000000',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'モバイルアプリ'
  },
  icons: {
    icon: '/mobile-app-prototype/icons/icon-192x192.png',
    apple: '/mobile-app-prototype/icons/icon-192x192.png'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <head>
        <link rel="manifest" href="/mobile-app-prototype/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/mobile-app-prototype/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="モバイルアプリ" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
} 