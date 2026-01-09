# Refactoring Execution Plan

## Executive Summary

Based on comprehensive codebase analysis, identified **~1020 lines of duplicate code** across **40+ files** and numerous performance/complexity issues. This plan prioritizes highest-impact, lowest-effort improvements first.

---

## Top 10 Refactoring Recommendations (Ranked by Impact)

### 1. **Consolidate Duplicate Animation Usage** ⚡⚡⚡
**Impact**: **VERY HIGH** | **Effort**: **VERY LOW**
**Benefit**: Reduce ~400 lines, improve consistency

**Current State**: 92+ inline `motion.div` definitions with same patterns across 18 files

**Solution**: Use existing animation components from `lib/animations.tsx`:
- FadeIn
- FadeInLeft
- FadeInRight
- StaggeredContainer

**Files Affected**: 18 files
**Estimated Time**: 2 hours

---

### 2. **Create ServiceCard Component** ⚡⚡⚡
**Impact**: **VERY HIGH** | **Effort**: **VERY LOW**
**Benefit**: Reduce ~120 lines, improve maintainability

**Current State**: Identical card rendering pattern duplicated in 4 service pages

**Solution**: Extract to `components/ui/ServiceCard.tsx`:
```tsx
interface ServiceCardProps {
  title: string
  description: string
  icon: React.ComponentType
  gradient: string
  index: number
}

export function ServiceCard({ title, description, icon: Icon, gradient, index }: ServiceCardProps) {
  return (
    <FadeIn delay={index * 0.05}>
      <div className={gradient}>
        <div className="icon-box"><Icon /></div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </FadeIn>
  )
}
```

**Files Affected**:
- `app/services/page.tsx`
- `app/services/residential/page.tsx`
- `app/services/day-services/page.tsx`
- `app/services/targeted-case-management/page.tsx`

**Estimated Time**: 1.5 hours

---

### 3. **Extract Location Data** ⚡⚡⚡
**Impact**: **VERY HIGH** | **Effort**: **VERY LOW**
**Benefit**: Eliminate ~40 lines duplication, single source of truth

**Current State**: Same location data in 2 files

**Solution**: Create `data/locations.ts`:
```typescript
export const locations = [
  {
    name: 'Overland Park',
    address: '123 Main St',
    coordinates: [39.016, -94.739],
    hours: 'Mon-Fri 8am-5pm',
    services: ['Day Supports', 'Community Activities', 'Skills Training']
  },
  {
    name: 'Olathe',
    address: '456 Oak Ave',
    coordinates: [38.881, -94.819],
    hours: 'Mon-Fri 8am-5pm',
    services: ['HCBS IDD Waiver Services', 'Residential Supports', 'Targeted Case Management']
  }
]
```

**Files Affected**:
- `components/InteractiveLocationsMap.tsx`
- `components/Locations.tsx`

**Estimated Time**: 30 minutes

---

### 4. **Consolidate HoneycombPattern** ⚡⚡
**Impact**: **HIGH** | **Effort**: **VERY LOW**
**Benefit**: Eliminate 60 lines of duplicate code

**Current State**: Two completely different implementations
- `components/HoneycombPattern.tsx` (60 lines) - Simple version
- `components/Logo/HoneycombPattern.tsx` (190 lines) - Complex animated version

**Solution**: Keep the complex version in Logo folder, delete the simple root version

**Files Affected**:
- Delete: `components/HoneycombPattern.tsx`
- Update: `components/Logo/index.tsx` to use Logo version only

**Estimated Time**: 30 minutes

---

### 5. **Create Container Component** ⚡⚡
**Impact**: **HIGH** | **Effort**: **LOW**
**Benefit**: Reduce ~150 lines, consistent layout

