import { apiClient } from './client';
import { mockServer } from './mockServer';
import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '../types/task';
import type { TaskFilters } from '../utils/filterTypes';

export const tasksApi = {
  getAll: async (projectId: string, filters?: TaskFilters): Promise<Task[]> => {
    if (apiClient.isMockMode()) {
      let tasks = await mockServer.getTasks(projectId);
      
      // Apply filters
      if (filters?.search) {
        const searchLower = filters.search.toLowerCase();
        tasks = tasks.filter(t =>
          t.title.toLowerCase().includes(searchLower) ||
          t.description?.toLowerCase().includes(searchLower)
        );
      }
      if (filters?.priority && filters.priority !== 'all') {
        tasks = tasks.filter(t => t.priority === filters.priority);
      }
      if (filters?.status && filters.status !== 'all') {
        tasks = tasks.filter(t => t.status === filters.status);
      }
      
      return tasks;
    }
    
    const params = new URLSearchParams();
    if (filters?.search) params.set('search', filters.search);
    if (filters?.priority) params.set('priority', filters.priority);
    if (filters?.status) params.set('status', filters.status);
    
    return apiClient.get<Task[]>(`/projects/${projectId}/tasks?${params}`);
  },

  getById: async (id: string): Promise<Task> => {
    if (apiClient.isMockMode()) {
      const task = await mockServer.getTask(id);
      if (!task) throw new Error('Task not found');
      return task;
    }
    return apiClient.get<Task>(`/tasks/${id}`);
  },

  create: async (data: CreateTaskDTO): Promise<Task> => {
    if (apiClient.isMockMode()) {
      return mockServer.createTask(data);
    }
    return apiClient.post<Task>(`/projects/${data.projectId}/tasks`, data);
  },

  update: async (id: string, data: UpdateTaskDTO): Promise<Task> => {
    if (apiClient.isMockMode()) {
      return mockServer.updateTask(id, data);
    }
    return apiClient.put<Task>(`/tasks/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    if (apiClient.isMockMode()) {
      return mockServer.deleteTask(id);
    }
    await apiClient.delete(`/tasks/${id}`);
  },

  updateStatus: async (id: string, status: TaskStatus): Promise<Task> => {
    if (apiClient.isMockMode()) {
      return mockServer.updateTaskStatus(id, status);
    }
    return apiClient.patch<Task>(`/tasks/${id}/status`, { status });
  },
};