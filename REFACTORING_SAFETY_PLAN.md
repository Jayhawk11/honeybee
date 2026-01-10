# Refactoring Plan with Safety Strategies

## Executive Summary

This document outlines a comprehensive refactoring strategy with multiple safety nets to ensure no regressions occur during the refactoring process.

## Safety-First Approach

### Three Pillars of Safety

1. **Test-Driven Refactoring**: Tests must pass before and after changes
2. **Incremental Progress**: Small, atomic commits that preserve functionality
3. **Rollback Readiness**: Easy reversal at any stage

---

## Refactoring Opportunity #1: FAQAssistant Component Extraction

### Current State
- **File**: `components/FAQAssistant.tsx` (461 lines)
- **Responsibilities**: 8 distinct concerns in single component
- **State Variables**: 8 (activeCategory, activeFAQ, searchQuery, chatMessages, isTyping, suggestedIndex, chatInput, filteredFAQs, searchedFAQs)
- **Test Coverage**: E2E tests in `e2e/tests/smoke/faq.spec.ts` (15 tests)

### Target Structure
```
components/
  ├── FAQAssistant/
  │   ├── index.tsx                 # Main orchestrator (imported by app/page.tsx)
  │   ├── FAQList.tsx              # FAQ accordion display
  │   ├── FAQSearch.tsx            # Search input and filtering logic
  │   ├── FAQCategories.tsx        # Category filter buttons
  │   ├── AIChat.tsx              # Chat interface with typing indicator
  │   └── FAQSuggestedQuestions.tsx # Suggested question buttons
  └── data/
      └── faqs.ts                 # Extracted FAQ data
```

### Safety Strategy: Phase-by-Phase Extraction

#### Phase 1: Prepare Safety Net (DO FIRST)
**Time Estimate**: 30 minutes

1. **Create Baseline E2E Test Run**
   ```bash
   # Run all FAQ tests and save results
   npm run test:e2e -- e2e/tests/smoke/faq.spec.ts --reporter=json --reporter-file=test-results/faq-baseline.json
   ```

2. **Create Visual Regression Test**
   ```bash
   # Take screenshot of FAQ section before changes
   npx playwright codegen http://localhost:3000/#faq --output=faq-screenshots/baseline.png
   ```

3. **Document Current Behavior**
   Create `REFACTORING_NOTES/faq-current-behavior.md`:
   - List all user interactions (search, filter, chat, accordion)
   - Note all keyboard shortcuts (Escape, Enter, Arrow keys)
   - Document animation timings
   - Record all data-testid attributes

**Acceptance Criteria**: ✅ Baseline tests pass and documented

#### Phase 2: Extract FAQ Data (LOW RISK)
**Time Estimate**: 20 minutes

**Action**:
1. Move `const faqs = [...]` to `data/faqs.ts`
2. Update import in FAQAssistant.tsx
3. Export type `FAQItem` from data file

**Verification**:
```bash
npm run lint
npm run test:e2e -- e2e/tests/smoke/faq.spec.ts
```

**Rollback Plan**: Delete `data/faqs.ts`, restore array in component

**Acceptance Criteria**: ✅ All tests pass, no visual changes

#### Phase 3: Extract FAQSuggestedQuestions (LOW RISK)
**Time Estimate**: 25 minutes

**Action**:
1. Create `FAQSuggestedQuestions.tsx` component
2. Props: `suggestedQuestions: string[]`, `onQuestionClick: (q: string) => void`
3. Move suggested questions array to data file
4. Replace JSX in FAQAssistant

**Verification**:
```bash
npm run lint
npm run test:e2e -- e2e/tests/smoke/faq.spec.ts
```

**Rollback Plan**: Delete component, restore inline JSX

**Acceptance Criteria**: ✅ All FAQ tests pass, suggested questions clickable

#### Phase 4: Extract FAQCategories (LOW RISK)
**Time Estimate**: 30 minutes

**Action**:
1. Create `FAQCategories.tsx` component
2. Props: `categories: string[]`, `activeCategory: string`, `onCategoryClick: (c: string) => void`
3. Move category filtering logic
4. Maintain all data-testid attributes

**Verification**:
```bash
npm run test:e2e -- e2e/tests/smoke/faq.spec.ts
```

**Rollback Plan**: Delete component, restore inline JSX

**Acceptance Criteria**: ✅ Category filtering tests pass

#### Phase 5: Extract FAQSearch (MEDIUM RISK)
**Time Estimate**: 35 minutes

**Action**:
1. Create `FAQSearch.tsx` component
2. Props: `searchQuery: string`, `onSearchChange: (q: string) => void`, `onClear: () => void`
3. Extract search logic (filtering happens in parent, UI in child)
4. Ensure aria-labels preserved

**Verification**:
```bash
npm run test:e2e -- e2e/tests/smoke/faq.spec.ts
```

