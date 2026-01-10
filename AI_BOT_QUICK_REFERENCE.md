# AI Bot Improvement Plan - Quick Reference

**Quick Summary**: Current bot has ~40% accuracy. Improvements target 75%+ accuracy.

---

## Current Issues (Quick List)

1. ❌ Simple keyword matching - Only matches exact words
2. ❌ No conversation memory - Can't follow up on topics
3. ❌ Fixed 1000ms delay - Always same speed
4. ❌ No fuzzy matching - Misses variations like "price" vs "cost"
5. ❌ Single FAQ match - Returns first, not best
6. ❌ Only 4 response patterns - Feels robotic
7. ❌ No ambiguity handling - Confused users stay confused

---

## Priority Improvements (Highest Impact First)

### Phase 1: Enhanced Matching (WEEK 1) - +60% accuracy

**What**: Replace simple `.includes()` with scoring algorithm

**Before**:
```typescript
const relevantFAQ = faqs.find(faq =>
  question.toLowerCase().includes('services') ||
  question.toLowerCase().includes('cost')
)
```

**After**:
```typescript
const findBestFAQ = (question: string, faqs: FAQItem[]): FAQItem | null => {
  const scored = faqs.map(faq => ({
    faq,
    score: calculateMatchScore(question, faq) // 0-100 score
  }))

  scored.sort((a, b) => b.score - a.score)
  return scored[0].score > 20 ? scored[0].faq : null
}
```

**Impact**: "What services" → Gets best match, not first
**Risk**: Low - pure logic, no UI changes

---

### Phase 2: Conversation Context (WEEK 2) - +40% flow quality

**What**: Remember last 5 questions and topics discussed

**Implementation**:
```typescript
const [context, setContext] = useState({
  topics: [],           // Discussed topics
  recentQuestions: [],  // Last 5 questions
  followUpCount: 0     // Follow-up depth
})
```

**Impact**:
- User: "What about residential?"
- Bot: "As I mentioned earlier, residential program includes..." ✅

**Before**: "I'd be happy to help! Let me search..." ❌

---

### Phase 3: Dynamic Delays (WEEK 2) - +20% realism

**What**: Delay varies by question length and context

**Before**: Always 1000ms
**After**: 800-2000ms based on complexity

**Impact**: Short questions feel faster, long questions feel thoughtful

---

### Phase 4: Natural Responses (WEEK 3) - +30% feel

**What**: Multiple response templates with random variation

**Before**: 4 fixed patterns
**After**: 12+ dynamic templates

**Impact**: Feels less robotic, more intelligent

---

### Phase 5: Follow-Up Suggestions (WEEK 3) - +15% engagement

**What**: After answering, show 2-3 related topics

**UI**:
```
Bot: "Our residential program includes daily living skills..."
     [You might also be interested in:]
     • Day Services program
     • Targeted Case Management
```

**Impact**: Users discover more info without asking

---

## Testing Checklist

Before each deployment, test these scenarios:

### Basic Functionality
- [ ] "What services do you offer?" → Correct answer
- [ ] "How much does it cost?" → Correct answer
- [ ] "What are your hours?" → Correct answer
- [ ] "Can I qualify?" → Correct answer

### Fuzzy Matching
- [ ] "What's the price?" → Finds cost FAQ
- [ ] "When are you open?" → Finds hours FAQ
- [ ] "Do you help people with disabilities?" → Finds services FAQ

### Follow-Ups
- [ ] Q: "What services?" → A: "Residential, Day, Case Mgmt"
- [ ] Q: "And residential?" → A: "Residential program includes..." (uses context)
- [ ] Q: "What about eligibility?" → A: "As mentioned, eligibility requires..." (uses context)

### Edge Cases
- [ ] "services" (ambiguous) → Asks clarification
- [ ] "help" (generic) → Offers categories
- [ ] Unknown topic → Helpful suggestions

---

## Files to Create

### 1. `components/FAQAssistant/ai-utils.ts`
- Keyword extraction
- Scoring algorithm
- Response generation
- Context management

### 2. `components/FAQAssistant/typing-indicators.tsx`
- Phase-aware typing
- Dynamic timing
- Better animations

### 3. `components/FAQAssistant/suggestion-panel.tsx`
- Related FAQs
- Topic suggestions
- Follow-up prompts

---

## Success Metrics

| Metric | Current | Target | How to Measure |
|--------|---------|--------|----------------|
| Relevant answers | 40% | 75%+ | Test with 50 sample questions |
| Context-awareness | 0% | 80%+ | Test follow-up scenarios |
| Response variety | 4 patterns | 12+ patterns | Count unique templates |
| Delay realism | Fixed | Dynamic | Measure variance |
| User satisfaction | Unknown | 80%+ | User feedback survey |

---

## Deployment Strategy

### Incremental (Recommended)

Week 1: Phase 1 (matching) → Test → Deploy
Week 2: Phase 2 (context) + Phase 3 (delays) → Test → Deploy
Week 3: Phase 4 (responses) + Phase 5 (suggestions) → Test → Deploy

**Benefits**:
- Each phase tested independently
- Lower risk per deployment
- Faster feedback loop
- Can rollback single phase if issues

### Big Bang (Not Recommended)

Implement all phases → Single test → Deploy

**Drawbacks**:
- Harder to debug if issues found
- Can't measure impact of individual improvements
- Higher risk of breaking changes
- Longer development before first deployment

---

## Quick Wins (1-2 days each)

### Win #1: Add fuzzy matching (Day 1)
```typescript
// Add to FAQAssistant.tsx
const fuzzyMatch = (question: string, faq: FAQItem): boolean => {
  const keywords = extractKeywords(question)
  const answerText = faq.answer.toLowerCase()

  return keywords.some(keyword => answerText.includes(keyword))
}
```

### Win #2: Add context tracking (Day 2)
```typescript
// Add to FAQAssistant.tsx
const [topics, setTopics] = useState<string[]>([])
const [lastQuestions, setLastQuestions] = useState<string[]>([])

const updateContext = (question: string) => {
  setTopics(prev => [...new Set([...prev, ...extractKeywords(question)])])
  setLastQuestions(prev => [...prev, question].slice(-5))
}
```

### Win #3: Variable delays (Day 2)
```typescript
// Replace fixed 1000ms with:
const delay = Math.min(Math.max(question.length * 50, 500), 1500) + Math.random() * 300
setTimeout(callback, delay)
```

---

## Rollback Plan

If issues arise:

```bash
# Quick rollback to previous implementation
git revert HEAD

# Or rollback to specific commit
git revert <commit-hash>

# Or manual rollback
# 1. Edit components/FAQAssistant.tsx
# 2. Restore old handleAskQuestion function
# 3. Test with npm run test:e2e -- e2e/tests/smoke/faq.spec.ts
# 4. Deploy fixed version
```

---

## Monitoring (Post-Deployment)

### Metrics to Track
- User question submission rate
- Average conversation length
- Follow-up question rate
- Time between messages
- Suggestion click-through rate

### User Feedback
- "Was this answer helpful?" (5-star rating)
- "Would you like to speak to someone?" (escalation)
- Comment field for improvements

### Error Tracking
- Questions with no matches
- Negative user feedback
- Escalation requests

---

**Full Details**: See `AI_BOT_IMPROVEMENT_PLAN.md`
