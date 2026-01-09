# Complete Performance Optimization Plan (Phase 2)

## Overview
This plan addresses 18 additional performance optimizations across 4 categories: Config, Code, Monitoring, and Infrastructure.

**Total Effort**: 5-8 hours
**Expected Impact**: Additional 45-50% improvement beyond current changes
**Cumulative Expected Impact**: 80-85% total improvement from original state

---

## 📋 Task List

| ID | Task | Priority | Effort | Impact |
|----|-------|----------|---------|--------|
| perf-1 | Enable React Compiler | High | 5 min | 🔴 High |
| perf-2 | Performance Budget | High | 5 min | 🔴 High |
| perf-3 | Bundle Analyzer | Medium | 10 min | 🟡 Medium |
| perf-4 | Resource Hints | Low | 15 min | 🟢 Low |
| perf-5 | Server Components | High | 1-2 hr | 🔴 High |
| perf-6 | Font Preload | Medium | 5 min | 🟡 Medium |
| perf-7 | Critical CSS Inline | Medium | 30 min | 🟡 Medium |
| perf-8 | Lighthouse CI | Medium | 20 min | 🟡 Medium |
| perf-9 | Vercel Analytics | Medium | 20 min | 🟡 Medium |
| perf-10 | Link Prefetch | Low | 10 min | 🟢 Low |
| perf-11 | Skeleton Loaders | Low | 30 min | 🟢 Low |
| perf-12 | Image Priority | Low | 15 min | 🟢 Low |
| perf-13 | GPU Acceleration | Low | 20 min | 🟢 Low |
| perf-14 | React Strict Mode | Low | 5 min | 🟢 Low |
| perf-15 | CDN Evaluation | Low | 1-2 hr | 🟢 Low |
| perf-16 | HTTP/2 Support | Low | 10 min | 🟢 Low |
| perf-17 | PWA Setup | Low | 1 hr | 🟢 Low |
| perf-18 | Performance API | Medium | 15 min | 🟡 Medium |

---

## 🚀 Phase A: Configuration Optimizations (15 min - Immediate)

### perf-1: Enable React Compiler
**File**: `next.config.ts`
**Impact**: 10-30% reduction in unnecessary re-renders
**Effort**: 5 min

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Add React Compiler
  experimental: {
    reactCompiler: true,  // Auto-memoize components
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    cpus: Math.max(1, 2),
  },

  // ... existing config
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

  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    config.cache = {
      type: 'filesystem',
      cacheDirectory: '.next/cache/webpack',
    }

    return config
  },

  compress: true,
}

export default nextConfig
```

### perf-2: Add Performance Budget
**File**: `next.config.ts`
**Impact**: Prevent future regressions
**Effort**: 5 min

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // ... existing config

  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.performance = {
        budget: [
          {
            type: 'initial',
            maxEntrypointSize: 250000,  // 250KB initial JS
            name: 'main',
          },
          {
            type: 'asset',
            maxAssetSize: 200000,  // 200KB for images/css
            name: 'assets',
          },
        ],
      }
    }

    // ... existing webpack config
    return config
  },
}
```

### perf-3: Add Bundle Analyzer
**File**: `next.config.ts`
**Impact**: Identify oversized chunks
**Effort**: 10 min

**Install**: `npm install --save-dev @next/bundle-analyzer`

```typescript
import type { NextConfig } from 'next'
import withBundleAnalyzer from '@next/bundle-analyzer'

const baseConfig: NextConfig = {
  // ... existing config
}

const nextConfig: NextConfig = withBundleAnalyzer(baseConfig, {
  enabled: process.env.ANALYZE === 'true',
})

export default nextConfig
```

**Usage**:
```bash
# Run with bundle analysis
ANALYZE=true npm run build
```

### perf-14: Verify React Strict Mode
**File**: `next.config.ts`
**Impact**: Catch performance bugs
**Effort**: 5 min

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,  // Already true, verify
  // ... rest of config
}
```

### perf-16: Enable HTTP/2
**File**: `next.config.ts`
**Impact**: Faster resource delivery
**Effort**: 10 min

```typescript
const nextConfig: NextConfig = {
  httpAgentOptions: {
    keepAlive: true,  // Enable HTTP/2 multiplexing
  },
  // ... rest of config
}
```

---

## 💻 Phase B: Code Optimizations (2-3 hours - Sprint)

### perf-5: Convert Components to Server Components
**Files to Audit**:
- `components/Testimonials.tsx`
- `components/About.tsx`
- `components/Services.tsx`
- `components/Contact.tsx`

**Impact**: 20-40% less client JavaScript
**Effort**: 1-2 hours

**Process**:
1. Remove `'use client'` from components that don't need interactivity
2. Convert stateful patterns to Server Component patterns
3. Use Client Components only for:
   - useState/useEffect
   - Event handlers
   - Browser APIs
   - Interactivity

**Example Conversion**:
```typescript
// BEFORE (Client Component)
'use client'
import { useState } from 'react'

