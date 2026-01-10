# FAQ Assistant Current Behavior Documentation

**Date**: 2026-01-10
**Component**: `components/FAQAssistant.tsx` (461 lines)
**Test Baseline**: 78 E2E tests passing (all browsers/viewports)

---

## Component Overview

### State Management
```typescript
const [activeCategory, setActiveCategory] = useState('All')
const [activeFAQ, setActiveFAQ] = useState<string | null>(null)
const [searchQuery, setSearchQuery] = useState('')
const [chatMessages, setChatMessages] = useState<Array<{role: 'user' | 'assistant', content: string, timestamp: number}>>([])
const [isTyping, setIsTyping] = useState(false)
const [suggestedIndex, setSuggestedIndex] = useState(0)
const [chatInput, setChatInput] = useState('')
```

**Total State Variables**: 8

---

## User Interactions

### 1. FAQ Accordion Display

**Behavior**:
- All FAQs displayed in vertical accordion format
- Each FAQ item has expandable/collapsible answer
- Clicking FAQ question toggles answer visibility
- Animated opening/closing with AnimatePresence

**Visual Elements**:
- Question text (gray-900 dark:text-white, font-semibold)
- Chat bubble emoji (💬) indicator
- Chevron arrow (▼) rotates on expand
- Answer text appears in gray-50 dark:bg-gray-900/50 background

**Data-testids**:
- Section: `data-testid="faq-section"`
- FAQ Answer: `id="faq-answer-{id}"`

**Accessibility**:
- `aria-expanded` on FAQ button
- `aria-controls` links to answer ID
- `aria-label` on category buttons

---

### 2. Search Functionality

**Input**:
- Placeholder: "Search for answers..."
- `aria-label="Search FAQ"`
- Clear button (×) appears when search has value
- Clear button: `aria-label="Clear search"`

**Filtering Logic**:
```typescript
const searchedFAQs = searchQuery.trim()
  ? filteredFAQs.filter(faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  : filteredFAQs
```

**Behavior**:
- Searches in both question and answer text
- Case-insensitive matching
- Filters FAQ list in real-time
- Clear button resets search

**Animation**: None (instant filtering)

---

### 3. Category Filtering

**Categories**: ['All', 'Services', 'General', 'Financial', 'Contact']

**Behavior**:
- Button row displays all categories
- Active category has gradient background (from-primary-400 to-accent-400)
- Inactive categories have white/dark-gray background with border
- Clicking category filters FAQ list

**Computed Categories**:
```typescript
const categories = ['All', ...Array.from(new Set(faqs.map(faq => faq.category)))]
```

**Active Button Style**:
```tsx
bg-gradient-to-r from-primary-400 to-accent-400 text-white shadow-lg
```

**Inactive Button Style**:
```tsx
bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700
```

**Accessibility**:
- `aria-label="Filter by {category}"`
- `aria-pressed={activeCategory === category}`

---

### 4. Suggested Questions

**Questions**:
1. "What services do you provide?"
2. "How do I qualify for HBCS?"
3. "What are your hours?"
4. "How much does it cost?"
5. "How can I make a referral?"

**Behavior**:
- Horizontal button layout with flex-wrap
- Border-2 border-primary-400 style
- Hover: bg-primary-400, text-white, scale-105
- Click sends question to AI chat

**Animation**:
- Hover: `whileHover={{ scale: 1.05 }}`
- Tap: `whileTap={{ scale: 0.95 }}`
- Initial fade-up animation

---

### 5. AI Chat Interface

**Input**:
- Placeholder: "Type your question here..."
- `aria-label="Type your question"`
- Send button (gradient background)

**Message Types**:

**User Messages**:
- Right-aligned (justify-end)
- Background: `bg-primary-100 dark:bg-primary-600`
- Text color: text-white
- Rounded-tl-none (chat bubble style)
- Max width: 70%

**Assistant Messages**:
- Left-aligned (justify-start)
- Avatar with ChatBubbleLeftIcon (w-8 h-8)
- Background: `bg-gray-100 dark:bg-gray-800`
- Rounded-tr-2xl rounded-bl-2xl
- Max width: 70%

**Typing Indicator**:
- Text: "AI is thinking..."
- Opacity animation: [0.5, 1, 0.5, 1]
- Duration: 0.8s
- Repeat: Infinity
- Visible when `isTyping={true}`

**Response Simulation**:
```typescript
setTimeout(() => {
  // Simulate AI response (in production, this would call your AI API)
  const relevantFAQ = faqs.find(faq =>
    question.toLowerCase().includes('services') ||
    question.toLowerCase().includes('cost') ||
    question.toLowerCase().includes('hours') ||
    question.toLowerCase().includes('qualify')
  )

  let response = ''
  if (relevantFAQ) {
    response = `Based on your question about "${relevantFAQ.question}", here's what I can tell you: ${relevantFAQ.answer}`
  } else if (question.toLowerCase().includes('contact') || ...) {
    // Other response patterns...
  }

  setChatMessages(prev => [...prev, assistantMessage])
  setIsTyping(false)
}, 1000)
```

**Keyboard Interaction**:
- Enter key submits question
- Send button also submits

**Empty State**:
- Shows when `chatMessages.length === 0`
- Text: "No messages yet. Ask me a question to get started!"
- Italic, gray-500 color

**Max Height**: 96 (max-h-96) with overflow-y-auto

---

## Animations

### 1. Header Animation
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

### 2. Search Bar Animation
```typescript
initial={{ opacity: 0, scale: 0.95 }}
animate={{ opacity: 1, scale: 1 }}
```

### 3. Suggested Questions Animation
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
```

