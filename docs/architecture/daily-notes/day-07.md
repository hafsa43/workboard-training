# Day 7: Tasks Feature - CRUD + Status Transitions (Kanban Basics)

**Date**: January 2, 2026

## Today's Accomplishments

### Task Management System
- Implemented complete task CRUD operations with optimistic UI updates
- Created Kanban-style board with three status columns (To Do, In Progress, Done)
- Built reusable task components (TaskCard, TaskColumn, TaskBoard, TaskFormModal)
- Integrated custom useTasks hook with automatic rollback on errors
- Added task priority system (low, medium, high) with color-coded badges
- Extended mock server with task endpoints and seed data
- Set network delay to 1500ms to test optimistic UI behavior

## Key Learnings

### Optimistic UI Pattern

**Update Flow**:
```typescript
const updateTask = async (id: string, data: UpdateTaskDTO) => {
  const oldTask = tasks.find(t => t.id === id);
  
  // 1. Optimistic update - instant UI feedback
  setTasks(prev => prev.map(t => t.id === id ? { ...t, ...data } : t));

  try {
    // 2. Server request
    const updated = await tasksApi.update(id, data);
    // 3. Replace with server response
    setTasks(prev => prev.map(t => t.id === id ? updated : t));
  } catch (err) {
    // 4. Rollback on error
    setTasks(prev => prev.map(t => t.id === id ? oldTask : t));
    showToast(message, 'error');
  }
};
```

### Benefits of Optimistic UI
- **Instant Feedback**: Users see changes immediately without waiting
- **Better UX**: Application feels responsive even with slow network
- **Error Recovery**: Automatic rollback maintains data consistency
- **Visual Indicators**: Temporary IDs (temp-*) show pending operations

### Component Architecture
```
TaskBoard (state + logic)
  ├─ TaskColumn (status filtering)
  │   └─ TaskCard (individual task)
  └─ TaskFormModal (create/edit form)
```

### Task Status Transitions
- **todo** → **doing** → **done**
- Status changes via dropdown in TaskCard or edit form
- All transitions use optimistic updates

## Technical Challenges & Solutions

### TypeScript Module Resolution
**Problem**: Import errors with `verbatimModuleSyntax` enabled  
**Solution**: Added `.ts`/`.tsx` extensions to all imports

### Type-Only Imports
**Problem**: Runtime values imported as types  
**Solution**: Separated type and value imports
```typescript
import type { Task, TaskStatus } from '../types/task.ts';
import { TASK_STATUSES } from '../types/task.ts';
```

### Optional Parameters
**Problem**: projectId from useParams could be undefined  
**Solution**: Conditional rendering with type guard

## Files Created
```
types/task.ts, types/project.ts
schemas/task.schema.ts
api/tasks.api.ts
hooks/useTasks.ts
components/tasks/ (TaskBoard, TaskCard, TaskColumn, TaskFormModal)
```

## Next Steps
- Add drag-and-drop between columns
- Implement task filtering and sorting
- Add due dates and assignees
- Task detail view with comments
- Real-time collaboration with WebSockets