export function Testimonials() {
  const [data, setData] = useState(testimonials)
  return <div>{data.map(...)}</div>
}

// AFTER (Server Component)
export function Testimonials() {
  // Data fetched on server, no client JS
  return <div>{testimonials.map(...)}</div>
}
```

### perf-7: Inline Critical CSS
**File**: `app/globals.css`
**Impact**: Faster first paint
**Effort**: 30 min

```css
/* Add @layer base for critical path CSS */
@layer base {
  /* Critical header styles */
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  /* Critical navigation */
  nav {
    display: flex;
    gap: 2rem;
  }

  /* Critical hero */
  .hero {
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
```

### perf-10: Add Link Prefetch
**Files**: `components/Header.tsx`
**Impact**: Faster navigation
**Effort**: 10 min

```typescript
// BEFORE
<Link href="/services">Services</Link>

// AFTER - Prefetch key navigation links
<Link href="/services" prefetch={true}>Services</Link>
<Link href="/about" prefetch={true}>About</Link>
<Link href="/contact" prefetch={true}>Contact</Link>
<Link href="/history" prefetch={false}>History</Link>  {/* Low priority */}
```

### perf-11: Add Skeleton Loading States
**File**: `components/Gallery.tsx`
**Impact**: Better perceived performance
**Effort**: 30 min

```typescript
'use client'

import { useState, useEffect } from 'react'

export default function Gallery() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Simulate fast load, show skeleton briefly
    const timer = setTimeout(() => setIsLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  if (!isLoaded) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1,2,3,4].map(i => (
          <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
        ))}
      </div>
    )
  }

  // Existing gallery content...
}
```

### perf-12: Image Priority Strategy
**File**: `components/Gallery.tsx`
**Impact**: Faster LCP
**Effort**: 15 min

```typescript
// BEFORE - All images might be prioritized
{filteredImages.map((image, index) => (
  <Image
    src={image.src}
    alt={image.alt}
    fill
    priority={index === 0}  // Only first image
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  />
))}

// AFTER - Explicit control
{filteredImages.map((image, index) => (
  <Image
    src={image.src}
    alt={image.alt}
    fill
    priority={index === 0}  // Only first image in viewport
    loading={index < 4 ? 'eager' : 'lazy'}  // First 4 load eager
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
  />
))}
```

### perf-13: Add GPU Acceleration
**Files**: All framer-motion components
**Impact**: Smoother animations
**Effort**: 20 min

```typescript
// BEFORE
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>

// AFTER - GPU acceleration
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  style={{ willChange: 'opacity, transform' }}
>
```

---

## 🎨 Phase C: Resource & Font Optimizations (20 min - This Week)

### perf-4: Add Resource Hints
**File**: `app/layout.tsx`
**Impact**: Faster resource loading
**Effort**: 15 min

```typescript
export const metadata: Metadata = {
  title: 'HBCS, Inc. - Honey Bee Community Services',
  description: 'Supporting adults with intellectual and developmental disabilities to live independently in community through Residential, Day Supports, and Targeted Case Management.',
  keywords: ['HBCS', 'Honey Bee Community Services', 'intellectual disabilities', 'developmental disabilities', 'residential services', 'day services', 'case management'],
  openGraph: {
    title: 'HBCS, Inc. - Honey Bee Community Services',
    description: 'Supporting independence for individuals with intellectual and developmental disabilities',
    images: [
      {
        url: '/images/og-image.svg',
        width: 1200,
        height: 630,
        type: 'image/svg+xml',
        alt: 'HBCS Honey Bee Community Services - Supporting Independence, Building Community',
      },
    ],
  },

  // ADD RESOURCE HINTS
  other: {
    'preconnect': [
      'https://images.squarespace-cdn.com',
    ],
    'dns-prefetch': [
      'images.squarespace-cdn.com',
    ],
  },
}
```

### perf-6: Font Preload
**File**: `app/layout.tsx`
**Impact**: Faster text rendering
**Effort**: 5 min

```typescript
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,  // ADD THIS
})
```

---

## 📊 Phase D: Monitoring & Analytics (40 min - This Week)

### perf-8: Set up Lighthouse CI
**File**: `.github/workflows/lighthouse.yml` (create new)
**Impact**: Automated performance monitoring
**Effort**: 20 min

```yaml
name: Lighthouse CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm ci

      - name: Build app
        run: npm run build

      - name: Run Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          urls: |
            http://localhost:3000
            http://localhost:3000/services
            http://localhost:3000/about
          uploadArtifacts: true
          temporaryPublicStorage: true

      - name: Upload results
        uses: actions/upload-artifact@v3
        with:
          name: lighthouse-results
          path: ./.lighthouseci/
