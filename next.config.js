/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
    formats: ['image/webp'],
  },
  experimental: {
    optimizePackageImports: ['react-icons', 'framer-motion'],
  },
  compress: true,
  poweredByHeader: false,
}

module.exports = nextConfig