# Day 2: React Fundamentals - Components and Hooks

## What I Built Today
- Button component with multiple variants (primary, secondary, danger)
- Input component featuring labels and error state handling
- Card component for organizing content
- Modal component with keyboard accessibility (Escape key closes)
- Toast notification system for user feedback
- Skeleton loading components for better UX

## Key Learnings
- **Props**: Similar to parameters in Blazor - used to pass data between components
- **useState**: Comparable to @code state fields in Blazor for managing component state
- **useEffect**: Acts like OnInitialized/OnAfterRender lifecycle methods in Blazor
- **forwardRef**: Required for Input component to integrate with forms
- **Children prop**: Equivalent to RenderFragment in Blazor for rendering child content
- **Controlled inputs**: React manages input values through state

## Important Concepts
- Components are functions that return JSX
- State updates trigger component re-renders
- Data flows down through props, events bubble up
- Side effects are handled in useEffect hook


## Next Steps (Day 3)
- Implement React Router for page navigation
- Set up protected routes for authentication
- Build multiple page layouts
