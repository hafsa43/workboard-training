import type { Project, ProjectsResponse, CreateProjectDto, UpdateProjectDto } from '../types/project.ts';
import type { Task, CreateTaskDTO, UpdateTaskDTO, TaskStatus } from '../types/task.ts';

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
    status: 'archived',
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
  {
    id: '4',
    name: 'E-commerce Platform',
    description: 'Build online shopping platform',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Customer Portal',
    description: 'Self-service customer portal',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Data Analytics Dashboard',
    description: 'Real-time analytics and reporting',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Marketing Campaign',
    description: 'Q1 2026 marketing initiatives',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '8',
    name: 'Infrastructure Upgrade',
    description: 'Cloud infrastructure migration',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Security Audit',
    description: 'Comprehensive security review',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '10',
    name: 'Training Program',
    description: 'Employee skill development',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'Product Launch',
    description: 'New product line introduction',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'Legacy System Retirement',
    description: 'Decommission old systems',
    status: 'archived',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// Mock Tasks storage
let mockTasks: Task[] = [];
let taskIdCounter = 1;

const generateTaskId = () => `task-${taskIdCounter++}`;

// Seed tasks function
const seedTasks = () => {
  if (projects.length > 0) {
    const projectId = projects[0].id;
    mockTasks.push(
      {
        id: generateTaskId(),
        projectId,
        title: 'Design homepage mockup',
        description: 'Create initial design concepts',
        status: 'done',
        priority: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateTaskId(),
        projectId,
        title: 'Implement authentication',
        description: 'Add login and registration',
        status: 'doing',
        priority: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: generateTaskId(),
        projectId,
        title: 'Write documentation',
        description: 'API documentation',
        status: 'todo',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    );
  }
};

// Call seed data
seedTasks();

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  async getProjects(filters?: { search?: string; status?: 'active' | 'archived' | 'completed' | 'all' }, pagination?: { page: number; pageSize: number }): Promise<ProjectsResponse> {
    await delay(1500);
    
    let filteredProjects = [...projects];
    
    // Apply search filter
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProjects = filteredProjects.filter(p =>
        p.name.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply status filter
    if (filters?.status && filters.status !== 'all') {
      filteredProjects = filteredProjects.filter(p => p.status === filters.status);
    }
    
    const total = filteredProjects.length;
    const pageSize = pagination?.pageSize || 10;
    const totalPages = Math.ceil(total / pageSize);
    
    // Apply pagination
    if (pagination) {
      const start = (pagination.page - 1) * pagination.pageSize;
      const end = start + pagination.pageSize;
      filteredProjects = filteredProjects.slice(start, end);
    }
    
    return {
      projects: filteredProjects,
      total,
      page: pagination?.page,
      pageSize: pagination?.pageSize,
      totalPages,
    };
  },

  async getProject(id: string): Promise<Project> {
    await delay(1500);
    const project = projects.find((p) => p.id === id);
    if (!project) {
      throw new Error(`Project with ID ${id} not found`);
    }
    return { ...project };
  },

  async createProject(data: CreateProjectDto): Promise<Project> {
    await delay(1500);

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
    await delay(1500);

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
    await delay(1500);

    const index = projects.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error(`Project with ID ${id} not found`);
    }

    projects.splice(index, 1);
  },
};

// Mock Server for Tasks
export const mockServer = {
  async getTasks(projectId: string): Promise<Task[]> {
    await delay(1500);
    return mockTasks.filter((task) => task.projectId === projectId);
  },

  async getTask(id: string): Promise<Task | null> {
    await delay(1500);
    const task = mockTasks.find((task) => task.id === id);
    return task || null;
  },

  async createTask(data: CreateTaskDTO): Promise<Task> {
    await delay(1500);
    const newTask: Task = {
      id: generateTaskId(),
      projectId: data.projectId,
      title: data.title,
      description: data.description || '',
      status: data.status || 'todo',
      priority: data.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTasks.push(newTask);
    return { ...newTask };
  },

  async updateTask(id: string, data: UpdateTaskDTO): Promise<Task> {
    await delay(1500);
    const index = mockTasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }

    mockTasks[index] = {
      ...mockTasks[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };

    return { ...mockTasks[index] };
  },

  async deleteTask(id: string): Promise<void> {
    await delay(1500);
    const index = mockTasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }
    mockTasks.splice(index, 1);
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    await delay(1500);
    const index = mockTasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error(`Task with ID ${id} not found`);
    }

    mockTasks[index] = {
      ...mockTasks[index],
      status,
      updatedAt: new Date().toISOString(),
    };

    return { ...mockTasks[index] };
  },
};