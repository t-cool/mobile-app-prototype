const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/mobile-app-prototype' : '',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mobile-app-prototype/' : '',
  images: {
    unoptimized: true,
  },
  output: 'export',
}

module.exports = withPWA(nextConfig) 