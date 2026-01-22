import { mockServer } from './mockServer';
import type { Project, ProjectsResponse, ProjectFilters, PaginationParams } from '@/types/project';

export async function getProjects(
  filters?: ProjectFilters,
  pagination?: PaginationParams
): Promise<ProjectsResponse> {
  const projects = await mockServer.getProjects();
  
  // Apply filters
  let filtered = projects;
  
  if (filters?.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.description?.toLowerCase().includes(searchLower)
    );
  }
  
  if (filters?.status && filters.status !== 'all') {
    filtered = filtered.filter(p => p.status === filters.status);
  }

  // Apply pagination
  const total = filtered.length;
  const page = pagination?.page ?? 1;
  const pageSize = pagination?.pageSize ?? 9;
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);

  return {
    projects: paginated,
    total,
    page,
    pageSize,
    totalPages,
  };
}

export async function getProject(id: string): Promise<Project | null> {
  const project = await mockServer.getProject(id);
  return project || null;
}
