/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  basePath: process.env.NODE_ENV === 'production' ? '/mobile-app-prototype' : '',
  trailingSlash: true,
  assetPrefix: process.env.NODE_ENV === 'production' ? '/mobile-app-prototype/' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig 