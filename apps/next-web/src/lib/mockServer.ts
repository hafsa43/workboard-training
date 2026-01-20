import type { Project } from '@/types/project';
import type { Task, CreateTaskDTO, UpdateTaskDTO } from '@/types/task';

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Website Redesign',
    description: 'Complete overhaul of company website with modern design',
    status: 'active',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Mobile App Development',
    description: 'iOS and Android native app development',
    status: 'active',
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'API Integration',
    description: 'Third-party API integration and migration',
    status: 'completed',
    createdAt: new Date('2023-12-10').toISOString(),
    updatedAt: new Date('2024-01-05').toISOString(),
  },
  {
    id: '4',
    name: 'Database Migration',
    description: 'Migrate from PostgreSQL to MongoDB',
    status: 'active',
    createdAt: new Date('2024-01-25').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Security Audit',
    description: 'Comprehensive security audit and fixes',
    status: 'completed',
    createdAt: new Date('2023-11-01').toISOString(),
    updatedAt: new Date('2023-12-15').toISOString(),
  },
  {
    id: '6',
    name: 'Performance Optimization',
    description: 'Frontend and backend performance improvements',
    status: 'active',
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '7',
    name: 'Documentation Portal',
    description: 'Internal documentation and knowledge base',
    status: 'archived',
    createdAt: new Date('2023-10-01').toISOString(),
    updatedAt: new Date('2023-12-01').toISOString(),
  },
  {
    id: '8',
    name: 'Analytics Dashboard',
    description: 'Real-time analytics and reporting dashboard',
    status: 'active',
    createdAt: new Date('2024-01-30').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '9',
    name: 'Payment Gateway',
    description: 'Stripe payment integration',
    status: 'completed',
    createdAt: new Date('2023-09-15').toISOString(),
    updatedAt: new Date('2023-11-20').toISOString(),
  },
  {
    id: '10',
    name: 'Email Campaign System',
    description: 'Automated email marketing campaigns',
    status: 'active',
    createdAt: new Date('2024-02-05').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '11',
    name: 'Chat Feature',
    description: 'Real-time chat with WebSocket',
    status: 'active',
    createdAt: new Date('2024-02-10').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '12',
    name: 'CI/CD Pipeline',
    description: 'GitHub Actions CI/CD automation',
    status: 'completed',
    createdAt: new Date('2023-08-01').toISOString(),
    updatedAt: new Date('2023-09-10').toISOString(),
  },
];

export const mockServer = {
  getProjects: async (): Promise<Project[]> => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return [...mockProjects];
  },

  getProject: async (id: string): Promise<Project | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProjects.find(p => p.id === id);
  },

  createProject: async (data: { name: string; description?: string }): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newProject: Project = {
      id: String(Date.now()),
      name: data.name,
      description: data.description,
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockProjects.unshift(newProject);
    return newProject;
  },

  updateProject: async (id: string, data: Partial<Project>): Promise<Project> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    
    mockProjects[index] = {
      ...mockProjects[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockProjects[index];
  },

  deleteProject: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const index = mockProjects.findIndex(p => p.id === id);
    if (index === -1) throw new Error('Project not found');
    mockProjects.splice(index, 1);
    // Also delete tasks for this project
    mockTasks = mockTasks.filter(t => t.projectId !== id);
  },
};

// Mock tasks data
let mockTasks: Task[] = [
  {
    id: '1',
    projectId: '1',
    title: 'Design homepage mockup',
    description: 'Create wireframes and high-fidelity mockups',
    status: 'done',
    priority: 'high',
    createdAt: new Date('2024-01-10').toISOString(),
    updatedAt: new Date('2024-01-12').toISOString(),
  },
  {
    id: '2',
    projectId: '1',
    title: 'Develop navigation component',
    description: 'Build responsive navigation with mobile menu',
    status: 'doing',
    priority: 'high',
    createdAt: new Date('2024-01-11').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    projectId: '1',
    title: 'Setup hosting',
    description: 'Configure Vercel deployment',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date('2024-01-12').toISOString(),
    updatedAt: new Date('2024-01-12').toISOString(),
  },
  {
    id: '4',
    projectId: '2',
    title: 'Setup React Native project',
    description: 'Initialize app with TypeScript and navigation',
    status: 'done',
    priority: 'high',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-16').toISOString(),
  },
  {
    id: '5',
    projectId: '2',
    title: 'Build authentication screens',
    description: 'Login, signup, forgot password',
    status: 'doing',
    priority: 'high',
    createdAt: new Date('2024-01-16').toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '6',
    projectId: '2',
    title: 'Integrate push notifications',
    description: 'Setup Firebase Cloud Messaging',
    status: 'todo',
    priority: 'medium',
    createdAt: new Date('2024-01-17').toISOString(),
    updatedAt: new Date('2024-01-17').toISOString(),
  },
];

export const mockTasksServer = {
  getTasks: async (projectId: string): Promise<Task[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockTasks.filter(t => t.projectId === projectId);
  },

  getTask: async (id: string): Promise<Task | undefined> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockTasks.find(t => t.id === id);
  },

  createTask: async (data: CreateTaskDTO): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newTask: Task = {
      id: String(Date.now()),
      projectId: data.projectId,
      title: data.title,
      description: data.description,
      status: data.status || 'todo',
      priority: data.priority || 'medium',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    mockTasks.unshift(newTask);
    return newTask;
  },

  updateTask: async (id: string, data: UpdateTaskDTO): Promise<Task> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    mockTasks[index] = {
      ...mockTasks[index],
      ...data,
      updatedAt: new Date().toISOString(),
    };
    return mockTasks[index];
  },

  deleteTask: async (id: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    mockTasks.splice(index, 1);
  },
};
