import { apiClient } from './client.ts';
import { mockApi } from './mockServer.ts';
import type { 
  Project, 
  ProjectsResponse, 
  CreateProjectDto, 
  UpdateProjectDto 
} from '../types/project.ts';

const USE_MOCK_API = true;

export const projectsApi = {
  getProjects: async (): Promise<ProjectsResponse> => {
    if (USE_MOCK_API) return mockApi.getProjects();
    return apiClient.get<ProjectsResponse>('/projects');
  },

  getProject: async (id: string): Promise<Project> => {
    if (USE_MOCK_API) return mockApi.getProject(id);
    return apiClient.get<Project>(`/projects/${id}`);
  },

  createProject: async (data: CreateProjectDto): Promise<Project> => {
    if (USE_MOCK_API) return mockApi.createProject(data);
    return apiClient.post<Project>('/projects', data);
  },

  updateProject: async (id: string, data: UpdateProjectDto): Promise<Project> => {
    if (USE_MOCK_API) return mockApi.updateProject(id, data);
    return apiClient.put<Project>(`/projects/${id}`, data);
  },

  deleteProject: async (id: string): Promise<void> => {
    if (USE_MOCK_API) return mockApi.deleteProject(id);
    return apiClient.delete<void>(`/projects/${id}`);
  },
};