**Current State**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` repeated 26+ times across 15 files

**Solution**: Create `components/layout/Container.tsx`:
```tsx
export function Container({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className || ''}`}>
      {children}
    </div>
  )
}
```

**Files Affected**: 15 files
**Estimated Time**: 1 hour

---

### 6. **Extract FAQ Data** ⚡⚡
**Impact**: **HIGH** | **Effort**: **LOW**
**Benefit**: Reduce component complexity, better testability

**Current State**: 100 lines of FAQ data embedded in 461-line component

**Solution**: Create `data/faqs.ts`:
```typescript
export interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

export const faqs: FAQItem[] = [
  // ... move all 15 FAQ items here
]
```

Update `components/FAQAssistant.tsx` to import data.

**Estimated Time**: 1 hour

---

### 7. **Split FAQAssistant Component** ⚡
**Impact**: **HIGH** | **Effort**: **MEDIUM**
**Benefit**: Reduce complexity from 461 lines to <200 lines each, easier maintenance

**Current State**: Single component handling 5+ concerns (FAQ list, search, filter, categories, AI chat)

**Solution**: Split into:
- `components/FAQAssistant.tsx` (main orchestrator)
- `components/FAQList.tsx` (FAQ display and accordion)
- `components/FAQChat.tsx` (AI chat interface)
- `data/faqs.ts` (FAQ data)

**Estimated Time**: 3 hours

---

### 8. **Split InteractiveLocationsMap** ⚡
**Impact**: **HIGH** | **Effort**: **MEDIUM**
**Benefit**: Reduce 413 lines to <200 lines each, better separation of concerns

**Current State**: Handles map, markers, cards, popups, filtering (5+ concerns)

**Solution**: Split into:
- `components/InteractiveLocationsMap.tsx` (main orchestrator)
- `components/LocationCard.tsx` (location card display)
- `components/LocationMap.tsx` (map rendering)
- `lib/marker-creator.ts` (custom marker creation utility)
- `data/locations.ts` (shared location data)

**Estimated Time**: 3 hours

---

### 9. **Add Performance Optimizations** ⚡
**Impact**: **MEDIUM-HIGH** | **Effort**: **MEDIUM**
**Benefit**: Reduce unnecessary re-renders, improve UX

**High Priority** (apply to 20+ components):
1. Wrap components with `React.memo`:
   - Header, Gallery, FAQAssistant, InteractiveLocationsMap
   - All Logo sub-components
   - All page components

2. Use `useCallback` for event handlers (15+ instances):
   - Header: handleScroll, toggleTheme, menu handlers
   - Gallery: openLightbox, closeLightbox, navigation
   - FAQAssistant: handleAskQuestion, handleSuggestedClick

3. Add `useMemo` for computed values (6+ instances):
   - Gallery: filteredImages
   - FAQAssistant: filteredFAQs, searchedFAQs
   - Move static objects outside components

**Medium Priority**:
4. Fix Three.js imports (tree-shakable)
5. Add prefetch to navigation links
6. Code split large components

**Estimated Time**: 4 hours

---

### 10. **Fix Type Safety Issues** ⚡
**Impact**: **MEDIUM** | **Effort**: **LOW**
**Benefit**: Better developer experience, catch errors earlier

**Issues Found**:
- 19 instances of 'any' type (mostly in E2E test files)
- 15 functions missing return types
- Unnecessary type assertions

**Solution**:
1. Add proper type imports to E2E files
2. Add return types to exported functions
3. Replace type assertions with proper types

**Estimated Time**: 2 hours

---

## Execution Plan

### Phase 1: Quick Wins (Day 1)
**Goal**: Implement 5 highest-impact, lowest-effort changes

| Task | Time | Priority |
|------|------|----------|
| Consolidate HoneycombPattern | 30m | P0 |
| Extract location data | 30m | P0 |
| Create ServiceCard component | 1.5h | P0 |
| Create Container component | 1h | P0 |
| Extract FAQ data | 1h | P0 |

**Expected Outcome**:
- Reduce ~270 lines of duplicate code
- Create 2 new reusable components
- Improve 8+ files immediately

---

### Phase 2: Component Splitting (Day 2)
**Goal**: Reduce complexity of large components

| Task | Time | Priority |
|------|------|----------|
| Split FAQAssistant into 3 components | 3h | P1 |
| Split InteractiveLocationsMap into 3 parts | 3h | P1 |
| Create FormField wrapper component | 1.5h | P2 |

**Expected Outcome**:
- Reduce FAQAssistant from 461 → <200 lines
- Reduce InteractiveLocationsMap from 413 → <200 lines
- Create 3 new form utilities

---

### Phase 3: Performance Optimization (Day 3)
**Goal**: Add memoization and reduce re-renders

| Task | Time | Priority |
|------|------|----------|
| Add React.memo to top 10 components | 2h | P1 |
| Add useCallback to event handlers | 1.5h | P1 |
| Add useMemo for computed values | 1h | P1 |
| Move static objects outside components | 1h | P2 |

**Expected Outcome**:
- 20+ components memoized
- 15+ callbacks stabilized
- Significant re-render reduction

---

### Phase 4: Type Safety & Polish (Day 4)
**Goal**: Improve type safety and code quality

| Task | Time | Priority |
|------|------|----------|
| Fix 'any' type usage in E2E files | 1h | P2 |
| Add return types to exported functions | 1h | P2 |
| Replace animation inline usage | 1h | P3 |
| Update tests for refactored code | 1h | P3 |

**Expected Outcome**:
- Eliminate 'any' types
- Full type coverage
- Consistent animation patterns

---

## Expected Impact

### Code Reduction
| Phase | Lines Removed | Components Created |
|-------|---------------|-------------------|
| Phase 1 | ~270 | 2 |
| Phase 2 | ~450 | 5 |
| Phase 3 | ~0 (reorg) | 0 |
| Phase 4 | ~300 | 0 |
| **Total** | **~1020** | **7** |

### Performance Improvements
- **Re-render reduction**: 60-80% in memoized components
- **Bundle size**: 5-10% reduction from tree-shakable imports
- **Time to interactive**: 15-25% improvement

### Maintainability Improvements
- **Component complexity**: Reduced by average 50%
- **Code duplication**: Eliminated ~1000 lines
- **Type safety**: 95%+ coverage

---

## Risk Assessment

### Low Risk
- Consolidating HoneycombPattern
- Extracting location data
- Creating Container component
- Adding React.memo/useCallback

### Medium Risk
- Splitting large components (may introduce bugs)
- Extracting FAQ data (need careful testing)
- Changing animation patterns

### Mitigation Strategy
1. Implement changes incrementally
2. Test each phase before proceeding
3. Keep old code commented initially
4. Run E2E tests after each phase
5. Use feature flags for major changes

---

## Success Criteria

### Phase 1 Complete
- [ ] 5 new components/data files created
- [ ] 8+ files refactored to use them
- [ ] Build passes without errors
- [ ] All E2E tests pass

### Phase 2 Complete
- [ ] FAQAssistant split into 3 components
- [ ] InteractiveLocationsMap split into 3 components
- [ ] FormField wrapper created
- [ ] Build passes, tests pass

### Phase 3 Complete
- [ ] 10+ components wrapped in React.memo
- [ ] 15+ event handlers use useCallback
- [ ] 5+ computed values use useMemo
- [ ] No performance regressions

### Phase 4 Complete
- [ ] All 'any' types replaced
- [ ] All exported functions have return types
- [ ] All inline animations replaced
- [ ] Full test suite passes

---

## Rollback Plan

If any phase introduces critical issues:
1. Revert that phase's git commit
2. Identify root cause
3. Create hotfix branch
4. Implement alternative approach
5. Re-run affected tests

---

## File Structure After Refactoring

```
components/
├── ui/                    [NEW] Reusable UI components
│   ├── ServiceCard.tsx
│   ├── Container.tsx
│   └── FormField.tsx
├── FAQAssistant.tsx         [REFACTORED] Main orchestrator
├── FAQList.tsx            [NEW] FAQ display
├── FAQChat.tsx             [NEW] AI chat interface
├── InteractiveLocationsMap.tsx [REFACTORED] Main orchestrator
├── LocationCard.tsx         [NEW] Location display
├── LocationMap.tsx          [NEW] Map rendering
└── [Existing components...]
data/                        [NEW] Shared data
├── locations.ts
├── faqs.ts
└── [Other data...]
lib/
├── animations.tsx           [ENHANCED] Used everywhere
├── marker-creator.ts        [NEW] Utility
└── [Existing utilities...]
```

---

## Next Steps

**Immediate** (Today):
1. Review and approve this plan
2. Start Phase 1 with HoneycombPattern consolidation
3. Extract location data

**This Week**:
4. Complete Phase 1 (Day 1)
5. Complete Phase 2 (Day 2)
6. Complete Phase 3 (Day 3)
7. Complete Phase 4 (Day 4)

**Next Sprint**:
8. Monitor performance metrics
9. Address any regressions
10. Consider Phase 5 (advanced optimizations)

---

**Document Version**: 1.0
**Created**: January 9, 2026
**Owner**: Development Team
**Review Required**: Yes, before execution

---

## Appendix: Detailed Analysis Summary

### Code Duplication Analysis
- **Total duplicated lines**: ~1020
- **Files affected**: 40+
- **Top duplication types**: Animation patterns, service cards, location data

### Complexity Analysis
- **Files >300 lines**: 6 (FAQAssistant, InteractiveLocationsMap, Gallery, history, 3 service pages)
- **Files >200 lines**: 5 (services, our-vision, Logo components)
- **Top concerns**: Navigation, maps, forms

### Performance Analysis
- **Components missing memo**: 20+
- **Event handlers not memoized**: 15+
- **Bundle size opportunities**: Three.js imports, code splitting

### Type Safety Analysis
- **'any' type usage**: 19 (mostly E2E)
- **Missing return types**: 15 functions
- **Unnecessary assertions**: 14

**Overall Health Score**: 6.5/10 (Good, with clear improvement path)
