import { useState, useEffect, useCallback } from 'react';
import { tasksApi } from '../api/tasks.api';
import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '../types/task';
import type { TaskFilters } from '../utils/filterTypes';
import { useUIStore } from '../stores/uiStore';

export const useTasks = (projectId: string, filters?: TaskFilters) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const addToast = useUIStore(state => state.addToast);

  const fetchTasks = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await tasksApi.getAll(projectId, filters);
      setTasks(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to fetch tasks';
      setError(message);
      addToast({ message, type: 'error' });
    } finally {
      setIsLoading(false);
    }
  }, [projectId, filters, addToast]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

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

    setTasks(prev => [...prev, optimisticTask]);

    try {
      const newTask = await tasksApi.create(data);
      setTasks(prev => prev.map(t => t.id === optimisticTask.id ? newTask : t));
      addToast({ message: 'Task created successfully', type: 'success' });
      return newTask;
    } catch (err) {
      setTasks(prev => prev.filter(t => t.id !== optimisticTask.id));
      const message = err instanceof Error ? err.message : 'Failed to create task';
      addToast({ message, type: 'error' });
      throw err;
    }
  }, [addToast]);

  const updateTask = useCallback(async (id: string, data: UpdateTaskDTO) => {
    const oldTask = tasks.find(t => t.id === id);
    if (!oldTask) return;

    setTasks(prev => prev.map(t => 
      t.id === id 
        ? { ...t, ...data, updatedAt: new Date().toISOString() }
        : t
    ));

    try {
      const updated = await tasksApi.update(id, data);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      addToast({ message: 'Task updated successfully', type: 'success' });
      return updated;
    } catch (err) {
      setTasks(prev => prev.map(t => t.id === id ? oldTask : t));
      const message = err instanceof Error ? err.message : 'Failed to update task';
      addToast({ message, type: 'error' });
      throw err;
    }
  }, [tasks, addToast]);

  const deleteTask = useCallback(async (id: string) => {
    const oldTask = tasks.find(t => t.id === id);
    if (!oldTask) return;

    setTasks(prev => prev.filter(t => t.id !== id));

    try {
      await tasksApi.delete(id);
      addToast({ message: 'Task deleted successfully', type: 'success' });
    } catch (err) {
      setTasks(prev => [...prev, oldTask]);
      const message = err instanceof Error ? err.message : 'Failed to delete task';
      addToast({ message, type: 'error' });
      throw err;
    }
  }, [tasks, addToast]);

  const updateTaskStatus = useCallback(async (id: string, status: TaskStatus) => {
    const oldTask = tasks.find(t => t.id === id);
    if (!oldTask) return;

    setTasks(prev => prev.map(t =>
      t.id === id
        ? { ...t, status, updatedAt: new Date().toISOString() }
        : t
    ));

    try {
      const updated = await tasksApi.updateStatus(id, status);
      setTasks(prev => prev.map(t => t.id === id ? updated : t));
      addToast({ message: 'Task status updated', type: 'success' });
      return updated;
    } catch (err) {
      setTasks(prev => prev.map(t => t.id === id ? oldTask : t));
      const message = err instanceof Error ? err.message : 'Failed to update status';
      addToast({ message, type: 'error' });
      throw err;
    }
  }, [tasks, addToast]);

  return {
    tasks,
    isLoading,
    error,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
};