**Rollback Plan**: Delete component, restore inline JSX

**Acceptance Criteria**: ✅ Search tests pass, clear button works

#### Phase 6: Extract FAQList (MEDIUM RISK)
**Time Estimate**: 40 minutes

**Action**:
1. Create `FAQList.tsx` component
2. Props: `faqs: FAQItem[]`, `activeFAQ: string | null`, `onFAQToggle: (id: string) => void`
3. Move accordion animation logic
4. Preserve AnimatePresence behavior

**Verification**:
```bash
npm run test:e2e -- e2e/tests/smoke/faq.spec.ts
```

**Rollback Plan**: Delete component, restore inline JSX

**Acceptance Criteria**: ✅ Accordion expand/collapse tests pass

#### Phase 7: Extract AIChat (MEDIUM RISK)
**Time Estimate**: 45 minutes

**Action**:
1. Create `AIChat.tsx` component
2. Props: `messages: Message[]`, `isTyping: boolean`, `onSend: (msg: string) => void`
3. Move chat UI and message rendering
4. Keep simulation logic in parent (for now)

**Verification**:
```bash
npm run test:e2e -- e2e/tests/smoke/faq.spec.ts
```

**Rollback Plan**: Delete component, restore inline JSX

**Acceptance Criteria**: ✅ Chat interface tests pass

#### Phase 8: Update Main Orchestrator (LOW RISK)
**Time Estimate**: 20 minutes

**Action**:
1. Import all new components
2. Replace inline JSX with component calls
3. Keep all state management in FAQAssistant

**Verification**:
```bash
npm run test:e2e -- e2e/tests/smoke/faq.spec.ts
npm run lint
npm run build
```

**Rollback Plan**: Revert orchestrator, restore inline JSX

**Acceptance Criteria**: ✅ All tests pass, build succeeds

#### Phase 9: Final Validation (CRITICAL)
**Time Estimate**: 30 minutes

**Actions**:
1. **Run Full Test Suite**
   ```bash
   npm run test:e2e
   ```

2. **Visual Regression Check**
   ```bash
   # Compare new screenshots with baseline
   # If different: verify all differences are intentional
   ```

3. **Accessibility Test**
   ```bash
   npm run test:e2e -- e2e/tests/accessibility/accessibility.spec.ts
   ```

4. **TypeScript Check**
   ```bash
   npx tsc --noEmit
   ```

5. **Manual QA**
   - Test all FAQ interactions
   - Verify animations work
   - Test keyboard navigation
   - Verify screen reader compatibility

**Acceptance Criteria**: ✅ All tests pass, no visual regressions, accessibility intact

### Total Time Estimate: ~4 hours (spread across commits)

---

## Refactoring Opportunity #2: Centralize Hardcoded Data

### Current State
Hardcoded data arrays scattered across 12+ files:
- `components/FAQAssistant.tsx`: 15 FAQ items
- `components/Gallery.tsx`: 8 gallery images
- `app/history/page.tsx`: Timeline events, impact stats, founder story
- `app/services/*.tsx`: Multiple service/feature arrays

### Safety Strategy: Incremental Data Extraction

#### Approach: One File at a Time

**Rule**: Never extract data from multiple files in one commit

#### Data Extraction Template

For each file:

1. **Create Data File** (e.g., `data/gallery.ts`)
   ```typescript
   export const galleryImages = [...]
   ```

2. **Update Component Import**
   ```typescript
   import { galleryImages } from '@/data/gallery'
   ```

3. **Verify**
   ```bash
   npm run lint
   npm run test:e2e
   npm run build
   ```

4. **Commit**
   ```bash
   git add .
   git commit -m "refactor: Extract gallery data to data/gallery.ts"
   ```

**Order of Operations** (safest first):