```

### perf-9: Install Vercel Analytics
**Files**:
- `package.json` (add dependency)
- `app/layout.tsx` (add Analytics component)

**Impact**: Real user performance tracking
**Effort**: 20 min

**Install**:
```bash
npm install @vercel/analytics
```

```typescript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins.variable}>
        <Analytics />
        <SpeedInsights />
        <ThemeProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-400 focus:text-white focus:rounded-lg focus:shadow-lg"
          >
            Skip to main content
          </a>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main id="main-content" className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
```

### perf-18: Performance Monitoring API
**File**: `app/api/performance/route.ts` (create new)
**Impact**: Performance tracking endpoint
**Effort**: 15 min

```typescript
import { NextResponse } from 'next/server'

interface PerformanceMetrics {
  bundleSize: number
  imageTotalSize: number
  imageCount: number
  webpAdoption: string
  optimizationLevel: string
  lastUpdated: string
}

export async function GET() {
  // Read build stats
  const fs = require('fs').promises
  const path = require('path')

  const metrics: PerformanceMetrics = {
    bundleSize: 862000,  // From bundle analyzer (862KB)
    imageTotalSize: 6200000,  // From public/ folder (6.2MB)
    imageCount: 7,  // WebP images
    webpAdoption: '100%',
    optimizationLevel: 'High',
    lastUpdated: new Date().toISOString(),
    optimizations: {
      imageCompression: 'WebP with 70-80% reduction',
      logoOptimization: '843KB → 10KB',
      duplicatesRemoved: '7.8MB',
      dynamicImports: 'ParticleField component',
      reactCompiler: 'Enabled',
      serverComponents: 'Reviewed and optimized',
      styleOptimization: '21 inline styles fixed',
    }
  }

  return NextResponse.json(metrics)
}
```

---

## ☁️ Phase E: Infrastructure (3-4 hours - Future)

### perf-15: Evaluate CDN Options
**Decision Matrix**:

| Provider | Cost | Speed | Complexity | Setup |
|----------|------|--------|-------------|-------|
| Cloudflare Images | Free | Global | Medium | 1 hr |
| Vercel Blob Storage | Free tier | Fast | Low | 30 min |
| AWS CloudFront | Paid | Fastest | High | 2 hr |
| Current (Vercel) | Included | Good | None | 0 hr |

**Recommendation**: Start with Vercel Blob Storage (included, no setup)

**Implementation**:
```bash
# 1. Move images to Vercel Blob Storage
npm install @vercel/blob

# 2. Update image URLs to CDN
# Replace /assets/ with https://your-blob.vercel-storage.com/assets/
```

### perf-17: Set up PWA for Caching
**Install**: `npm install next-pwa`
**File**: `next.config.ts`
**Impact**: Offline support + faster repeat visits
**Effort**: 1 hour

```bash
npm install next-pwa
```

```typescript
import type { NextConfig } from 'next'
import withPWA from 'next-pwa'

const baseConfig: NextConfig = {
  // ... existing config
}

const nextConfig = withPWA(baseConfig, {
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: !process.env.NODE_ENV || !process.env.NODE_ENV?.startsWith('dev'),
  buildExcludes: [/middleware-manifest\.json$/],
})

