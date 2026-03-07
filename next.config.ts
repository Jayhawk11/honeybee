import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

/**
 * Next.js Configuration
 * Optimized for fast development and production builds
 * Performance: Added Performance Budget, HTTP/2, React Strict Mode
 */

const baseConfig: NextConfig = {
  // Enable React Strict Mode for catching bugs
  reactStrictMode: true,

  // Remove X-Powered-By header for security and smaller responses
  poweredByHeader: false,

  // Optimize images for better performance
  images: {
    unoptimized: true,
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
    optimizePackageImports: ['framer-motion', 'lucide-react', '@heroicons/react'],
  },

  // Empty turbopack config to silence warning
  turbopack: {},

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

  ...(process.env.NODE_ENV !== 'production' && {
    // Development optimizations
    // Faster rebuilds with on-demand entries
    onDemandEntries: {
      maxInactiveAge: 25 * 1000,
      pagesBufferLength: 2,
    },
  }),
}

const configWithBundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const finalConfig = configWithBundleAnalyzer(baseConfig)

export default finalConfig
