import type { NextConfig } from 'next'
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

/**
 * Next.js Configuration
 * Optimized for fast development and production builds
 * Performance: Added Performance Budget, HTTP/2, React Strict Mode, PWA
 */

const baseConfig: NextConfig = {
  // Enable React Strict Mode for catching bugs
  reactStrictMode: true,

  // Optimize images for better performance
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
      },
    ],
  },

  // Experimental features for better performance
  experimental: {
    // Optimize for multi-core systems
    cpus: Math.max(1, 2),

    // Enable optimized package imports
    optimizePackageImports: ['framer-motion', 'lucide-react'],
  },

  // Webpack configuration optimizations
  webpack: (config, { dev, isServer }) => {
    // Optimize module resolution
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    // Faster builds with cache
    config.cache = {
      type: 'filesystem',
      cacheDirectory: '.next/cache/webpack',
    }

    // Add performance budget for production
    if (!dev && !isServer) {
      config.performance = {
        budget: [
          {
            type: 'initial',
            maxEntrypointSize: 250000, // 250KB initial JS
            name: 'main',
          },
          {
            type: 'asset',
            maxAssetSize: 200000, // 200KB for images/css
            name: 'assets',
          },
        ],
      }
    }

    return config
  },

  // Enable HTTP/2 connection pooling
  httpAgentOptions: {
    keepAlive: true,
  },

  // Compress output for faster downloads
  compress: true,

  // Environment-specific optimizations
  ...(process.env.NODE_ENV === 'production' && {
    // Production optimizations
    productionBrowserSourceMaps: false,
  }),

  ...(process.env.NODE_ENV === 'development' && {
    // Development optimizations
    // Disable some optimizations in dev for faster startup
  }),
}

export default withPWA(baseConfig)
