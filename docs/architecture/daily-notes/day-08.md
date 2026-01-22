# Day 8: Search, Filters & Performance

**Date**: January 5, 2026

## Features Implemented
- Debounced search (projects & tasks)
- Filter components with URL persistence
- Pagination with navigation
- Virtual scrolling for task lists
- Filter state synced to URL

## Key Concepts

### 1. Debouncing Prevents API Spam
Used `use-debounce` to delay API calls until user stops typing (300-500ms).
```typescript
const debouncedSearch = useDebounce(localFilters.search, 500);
```

### 2. URL Query Params Make Filters Shareable
Filters stored in URL enable bookmarking and sharing filtered views.

### 3. Dual-State Pattern
- **Local state**: Instant UI feedback
- **Debounced state**: Actual API calls

### 4. React Query Keys Include Filters
```typescript
queryKey: projectKeys.list(filters, pagination)
```
Changing filters triggers automatic refetch.

### 5. Virtual Scrolling
`@tanstack/react-virtual` renders only visible items for performance.

## React vs Blazor

| Feature | React | Blazor |
|---------|-------|--------|
| **Debounce** | `use-debounce` | `Timer` |
| **URL State** | `useSearchParams` | `NavigationManager` |
| **Virtualization** | `@tanstack/react-virtual` | `<Virtualize>` (built-in) |
| **Cache** | React Query (auto) | Manual refresh |

## Problems & Solutions

### #1: Mock API Parameter Mismatch
**Error**: `Expected 0 arguments, but got 2`  
**Fix**: Added `filters` and `pagination` params to `getProjects()`

### #2: Task Status Type Inconsistency
**Error**: `'in-progress' does not exist in type TaskStatus`  
**Fix**: Changed to `'doing'` across VirtualTaskColumn and filterTypes

### #3: Card onClick Not Supported
**Error**: `Property 'onClick' does not exist`  
**Fix**: Added optional `onClick` prop to Card interface

### #4: TaskFormModal Prop Mismatch
**Error**: `Property 'initialData' does not exist`  
**Fix**: Changed to `task` and `projectId` props

### #5: Pagination Not Showing
**Issue**: Missing `totalPages` in API response  
**Fix**: Added `totalPages` calculation and expanded mock data to 12 projects

## Day 9 Plan
- Keyboard navigation for all interactive elements
- Focus management in modals
- ARIA labels and semantic HTML
- Color contrast audit (WCAG AA)

## Takeaways
- Debouncing is essential for production search
- URL state enables shareability
- TypeScript catches prop errors early
- Virtual scrolling needed for 100+ items
- React Query cache keys must include all filter variables