### 4. Category Filter Animation
```typescript
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
viewport={{ once: true }}
```

### 5. FAQ Item Animation
```typescript
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.3, delay: index * 0.05 }}
```

### 6. FAQ Accordion Animation (Answer)
```typescript
initial={{ height: 0, opacity: 0 }}
animate={{ height: 'auto', opacity: 1, transition: { duration: 0.3, ease: 'easeInOut' } }}
exit={{ height: 0, opacity: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
```

### 7. Rotating Sparkles (Header)
```typescript
animate={{ rotate: [0, 360] }}
transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
```

### 8. Chat Message Animation
```typescript
initial={{ opacity: 0, x: message.role === 'user' ? -20 : 20 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.3 }}
```

---

## Keyboard Navigation

### Shortcuts:
- **Escape**: Close search / close FAQ / close modal (if any)
- **Enter**: Submit chat question
- **Tab**: Navigate through focusable elements
- **Shift+Tab**: Reverse navigation

### Focus Management:
- Clear search button appears/disappears based on search value
- Focus trap in lightbox (Gallery, not FAQ)

---

## Responsive Design

### Mobile (< 768px):
- FAQ items: Full width
- Category buttons: Wrap to multiple rows
- Suggested questions: Wrap to multiple rows
- Chat interface: Full width input

### Tablet (768px - 1024px):
- FAQ items: Full width
- Category buttons: May wrap
- Suggested questions: May wrap

### Desktop (> 1024px):
- FAQ items: Full width
- Category buttons: Single row (flex-wrap)
- Suggested questions: Single row (flex-wrap)
- Chat interface: Full width input

---

## Color Scheme

### Light Mode:
- Background: from-amber-50 to-orange-50
- FAQ Card: bg-white
- Active Category: from-primary-400 to-accent-400
- Inactive Category: bg-white with border-gray-300
- FAQ Answer: bg-gray-50

### Dark Mode:
- Background: from-gray-900 to-gray-800
- FAQ Card: bg-gray-800
- Inactive Category: bg-gray-800 with border-gray-600
- FAQ Answer: bg-gray-900/50

---

## Data Structure

### FAQItem Interface
```typescript
interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}
```

### FAQ Categories:
- Services (4 items)
- General (7 items)
- Financial (2 items)
- Contact (1 item)
- Total: 14 items

---

## Performance Characteristics

### Render Triggers:
- Category change → Filters FAQ list
- Search change → Filters FAQ list (debounced by React state)
- FAQ expand/collapse → Triggers AnimatePresence
- Chat message → Re-renders message list

### Optimization Opportunities:
- Memoize filteredFAQs and searchedFAQs
- Virtualize FAQ list (if > 50 items)
- Debounce search input (currently instant)

---

## Test Coverage

### E2E Tests (78 total):
✅ FAQ section visible
✅ Search input present
✅ Suggested questions displayed
✅ Category filters displayed
✅ FAQ accordion items displayed
✅ Expand FAQ when clicked
✅ Chat interface displayed
✅ Send question via chat
✅ Send via suggested question
✅ Filter by category
✅ Search FAQs
✅ Clear search
✅ Typing indicator displayed

### Viewports Tested:
- Desktop (1280x720)
- Mobile Chrome (375x667)
- Mobile Safari (375x667)
- Tablet (768x1024)

### Browsers Tested:
- Chromium
- Firefox
- WebKit

---

## Integration Points

### Used By:
- `app/page.tsx` (via dynamic import)

### Imports:
- `@heroicons/react/24/outline` (ChatBubbleLeftIcon, SparklesIcon)
- `framer-motion` (motion, AnimatePresence)
- `next/image`

### Dependencies:
- No external API calls (simulated AI responses)
- No database (hardcoded data)

---

## Known Limitations

1. **AI Simulation**: Currently uses setTimeout with basic keyword matching
2. **No Context**: Chat doesn't remember previous messages
3. **No Real API**: All responses are simulated locally
4. **Mobile Search**: Search input may have layout issues on very small screens
5. **Accessibility**: Focus management could be improved for keyboard users

---

## Notes for Refactoring

### Must Preserve:
- ✅ All data-testid attributes (for E2E tests)
- ✅ All aria-labels and aria-expanded attributes
- ✅ All animation timing and easing
- ✅ Keyboard shortcuts (Escape, Enter, Tab)
- ✅ Color schemes (light/dark mode)
- ✅ Responsive breakpoints
- ✅ Search filtering logic (question + answer)
- ✅ Chat message animations
- ✅ Typing indicator animation

### Can Improve:
- ⚠️ Memoize filtered FAQs for performance
- ⚠️ Extract animation configs to constants
- ⚠️ Add real AI API integration (future)
- ⚠️ Improve focus management
- ⚠️ Add loading states for chat messages

### Refactoring Constraints:
- 🔒 Keep component interface unchanged (app/page.tsx imports)
- 🔒 Maintain all 8 state variables in orchestrator
- 🔒 Don't change data-testid values
- 🔒 Don't change animation timings
- 🔒 Don't change keyboard shortcuts

---

## Baseline Metrics

### File Size: 461 lines
### Component Count: 1 (monolithic)
### State Variables: 8
### Test Coverage: 78 E2E tests passing
### Build Status: ✅ Pass
### Lint Status: ✅ Pass
### TypeScript: ✅ Clean

---

**End of Documentation**
