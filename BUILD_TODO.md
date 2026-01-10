# Build Todo

## Priority 1: Quick Wins (Do Today)

### 1. Add @heroicons/react to optimizePackageImports
**File**: `next.config.ts`
**Time**: 2 minutes
**Impact**: High - Smaller bundles through better tree-shaking

**Change**:
```ts
experimental: {
  optimizePackageImports: [
    'framer-motion',
    'lucide-react',
    '@heroicons/react',  // ADD THIS
  ],
}
```

**Status**: ⏳ Pending

---

### 2. Remove X-Powered-By Header
**File**: `next.config.ts`
**Time**: 1 minute
**Impact**: High - Smaller HTTP responses + security improvement

**Change**:
```ts
const baseConfig: NextConfig = {
  poweredByHeader: false,  // ADD THIS
  // ... rest of config
}
```

**Status**: ⏳ Pending

---

### 3. Test Build with Optimizations
**File**: Run `npm run build`
**Time**: 3 minutes
**Impact**: Verify changes don't break build

**Command**:
```bash
npm run build
npm run start
```

**Status**: ⏳ Pending

---

### 4. Commit and Push Optimizations
**Time**: 2 minutes
**Impact**: Deploy optimized build

**Commit Message**:
```
perf: apply high-impact build optimizations

- Remove X-Powered-By header (security + smaller responses)
- Add @heroicons/react to optimizePackageImports (smaller bundles)
- Better tree-shaking for frequently used icon library
```

**Status**: ⏳ Pending

---

## Priority 2: Manual Netlify Tasks

### 5. Upgrade Netlify Next.js Plugin
**Priority**: Medium
**Impact**: Better Netlify-Next.js integration

**Details**:
- Current version: `@netlify/plugin-nextjs@4.41.5`
- Latest version: `5.15.4`
- Difference: 11 minor versions behind

**Action Required** (Manual - cannot be automated):
1. Go to https://app.netlify.com/plugins
2. Find `@netlify/plugin-nextjs`
3. Click "Uninstall"
4. Search for "@netlify/plugin-nextjs"
5. Click "Install"
6. Select version `5.15.4`
7. Confirm installation

**Status**: ⏳ Pending (Manual action required)

**Note**: This is a manual task in Netlify UI. Cannot be done via code/Git.

---

## Priority 3: Future Optimizations

### 6. Add Static Build ID
**File**: `next.config.ts`
**Time**: 2 minutes
**Impact**: Medium - Better CDN caching

**Change**:
```ts
const baseConfig: NextConfig = {
  generateBuildId: () => 'production',  // ADD THIS
  // ... rest of config
}
```

**When to Apply**: After verifying current optimizations work

**Status**: ⏸️ Future

---

### 7. Optimize CSS
**File**: `next.config.ts`
**Time**: 1 minute
**Impact**: Low-Medium - Smaller CSS bundles

**Change**:
```ts
experimental: {
  // ... existing
  optimizeCss: true,  // ADD THIS
}
```

**When to Apply**: After verifying current optimizations work

**Status**: ⏸️ Future

---

## Priority 4: Long-Term (Post-Migration)

### 8. Re-enable Image Optimization
**File**: `next.config.ts`
**Condition**: After replacing Squarespace CDN images with local assets

**Change**:
```ts
images: {
  unoptimized: false,  // REMOVE THIS
  // Keep formats, deviceSizes, imageSizes
  // Remove remotePatterns once all images are local
}
```

**When to Apply**: After local image migration is complete

**Status**: ⏸️ Blocked (waiting for local image migration)

---

### 9. Clean Up Image Config
**File**: `next.config.ts`
**Condition**: After all images are migrated to local

**Remove** (wasted config with unoptimized: true):
- `formats: ['image/avif', 'image/webp']` - Not used when unoptimized
- `deviceSizes: [...]` - Not used when unoptimized
- `imageSizes: [...]` - Not used when unoptimized
- `remotePatterns: [...]` - Not needed if all images are local

**When to Apply**: After local image migration is complete

**Status**: ⏸️ Blocked (waiting for local image migration)

---

## Optimizations NOT Recommended for Netlify

### ❌ Don't Use: `output: 'standalone'`

**Why Not**:
- Netlify runs `next build` and serves static files
- Standalone output is for self-hosted Node.js servers
- Netlify doesn't need standalone server bundle
- Would add unnecessary complexity

**Use Instead**: Keep default output (what you have now)

---

## Current Build Configuration

```ts
const baseConfig: NextConfig = {
  reactStrictMode: true,

  // Image config (temporary workaround)
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],  // Wasted with unoptimized
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],  // Wasted
    imageSizes: [16, 32, 48, 64, 96],  // Wasted
    remotePatterns: [{ protocol: 'https', hostname: 'images.squarespace-cdn.com' }],
  },

  // Experimental
  experimental: {
    cpus: Math.max(1, 2),
    optimizePackageImports: ['framer-motion', 'lucide-react'],  // Missing @heroicons/react
  },

  // Other
  turbopack: {},
  httpAgentOptions: { keepAlive: true },
  compress: true,
}
```

---

## Quick Start for New Session

### Apply Optimizations Now:
```bash
# 1. Edit next.config.ts
# Add: poweredByHeader: false
# Add: '@heroicons/react' to optimizePackageImports array

# 2. Test locally
npm run build

# 3. If successful, commit
git add next.config.ts
git commit -m "perf: apply high-impact build optimizations"
git push origin main

# 4. Wait for Netlify deploy
# Verify site still works
```

---

## Monitoring & Verification

### After Each Deployment:
- [ ] Build completes successfully
- [ ] No new warnings
- [ ] Site loads correctly
- [ ] Images display properly
- [ ] Console shows no errors
- [ ] Bundle size hasn't increased significantly

### Track Bundle Sizes:
```bash
# Occasionally run to monitor changes
ANALYZE=true npm run build
```

Expected result: Next.js app will show bundle analyzer report.

---

## Build Performance Metrics

### Current Build Time: ~14s
**Goal**: Maintain or improve with optimizations

### Bundle Size:
- Current: Unknown (run `ANALYZE=true npm run build` to measure)
- Goal: No significant increase with optimizations
- Target: <500KB for main bundle (reasonable for this app)

---

## Related Files

- `next.config.ts` - Build configuration
- `netlify.toml` - Netlify deployment config
- `BUILD_OPTIMIZATIONS.md` - Detailed optimization recommendations
- `IMAGE_FIX_EXECUTION.md` - Image fix documentation
- `IMAGE_FIX_PLAN.md` - Image migration strategy

---

## Last Updated
January 10, 2026

## Next Action
Apply Priority 1 tasks (Quick Wins) now.
