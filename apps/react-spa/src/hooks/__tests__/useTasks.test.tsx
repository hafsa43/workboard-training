import { describe, it, expect, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTasks } from '../useTasks';
import type { Task } from '../../types/task';

// Mock the tasks API
vi.mock('../../api/tasks.api', () => ({
  tasksApi: {
    getAll: vi.fn(() => Promise.resolve([
      {
        id: '1',
        title: 'Test Task',
        description: 'Test description',
        status: 'todo',
        priority: 'medium',
        projectId: '1',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      },
    ] as Task[])),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    updateStatus: vi.fn(),
  },
}));

// Mock the UI store to avoid toast errors
vi.mock('../../stores/uiStore', () => ({
  useUIStore: vi.fn(() => vi.fn()),
}));

describe('useTasks', () => {
  it('should fetch tasks successfully', async () => {
    const { result } = renderHook(() => useTasks('1'));

    // Initially loading
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    expect(result.current.tasks).toBeDefined();
    expect(Array.isArray(result.current.tasks)).toBe(true);
  });

  it('should filter tasks by projectId', async () => {
    const { result } = renderHook(() => useTasks('1'));

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    const tasks = result.current.tasks;
    tasks.forEach((task) => {
      expect(task.projectId).toBe('1');
    });
  });
});