1. ✅ `data/faqs.ts` (already done in Phase 2 of #1)
2. ✅ `data/gallery.ts` (low impact, well-tested)
3. ✅ `data/history.ts` (history page tested in navigation.spec.ts)
4. ✅ `data/services.ts` (combine all service data)
5. ✅ `data/content.ts` (miscellaneous content)

### Verification Strategy

After each data extraction:

1. **E2E Regression Test**
   ```bash
   npm run test:e2e
   ```

2. **Content Validation**
   - Manual check that all data displays correctly
   - Verify no data loss (count items before/after)
   - Check all alt texts present

3. **Build Verification**
   ```bash
   npm run build
   ```

### Rollback Plan for Each Extraction

```bash
# If anything breaks:
git revert HEAD
# or
git reset --hard HEAD~1
```

### Benefits Achieved

- Content updates without code changes ✅
- Better separation of concerns ✅
- Easier localization support ✅
- Type safety for data structures ✅

---

## Refactoring Opportunity #3: Extract Repeated UI Patterns

### Current State
- Motion animation config repeated 20+ times
- Layout wrapper pattern (`max-w-7xl mx-auto`) repeated 27 times
- Category filtering logic duplicated in Gallery and FAQAssistant
- Border radius/styling patterns repeated 54+ times

### Safety Strategy: Conservative Pattern Extraction

#### Phase 1: Create Utility Directory (NO CODE CHANGES)

**Action**:
```bash
mkdir -p lib/utils
mkdir -p components/ui
```

**Commit**:
```bash
git add .
git commit -m "chore: Create directories for pattern extraction"
```

**Risk**: None (pure structural change)

#### Phase 2: Extract Animation Utilities (LOW RISK)

**Action**: Create `lib/animations.ts`

```typescript
// lib/animations.ts
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

export const fadeInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 20 }
}

export const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
}
```

**Strategy**:
1. Create file with utilities
2. Update ONE component to use it
3. Test
4. Commit
5. Repeat for remaining components

**Verification**:
```bash
npm run lint
npm run test:e2e -- e2e/tests/smoke/homepage.spec.ts
```

**Rollback Plan**: Delete `lib/animations.ts`, revert component changes

#### Phase 3: Extract Section Container (LOW RISK)

**Action**: Create `components/ui/Section.tsx`

```typescript
export function Section({
  children,
  className = "",
  ...props
}: { children: React.ReactNode; className?: string } & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`} {...props}>
      {children}
    </section>
  )
}
```

**Strategy**:
1. Create component
2. Update ONE page to use it
3. Test
4. Commit
5. Repeat

**Verification**:
```bash
npm run test:e2e -- e2e/tests/happy-path/navigation.spec.ts
```

**Rollback Plan**: Delete component, revert changes

#### Phase 4: Extract Category Filter (MEDIUM RISK)

**Action**: Create `components/ui/CategoryFilter.tsx`

Generic component that works for both FAQ and Gallery

```typescript
interface CategoryFilterProps {
  categories: string[]
  activeCategory: string
  onCategoryChange: (category: string) => void
  ariaLabelPrefix?: string
}
```

**Strategy**:
1. Create generic component
2. Update FAQAssistant to use it
3. Test FAQ
4. Update Gallery to use it
5. Test Gallery
6. Commit

**Verification**:
```bash
npm run test:e2e -- e2e/tests/smoke/faq.spec.ts
# Manual check gallery filtering works
```

**Rollback Plan**: Delete component, revert both components

---

## Universal Safety Strategies

### 1. Pre-Refactoring Checklist

Before ANY refactoring:

- [ ] All current tests pass (`npm run test:e2e`)
- [ ] Build succeeds (`npm run build`)
- [ ] TypeScript clean (`npx tsc --noEmit`)
- [ ] No console errors in dev mode
- [ ] E2E baseline tests recorded
- [ ] Git branch created (`git checkout -b refactor/topic-name`)

### 2. Atomic Commits

**Rule**: Each commit must be independently testable and reversible

**Commit Message Format**:
```
refactor: [component-name] - [what was done]
  - Changed X
  - Maintained Y
  - Preserved Z functionality

Tests: All E2E tests pass
```

**Example**:
```
refactor: FAQAssistant - Extract FAQSuggestedQuestions component
  - Created FAQSuggestedQuestions.tsx
  - Moved suggested questions to data/faqs.ts
  - Updated FAQAssistant to use new component
  - Preserved all data-testid attributes

Tests: npm run test:e2e -- e2e/tests/smoke/faq.spec.ts ✅
```

### 3. Test-After-Each Strategy

After EACH atomic commit:

```bash
# Step 1: Lint
npm run lint

# Step 2: Type check
npx tsc --noEmit

# Step 3: Build
npm run build

# Step 4: Run relevant E2E tests
npm run test:e2e -- e2e/tests/smoke/faq.spec.ts

# Step 5: Visual check (manual)
npm run dev
# Open localhost:3000, verify visually
```

**Failure Protocol**:

If ANY step fails:

1. **Stop immediately**
2. **Do NOT proceed**
3. **Investigate failure**
4. **Fix or rollback**
5. **Re-run all tests**

**Never proceed with failing tests.**

### 4. Progressive Testing Strategy

| Refactoring Phase | Test Scope | Expected Result |
|------------------|-------------|-----------------|
| Data extraction | All E2E tests | 100% pass |
| UI component extraction | Component-specific E2E tests | 100% pass |
| Logic extraction | Component-specific E2E tests | 100% pass |
| Final integration | Full E2E suite | 100% pass |
| Pre-merge | Full E2E + accessibility | 100% pass |

### 5. Branch Protection Strategy

```
main (protected)
  └── refactor/faq-assistant (working branch)
      ├── refactor/faq-data (merged)
      ├── refactor/faq-suggested-questions (merged)
      └── ...