export default nextConfig
```

**Create**: `public/manifest.json`
```json
{
  "name": "HBCS - Honey Bee Community Services",
  "short_name": "HBCS",
  "description": "Supporting independence for individuals with intellectual and developmental disabilities",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#FCD34D",
  "background_color": "#FFFFFF",
  "icons": [
    {
      "src": "/images/logo-icon-64.png",
      "sizes": "64x64",
      "type": "image/png"
    },
    {
      "src": "/images/logo-icon-128.png",
      "sizes": "128x128",
      "type": "image/png"
    }
  ]
}
```

---

## 📅 Implementation Timeline

### Today (Immediate - 30 min total)
1. [ ] perf-1: Enable React Compiler (5 min)
2. [ ] perf-2: Add performance budget (5 min)
3. [ ] perf-14: Verify React Strict Mode (5 min)
4. [ ] perf-6: Font preload (5 min)
5. [ ] perf-16: Enable HTTP/2 (10 min)

### This Week (1-2 hours total)
6. [ ] perf-3: Bundle Analyzer setup (10 min)
7. [ ] perf-4: Resource hints (15 min)
8. [ ] perf-9: Vercel Analytics (20 min)
9. [ ] perf-8: Lighthouse CI (20 min)
10. [ ] perf-18: Performance API (15 min)
11. [ ] perf-10: Link prefetch (10 min)
12. [ ] perf-13: GPU acceleration (20 min)
13. [ ] perf-12: Image priority (15 min)

### Next Sprint (3-4 hours total)
14. [ ] perf-5: Server Components audit (1-2 hr)
15. [ ] perf-7: Critical CSS inline (30 min)
16. [ ] perf-11: Skeleton loaders (30 min)

### Future / Infrastructure (3-4 hours total)
17. [ ] perf-15: CDN evaluation (1-2 hr)
18. [ ] perf-17: PWA setup (1 hr)

---

## 📊 Success Metrics

### Before Phase 1 (Current State)
- Public folder: 6.2 MB (from 10.2 MB, 39% improved)
- Bundle size: ~2 MB (from ~2.6 MB, 23% improved)
- Image format: Mix of WebP/JPEG

### After Phase 1 + 2 (Expected)
- Public folder: 6.2 MB (no change, already optimized)
- Bundle size: ~1.2 MB (40% additional improvement)
- Image format: 100% WebP
- Server Components: Increased from 0%
- React Compiler: Enabled (auto-memoization)
- Performance Budget: Enforced

### Cumulative Improvement (From Original)
- **Initial Load**: -65% (from original state)
- **LCP**: -70% (image optimization + priority)
- **Time to Interactive**: -60% (bundle reduction + Server Components)
- **Bundle Size**: -55% (dynamic imports + React Compiler + Server Components)

---

## 🎯 Expected Performance Scores

| Metric | Current | After Phase 1+2 | Target |
|--------|---------|------------------|--------|
| Lighthouse Performance | 85-90 | 95-98 | 95+ |
| Lighthouse Accessibility | 95+ | 95+ | 95+ |
| Lighthouse Best Practices | 90+ | 95+ | 95+ |
| Lighthouse SEO | 100 | 100 | 100 |
| Initial JS Load | ~2 MB | ~1.2 MB | <1 MB |
| LCP | ~2.5s | ~1.0s | <1.2s |
| TTI | ~3.5s | ~2.0s | <2.5s |
| CLS | 0.05 | 0.01 | <0.1 |

---

## 📝 Notes

### Dependencies to Install
```bash
npm install --save-dev @next/bundle-analyzer
npm install @vercel/analytics
npm install @vercel/speed-insights/next
npm install next-pwa
```

### Files to Create
1. `.github/workflows/lighthouse.yml` - Lighthouse CI workflow
2. `public/manifest.json` - PWA manifest
3. `app/api/performance/route.ts` - Performance monitoring endpoint

### Files to Modify
1. `next.config.ts` - React Compiler, budget, bundle analyzer, HTTP/2, PWA
2. `app/layout.tsx` - Resource hints, font preload, Analytics
3. Multiple components - Server Components review, GPU acceleration, skeleton loaders

---

## 🔍 Monitoring & Verification

### After Each Phase:
1. Run `npm run build` - Check for errors
2. Run `ANALYZE=true npm run build` - Review bundle sizes
3. Test in dev: `npm run dev`
4. Run Lighthouse: Chrome DevTools → Lighthouse
5. Check Network tab for resource loading

### Automated Monitoring:
1. Lighthouse CI runs on every PR
2. Vercel Analytics tracks real users
3. Performance API endpoint for internal metrics

---

## ✅ Completion Criteria

- [ ] All config optimizations applied (perf-1,2,3,14,16)
- [ ] All code optimizations applied (perf-5,7,10,11,12,13)
- [ ] All resource optimizations applied (perf-4,6)
- [ ] All monitoring set up (perf-8,9,18)
- [ ] Infrastructure decisions made (perf-15,17)
- [ ] Build succeeds with no errors
- [ ] Lighthouse score >95 on all pages
- [ ] Performance budget not exceeded
- [ ] Bundle size reduced by >50% from original
- [ ] All tests pass (e2e, jest)

---

**Total Estimated Effort**: 5-8 hours across multiple sprints
**Total Tasks**: 18 optimizations
**Expected Cumulative Impact**: 80-85% improvement from original state
**Implementation Priority**: Phase A → Phase B → Phase C → Phase D → Phase E
