# Day 6: Server State Management with TanStack Query

**Date**: January 1, 2026

# Today's Accomplishments

# Server State Integration
- Integrated TanStack Query (React Query) for efficient server state management
- Developed centralized API client with standardized error normalization
- Built comprehensive projects API service layer with full CRUD operations
- Implemented custom query hooks for data fetching and mutations
- Added proper loading indicators, error handling, and empty state components
- Configured automatic cache invalidation strategy after mutations
- Set up mock API server for local development and testing

# Key Learnings

# Understanding TanStack Query

**Query Hook Pattern**:
```typescript
import { useQuery } from '@tanstack/react-query';

const { data, isLoading, error } = useQuery({
  queryKey: ['projects'],
  queryFn: fetchProjects,
});
```

# Advantages of TanStack Query
- **Automatic Caching**: Data cached automatically with intelligent invalidation
- **Background Refetching**: Keeps data fresh without manual intervention
- **Built-in State Management**: Loading, error, and success states included
- **No Manual Refetch Logic**: Framework handles data synchronization
- **Optimized UX**: Instant responses from cache while revalidating
- **DevTools Integration**: Visual debugging of queries and cache state

# Query vs Mutation Pattern
**Queries** are used for:
- Fetching data (GET requests)
- Read-only operations
- Cacheable data

**Mutations** are used for:
- Creating, updating, or deleting data (POST, PUT, DELETE)
- Write operations
- Operations that modify server state

# Cache Management Strategy
- **Query Keys**: Array-based keys for hierarchical cache organization
- **Stale Time**: How long data is considered fresh
- **Garbage Collection**: Automatic cleanup of unused cache entries
- **Invalidation**: Manual cache invalidation after mutations

# API Layer Architecture

**API Client** (`src/api/client.ts`):
- Centralized fetch wrapper with consistent error handling
- Custom ApiError class for type-safe error management
- Generic type support for request/response handling

**Mock Server** (`src/api/mockServer.ts`):
- In-memory data persistence during development
- Realistic network delay simulation
- Enables frontend development without backend dependency

**Query Hooks** (`src/hooks/useProjects.ts`):
- `useProjects()` - Retrieves all projects
- `useProject(id)` - Fetches single project by ID
- `useCreateProject()` - Handles project creation mutation
- `useUpdateProject()` - Manages project update mutation
- `useDeleteProject()` - Processes project deletion mutation

# Testing Verification

Loading states render appropriately during data fetching
Error states display user-friendly messages
Empty states provide actionable guidance
Create mutation successfully invalidates cache
Update mutation refreshes both list and detail views
Delete mutation removes item and navigates user
Cache enables instant page navigation
React Query DevTools visualize query states

# Challenges Encountered

1. **Query Key Management**: Resolved by implementing a query key factory pattern for consistency
2. **UI Not Updating After Mutations**: Fixed using `invalidateQueries` to trigger refetch
3. **TypeScript Type Safety**: Addressed by defining clear DTOs and interface contracts

# Next Steps
- Tasks feature: CRUD + status transitions (Kanban basics)