```

**Merge Rules**:
- Each atomic commit pushes to working branch
- After each phase, run full test suite
- Only merge to main when ALL tests pass
- Use pull requests with review requirement

### 6. Rollback Readiness

**At All Times**:

1. **Git History Clean**
   ```bash
   git log --oneline -5
   # Should show clear, reversible commits
   ```

2. **Baseline Results Saved**
   ```bash
   test-results/
   ├── faq-baseline.json
   ├── gallery-baseline.json
   └── ...
   ```

3. **Screenshots Archived**
   ```bash
   refactoring-screenshots/
   ├── faq-before.png
   ├── faq-after.png
   └── ...
   ```

4. **Rollback Command Ready**
   ```bash
   # Quick rollback to last known good state
   git revert HEAD~N
   # or
   git reset --hard commit-hash
   ```

### 7. Automated Safety Gates

**Create CI Workflow** `.github/workflows/refactor-safety.yml`:

```yaml
name: Refactor Safety Gates

on:
  pull_request:
    branches: [main]

jobs:
  safety-checks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Run type check
        run: npx tsc --noEmit

      - name: Run linter
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Run E2E tests
        run: npm run test:e2e

      - name: Compare with baseline
        run: |
          # Compare test results with baseline
          # Fail if any regressions detected
```

### 8. Communication Strategy

**Before Starting**:
- Announce refactoring to team
- Document expected downtime (if any)
- Share this safety plan
- Get approval from stakeholders

**During Refactoring**:
- Update team on progress
- Flag any unexpected issues immediately
- Share test results after each phase

**After Completion**:
- Share summary of changes
- Document any deviations from plan
- Update team on performance improvements
- Close announcement

---

## Risk Assessment Matrix

| Refactoring | Risk Level | Mitigation |
|-------------|-------------|------------|
| FAQAssistant data extraction | 🟢 Low | Direct copy-paste, no logic changes |
| FAQSuggestedQuestions extraction | 🟢 Low | Pure UI extraction |
| FAQCategories extraction | 🟢 Low | Pure UI extraction |
| FAQSearch extraction | 🟡 Medium | Involves state props |
| FAQList extraction | 🟡 Medium | Complex animation logic |
| AIChat extraction | 🟡 Medium | Complex state management |
| Gallery data extraction | 🟢 Low | Well-tested component |
| History data extraction | 🟢 Low | Static content |
| Animation utilities | 🟢 Low | Pure extraction, one-by-one |
| Section container | 🟢 Low | Simple wrapper |
| Category filter | 🟡 Medium | Used by multiple components |

---

## Success Criteria

### Technical Success
- ✅ All E2E tests pass (100%)
- ✅ All accessibility tests pass (100%)
- ✅ Build succeeds without errors
- ✅ TypeScript compilation clean
- ✅ No visual regressions
- ✅ No console errors

### Functional Success
- ✅ All user interactions work identically
- ✅ Performance maintained or improved
- ✅ Accessibility preserved (WCAG 2.1 AA)
- ✅ Responsive design intact

### Code Quality Success
- ✅ Reduced file sizes (FAQAssistant: 461 → ~100 lines)
- ✅ Improved testability (smaller components easier to test)
- ✅ Better separation of concerns
- ✅ Reduced code duplication

---

## Emergency Rollback Procedure

If critical issues arise in production:

1. **Immediate Action**
   ```bash
   # Revert last merge
   git revert HEAD

   # Deploy emergency rollback
   npm run build
   # Deploy to production
   ```

2. **Investigation**
   - Check E2E test results
   - Review console errors
   - Analyze user reports
   - Compare with baseline

3. **Fix and Retest**
   - Create hotfix branch
   - Implement minimal fix
   - Run full test suite
   - Merge and deploy

4. **Post-Mortem**
   - Document root cause
   - Update safety procedures
   - Prevent recurrence

---

## Timeline Estimate

| Week | Tasks | Deliverables |
|-------|-------|--------------|
| Week 1 | FAQAssistant Phases 1-5 | FAQ data, suggested questions, categories, search extracted |
| Week 2 | FAQAssistant Phases 6-9 | FAQ list, AI chat, orchestrator, final validation |
| Week 3 | Data extraction | All hardcoded data centralized |
| Week 4 | Pattern extraction | UI utilities and components extracted |
| Week 5 | Testing & Polish | Full regression testing, documentation |

**Total**: 5 weeks (safe, incremental pace)

---

## Conclusion

This refactoring plan prioritizes safety above all else. By:

1. ✅ Maintaining test coverage throughout
2. ✅ Making atomic, reversible commits
3. ✅ Running tests after each change
4. ✅ Having clear rollback procedures
5. ✅ Using automated safety gates

We ensure that the refactoring improves code quality without ever introducing regressions.

**Key Principle**: If tests fail, stop. Fix before proceeding. Never compromise on safety.
