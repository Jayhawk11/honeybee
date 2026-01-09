# Image Inventory Analysis

## Current State
**Total Images**: 19 files
**Total Size**: ~10.2 MB
**Optimization Potential**: ~7-8 MB (70-80% reduction)

## Used Images (Referenced in Code)

| File | Size | Location | Usage |
|------|------|----------|-------|
| /images/og-image.svg | 4.4K | app/layout.tsx | OpenGraph meta image |
| /images/logo-icon.png | 843K | data/services.ts | Services page icon |
| /assets/kc-police-station.jpg | 454K | EventPhotoSlideshow.tsx | Event slideshow |
| /assets/union-station.jpg | 1.1M | EventPhotoSlideshow.tsx | Event slideshow |
| /assets/renaissance-festival.jpg | 452K | EventPhotoSlideshow.tsx | Event slideshow |

**Subtotal**: 2.8 MB (used)

## Unused / Duplicate Images

| File | Size | Issue |
|------|------|-------|
| /gallery-events/union-station.jpg | 1.1M | Duplicate of /assets/ |
| /gallery-events/kc-police.jpg | 463K | Duplicate of /assets/ |
| /gallery-events/renaissance-festival.jpg | 452K | Duplicate of /assets/ |
| /buzzy/ entire folder | 5.8M | Scraped FB photos, not referenced |

**Subtotal**: 7.8 MB (unused/duplicates)

## Optimization Plan

### Phase 1: Delete Unused (Immediate - 7.8 MB savings)
- [ ] Delete /gallery-events/ folder (3 files, ~2MB)
- [ ] Delete /buzzy/ folder (16 files, ~5.8MB)

### Phase 2: Compress Used Images (1.5-1.8 MB savings)
- [ ] logo-icon.png: 843K → <50KB (SVG or WebP)
- [ ] kc-police-station.jpg: 454K → ~90KB (80%)
- [ ] union-station.jpg: 1.1M → ~220KB (80%)
- [ ] renaissance-festival.jpg: 452K → ~90KB (80%)

**Expected Final Size**: ~450KB (from 10.2 MB)
**Total Savings**: ~9.8 MB (96% reduction)
