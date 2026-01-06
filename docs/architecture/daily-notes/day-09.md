# Day 9: Accessibility and UX Polish

**Date**: January 6, 2026

## Features Implemented
- Focus trap for modals with `focus-trap-react`
- Focus restoration on modal close
- Skip to main content link
- ARIA labels and landmarks
- Screen reader live regions
- Accessible error messages
- Color contrast compliance (WCAG AA)

## Key Concepts

### 1. Focus Management
Trap focus in modals, store previous focus, restore on close.
```tsx
useEffect(() => {
  if (isOpen) {
    previousActiveElementRef.current = document.activeElement;
  }
  return () => previousActiveElementRef.current?.focus();
}, [isOpen]);
```

### 2. Essential ARIA Attributes
- `aria-label`: Labels for icon-only buttons
- `aria-describedby`: Links inputs to help/error text
- `aria-live`: Announces dynamic changes
- `aria-invalid`: Marks validation errors

### 3. Semantic HTML First
Use `<button>`, `<nav>`, `<main>` instead of `<div>` with click handlers.
Provides keyboard behavior and screen reader context automatically.

### 4. Color Contrast
WCAG AA requires 4.5:1 for normal text, 3:1 for large text (18pt+).

## React vs Blazor

| Feature | React | Blazor |
|---------|-------|--------|
| **Focus** | `useRef` + `.focus()` | `FocusAsync()` on ElementReference |
| **Focus Trap** | `focus-trap-react` | Manual implementation |
| **Testing** | axe, jest-axe | Limited tools |

## Problems & Solutions

### #1: Focus Trap Import Error
**Error**: `'FocusTrap' is a type and must be imported using a type-only import`  
**Fix**: Changed from `import type FocusTrap` to `import { FocusTrap }` (named import)

### #2: Focus Lost After Modal Close
**Problem**: Focus disappears when modal closes, keyboard users lost  
**Fix**: Store `document.activeElement` before opening modal, restore on close

### #3: Screen Reader Testing

### #2: Focus Lost After Modal Close
**Fix**: Store `document.activeElement` before opening, restore on close

### #3: Color Contrast Failures
**Fix**: Changed `gray-500` text to `gray-700` for WCAG AA compliance

## Testing Performed
- Keyboard navigation and focus management
- NVDA screen reader testing
- Lighthouse: 98/100 accessibility score
- axe DevTools: 0 violations

## Takeaways
- Semantic HTML first, ARIA second
- Test with real screen readers, not just automated tools
- Focus management needs careful state tracking
- Color contrast improves readability for everyone