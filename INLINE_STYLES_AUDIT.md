# Inline Styles Audit

## Files with Inline Styles (21 occurrences)

### 1. FloatingBee.tsx (1 occurrence)
- Line 48: `style={{ width, height }}`
- **Issue**: New object created on every render
- **Fix**: Use Tailwind with dynamic width/height or useMemo

### 2. HoneycombPattern.tsx (1 occurrence)
- Line 33: `style={{ opacity }}`
- **Issue**: New object on every render
- **Fix**: Use `className="opacity-[${opacity}]"` with Tailwind JIT

### 3. Map.tsx (1 occurrence)
- Line 35: `style={{ height: '100%', width: '100%' }}`
- **Issue**: Static object, can be Tailwind
- **Fix**: `className="h-full w-full"`

### 4. HoneycombMarker.tsx (3 occurrences)
- Line 25: `style={{ width: size, height: size }}`
- Line 32: `style={{ backgroundColor: color }}`
- Line 50: `style={{ filter: isActive ? 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.6))' : 'none' }}`
- **Issue**: Multiple dynamic styles
- **Fix**: Use useMemo for all dynamic styles

### 5. HeaderBees.tsx (1 occurrence)
- Line 43: Complex inline style object
- **Issue**: Inline style object
- **Fix**: Convert to Tailwind or useMemo

### 6. InteractiveLocationsMap.tsx (3 occurrences)
- Line 118: `style={{ background: 'linear-gradient(...)' }}`
- Line 258: Complex style object
- Line 300: Complex style object
- Line 352: `style={{ height: '100%', width: '100%' }}`
- **Issue**: Mix of static and dynamic styles
- **Fix**: Convert static to Tailwind, dynamic to useMemo

### 7. LogoContainer.tsx (1 occurrence)
- Line 69: Complex inline style
- **Issue**: Inline style
- **Fix**: Convert to Tailwind or useMemo

### 8. Logo3D.tsx (2 occurrences)
- Line 135: `style={{ width: size, height: size }}`
- Line 143: `style={{ width: size, height: size }}`
- **Issue**: Duplicate dynamic styles
- **Fix**: Use useMemo

### 9. Logo/HoneycombPattern.tsx (3 occurrences)
- Line 122: `style={{ transformOrigin: ... }}`
- Line 150: `style={{ filter: 'blur(2px)' }}`
- Line 168: Complex style object
- **Issue**: Mix of static and dynamic
- **Fix**: Convert static to Tailwind, dynamic to useMemo

### 10. AnimatedLogo.tsx (2 occurrences)
- Line 79: `style={{ transformOrigin: '40px 45px' }}`
- Line 94: `style={{ filter: 'blur(0.5px)' }}`
- Line 183: `style={{ transformOrigin: '60px 45px' }}`
- Line 196: `style={{ filter: 'blur(0.5px)' }}`
- **Issue**: Static inline styles
- **Fix**: Convert to Tailwind with arbitrary values

## Total: 21 inline style occurrences across 10 files
