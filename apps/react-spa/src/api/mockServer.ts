import type { Project, ProjectsResponse, CreateProjectDto, UpdateProjectDto } from '../types/project';

let projects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'Build iOS and Android apps',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'API Migration',
    description: 'Migrate from REST to GraphQL',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async getProjects(): Promise<ProjectsResponse> {
    await delay(800);
    return {
      projects: [...projects],
      total: projects.length,
    };
  },

  async getProject(id: string): Promise<Project> {
    await delay(500);
    const project = projects.find((p) => p.id === id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    return { ...project };
  },

  async createProject(data: CreateProjectDto): Promise<Project> {
    await delay(600);
    
    const newProject: Project = {
      id: String(Date.now()),
      name: data.name,
      description: data.description,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    
    projects.push(newProject);
    return { ...newProject };
  },

  async updateProject(id: string, data: UpdateProjectDto): Promise<Project> {
    await delay(600);
    
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    projects[index] = {
      ...projects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    
    return { ...projects[index] };
  },

  async deleteProject(id: string): Promise<void> {
    await delay(500);
    
    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }
    
    projects.splice(index, 1);
  },
};