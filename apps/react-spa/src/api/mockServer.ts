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
  async getProjects(): Promise<ProjectsResponse> {
    await delay(1500);
    return {
      projects: [...projects],
      total: projects.length,
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