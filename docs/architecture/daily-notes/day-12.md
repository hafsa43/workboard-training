# Day 12: Port Features to Next.js - Data Fetching Patterns

**Date:** January 10, 2026  
**Focus:** Server/client components, data fetching, API routes, loading/error states

---

## What I Implemented

### Data Layer Setup
- Created comprehensive TypeScript types (`Project`, `ProjectsResponse`, `ProjectFilters`, `PaginationParams`)
- Built mock server with 12 sample projects and full CRUD operations
- Implemented server-side API functions (`getProjects`, `getProject`) with filtering and pagination

### Projects List Page (Server Component)
- Server-side data fetching with filters (search, status) and pagination (9 per page)
- Grid layout with project cards showing name, description, status badge, updated date
- Client component for filters (search input, status dropdown) with URL state management
- Client component for pagination with smart page number display
- Loading skeleton with animated placeholders
- Empty state handling

### Project Detail Page (Server Component)
- Server-side single project fetching with 404 handling
- Breadcrumb navigation
- Project header with status badge and action buttons
- Description and details cards with formatted dates
- Client component for edit/delete actions with confirmation dialogs
- Loading skeleton for detail page
- Custom 404 page for missing projects

### API Routes
- `GET /api/projects` - List with search, status filter, pagination support
- `POST /api/projects` - Create with validation
- `GET /api/projects/[id]` - Single project with 404 handling
- `PATCH /api/projects/[id]` - Update project
- `DELETE /api/projects/[id]` - Delete project
- Error handling with proper HTTP status codes

---

##  Server vs Client Component Decisions

**Server Components (Data Fetching):**
- `projects/page.tsx` - Fetches list, SEO-friendly, no user interaction
- `projects/[id]/page.tsx` - Fetches detail, SEO-friendly, can be static
- `loading.tsx` - Static UI, no interactivity
- `not-found.tsx` - Static error page

**Client Components (Interactivity):**
- `ProjectsFilters.tsx` - Form inputs, useState, useRouter, URL management
- `PaginationControls.tsx` - Click handlers, navigation, dynamic rendering
- `ProjectActions.tsx` - Delete button, loading state, window.confirm, fetch API
- `error.tsx` - useEffect for logging, reset function, browser APIs

---

## 🧪 Testing Performed

**Projects List:**
- [x] Navigate to `/projects` - loads 9 projects in grid
- [x] Search for "mobile" - filters correctly
- [x] Filter by status (active/completed/archived) - works
- [x] Clear filters - resets to all projects
- [x] Pagination - navigates between pages
- [x] URL updates with query params (search, status, page)
- [x] Loading skeleton displays during navigation
- [x] Click project card - navigates to detail

**Project Detail:**
- [x] View `/projects/1` - shows full details
- [x] Breadcrumb navigation works
- [x] Edit button - shows placeholder alert
- [x] Delete button - shows confirmation, redirects after delete
- [x] Invalid ID `/projects/999` - shows 404 page
- [x] Loading skeleton displays

**API Routes:**
- [x] `GET /api/projects` - returns paginated list
- [x] `GET /api/projects?search=mobile` - filters work
- [x] `POST /api/projects` - creates new project
- [x] `GET /api/projects/1` - returns single project
- [x] `PATCH /api/projects/1` - updates project
- [x] `DELETE /api/projects/1` - deletes project
- [x] Invalid IDs return 404
- [x] Validation errors return 400

---

## 📚 Key Learnings

**Server Component Benefits:**
- Faster initial page load (data fetched on server)
- SEO-friendly (crawlers see full content)
- Reduced client-side JavaScript bundle
- Automatic code splitting

**Client Component Use Cases:**
- Form inputs (useState for controlled components)
- Navigation (useRouter, useSearchParams)
- Browser APIs (window, fetch, localStorage)
- Event handlers (onClick, onChange, onSubmit)

**Data Fetching Patterns:**
- Server components: Direct database/API calls in component
- Client components: useEffect + fetch or React Query
- URL state for filters (searchParams) enables sharing/bookmarking
- Loading states with Suspense and loading.tsx files
- Error boundaries with error.tsx files

