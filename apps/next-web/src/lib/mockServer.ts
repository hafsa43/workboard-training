import type { Project } from '@/types/project';

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
  },
};