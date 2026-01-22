import { useState, useEffect, useCallback } from 'react';
import { tasksApi } from '../api/tasks.api';
import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '../types/task';
import { useUIStore } from '../stores/uiStore';

export const useTasks = (projectId: string) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const showToast = useUIStore(state => state.showToast);

  // Fetch tasks
  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await tasksApi.getAll(projectId);
      setTasks(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(message);
      showToast(message, 'error');
    } finally {
      setIsLoading(false);
    }
  }, [projectId, showToast]);

  // Load tasks on mount
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  // Create task with optimistic UI
  const createTask = useCallback(async (data: CreateTaskDTO) => {
    const optimisticTask: Task = {
      id: `temp-${Date.now()}`,
      projectId: data.projectId,
      title: data.title,
      description: data.description || '',
      status: data.status || 'todo',
      priority: data.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Optimistic update
    setTasks(prev => [...prev, optimisticTask]);

    try {
      const newTask = await tasksApi.create(data);
      // Replace optimistic task with real one
      setTasks(prev => prev.map(t => t.id === optimisticTask.id ? newTask : t));
      showToast('Task created successfully', 'success');
      return newTask;
    } catch (err) {
      // Rollback on error
      setTasks(prev => prev.filter(t => t.id !== optimisticTask.id));
      const message = err instanceof Error ? err.message : 'Failed to create task';
      showToast(message, 'error');
      throw err;
    }
  }, [showToast]);

  // Update task with optimistic UI
  const updateTask = useCallback(async (id: string, data: UpdateTaskDTO) => {
    const oldTask = tasks.find(t => t.id === id);
    if (!oldTask) return;

    // Optimistic update
    setTasks(prev => prev.map(t => 
      t.id === id 
        ? { ...t, ...data, updatedAt: new Date().toISOString() }
        : t
    ));

    try {
      const updated = await tasksApi.update(id, data);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      showToast('Task updated successfully', 'success');
      return updated;
    } catch (err) {
      // Rollback on error
      setTasks(prev => prev.map(t => t.id === id ? oldTask : t));
      const message = err instanceof Error ? err.message : 'Failed to update task';
      showToast(message, 'error');
      throw err;
    }
  }, [tasks, showToast]);

  // Delete task with optimistic UI
  const deleteTask = useCallback(async (id: string) => {
    const oldTask = tasks.find(t => t.id === id);
    if (!oldTask) return;

    // Optimistic update
    setTasks(prev => prev.filter(t => t.id !== id));

    try {
      await tasksApi.delete(id);
      showToast('Task deleted successfully', 'success');
    } catch (err) {
      // Rollback on error
      setTasks(prev => [...prev, oldTask]);
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      showToast(message, 'error');
      throw err;
    }
  }, [tasks, showToast]);

  // Update task status with optimistic UI
  const updateTaskStatus = useCallback(async (id: string, status: TaskStatus) => {
    const oldTask = tasks.find(t => t.id === id);
    if (!oldTask) return;

    // Optimistic update
    setTasks(prev => prev.map(t => 
      t.id === id 
        ? { ...t, status, updatedAt: new Date().toISOString() }
        : t
    ));

    try {
      const updated = await tasksApi.updateStatus(id, status);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
    } catch (err) {
      // Rollback on error
      setTasks(prev => prev.map(t => t.id === id ? oldTask : t));
      const message = err instanceof Error ? err.message : 'Failed to update task status';
      showToast(message, 'error');
      throw err;
    }
  }, [tasks, showToast]);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    refetch: fetchTasks,
  };
};
