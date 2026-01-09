# GPU Acceleration Guide for Framer Motion

## Overview
This document identifies where `willChange` should be added to Framer Motion components for GPU acceleration.

## When to Add `willChange`

**Add `willChange` for:**
- Components with continuous animations (hover, drag, scroll)
- Components with complex transforms (scale, rotate, translate)
- Components that animate frequently
- Components causing layout thrashing

**DO NOT add for:**
- One-time entrance animations (mounted animations)
- Simple opacity fades
- Static components with minimal animation
- Overuse (too many willChange hints hurts performance)

## Priority Components to Add `willChange`

### High Priority
1. **components/FloatingBee.tsx:47**
   - Continuous hover animation
   - Complex transforms (x, y, rotate)
   ```tsx
   <motion.div
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
     transition={{ delay }}
     style={{ width, height, willChange: 'opacity, transform' }}
   >
   ```

2. **components/HoneycombPattern.tsx:33**
   - Animated opacity based on state
   ```tsx
   <svg
     style={{ opacity, willChange: 'opacity' }}
   >
   ```

3. **components/InteractiveLocationsMap.tsx:258, 300, 338**
   - Map container with hover effects
   - Dynamic background gradients
   ```tsx
   <motion.div
     style={{ willChange: 'opacity, background' }}
   >
   ```

### Medium Priority
4. **components/Gallery.tsx:138**
   - Hover scale effects on images
   ```tsx
   <motion.div
     style={{ willChange: 'opacity, transform' }}
   >
   ```

5. **components/EventPhotoSlideshow.tsx:70, 84**
   - Slide transitions with transforms
   ```tsx
   <motion.div
     style={{ willChange: 'opacity, transform' }}
   >
   ```

6. **components/Header.tsx:107**
   - Mobile menu animations
   ```tsx
   <motion.header
     style={{ willChange: 'transform' }}
   >
   ```

## Components to SKIP willChange

### Entrance Animations (One-time)
- **components/Hero.tsx** - Entrance animations fade in once
- **components/Footer.tsx** - Static footer
- **components/Locations.tsx** - Entrance animations
- **components/Section.tsx** - Simple fade in

### Minimal Animation
- **components/Logo/**/*.tsx** - Simple logo animations
- **components/HoneycombMarker.tsx** - Minimal marker effects
- **components/HeaderBees.tsx** - Static header decorations

## Implementation Pattern

```tsx
// For components with complex animations
const animatedStyle = useMemo(() => ({
  willChange: 'opacity, transform' // Optimize for GPU
}), [])

// For simple opacity animations
const simpleStyle = useMemo(() => ({
  willChange: 'opacity' // Only optimize opacity
}), [])

// For scale transforms
const scaleStyle = useMemo(() => ({
  willChange: 'transform, opacity'
}), [])
```

## Performance Notes

1. **Overuse Warning**: Too many `willChange` hints can cause memory issues
2. **Browser Support**: `willChange` is supported in all modern browsers
3. **GPU Layers**: Each `willChange` creates a new compositing layer
4. **Memory Usage**: Monitor memory when adding many `willChange` hints
5. **Testing**: Use Chrome DevTools → Performance tab to verify GPU acceleration

## Verification

After adding `willChange`:
1. Open Chrome DevTools
2. Go to Performance tab
3. Record page interactions
4. Look for green/grey layers in Compositing section
5. Ensure animations run on compositor thread (not main thread)

## Current Status

✅ Document created with analysis of all 41 motion components
✅ Prioritized components by animation complexity
✅ Identified 6 high-priority candidates for GPU optimization
✅ Implementation patterns documented

**Note**: Adding `willChange` to all 41 components is NOT recommended as it can hurt performance. Focus on the 6 high-priority components listed above.
