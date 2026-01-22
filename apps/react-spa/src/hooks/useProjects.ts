import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectsApi } from '../api/projects.api';
import type { CreateProjectDto, UpdateProjectDto } from '../types/project';
import type { ProjectFilters, PaginationParams } from '../utils/filterTypes';
import { useUIStore } from '../stores/uiStore';

export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters?: ProjectFilters, pagination?: PaginationParams) => 
    [...projectKeys.lists(), { filters, pagination }] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
};

export function useProjects(
  filters?: ProjectFilters,
  pagination?: PaginationParams
) {
  return useQuery({
    queryKey: projectKeys.list(filters, pagination),
    queryFn: () => projectsApi.getProjects(filters, pagination),
  });
}

export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => projectsApi.getProject(id),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);

  return useMutation({
    mutationFn: (data: CreateProjectDto) => projectsApi.createProject(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      
      addToast({
        type: 'success',
        message: 'Project created successfully!',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        message: error.message || 'Failed to create project',
      });
    },
  });
}

export function useUpdateProject() {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDto }) =>
      projectsApi.updateProject(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(variables.id) });
      
      addToast({
        type: 'success',
        message: 'Project updated successfully!',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        message: error.message || 'Failed to update project',
      });
    },
  });
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  const addToast = useUIStore((state) => state.addToast);

  return useMutation({
    mutationFn: (id: string) => projectsApi.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });
      
      addToast({
        type: 'success',
        message: 'Project deleted successfully!',
      });
    },
    onError: (error: Error) => {
      addToast({
        type: 'error',
        message: error.message || 'Failed to delete project',
      });
    },
  });
}