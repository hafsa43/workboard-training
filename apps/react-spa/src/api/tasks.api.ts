import { apiClient } from './client';
import { mockServer } from './mockServer';
import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '../types/task';

export const tasksApi = {
  getAll: async (projectId: string): Promise<Task[]> => {
    if (apiClient.isMockMode()) {
      return mockServer.getTasks(projectId);
    }
    return apiClient.get<Task[]>(`/projects/${projectId}/tasks`);
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
