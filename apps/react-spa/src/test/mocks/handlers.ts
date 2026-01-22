import { http, HttpResponse, delay } from 'msw';
import type { Project } from '@/types/project';
import type { Task } from '@/types/task';

const baseUrl = 'http://localhost:3001/api';

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Test Project',
    description: 'Test description',
    status: 'active',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Test Task',
    description: 'Test description',
    status: 'todo',
    priority: 'medium',
    projectId: '1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
  },
];

export const handlers = [
  // Projects
  http.get(`${baseUrl}/projects`, async () => {
    await delay(100); // Simulate network delay
    return HttpResponse.json(mockProjects);
  }),

  http.get(`${baseUrl}/projects/:id`, async ({ params }) => {
    const project = mockProjects.find((p) => p.id === params.id);
    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }
    return HttpResponse.json(project);
  }),

  http.post(`${baseUrl}/projects`, async ({ request }) => {
    const body = await request.json() as Partial<Project>;
    const newProject: Project = {
      ...body as Project,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(newProject, { status: 201 });
  }),

  http.put(`${baseUrl}/projects/:id`, async ({ params, request }) => {
    const body = await request.json() as Partial<Project>;
    const project = mockProjects.find((p) => p.id === params.id);
    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }
    const updated = { ...project, ...body, updatedAt: new Date().toISOString() };
    return HttpResponse.json(updated);
  }),

  http.delete(`${baseUrl}/projects/:id`, async ({ params }) => {
    const project = mockProjects.find((p) => p.id === params.id);
    if (!project) {
      return new HttpResponse(null, { status: 404 });
    }
    return new HttpResponse(null, { status: 204 });
  }),

  // Tasks
  http.get(`${baseUrl}/tasks`, async ({ request }) => {
    const url = new URL(request.url);
    const projectId = url.searchParams.get('projectId');
    
    let filteredTasks = mockTasks;
    if (projectId) {
      filteredTasks = mockTasks.filter((t) => t.projectId === projectId);
    }
    
    await delay(100);
    return HttpResponse.json(filteredTasks);
  }),

  http.post(`${baseUrl}/tasks`, async ({ request }) => {
    const body = await request.json() as Partial<Task>;
    const newTask: Task = {
      ...body as Task,
      id: String(Date.now()),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return HttpResponse.json(newTask, { status: 201 });
  }),

  http.put(`${baseUrl}/tasks/:id`, async ({ params, request }) => {
    const body = await request.json() as Partial<Task>;
    const task = mockTasks.find((t) => t.id === params.id);
    if (!task) {
      return new HttpResponse(null, { status: 404 });
    }
    const updated = { ...task, ...body, updatedAt: new Date().toISOString() };
    return HttpResponse.json(updated);
  }),

  http.delete(`${baseUrl}/tasks/:id`, async ({ params }) => {
    const task = mockTasks.find((t) => t.id === params.id);
    if (!task) {
      return new HttpResponse(null, { status: 404 });
    }
    return new HttpResponse(null, { status: 204 });
  }),
];

// Error handlers for testing error states
export const errorHandlers = [
  http.get(`${baseUrl}/projects`, () => {
    return new HttpResponse(null, { status: 500 });
  }),
  http.get(`${baseUrl}/tasks`, () => {
    return new HttpResponse(null, { status: 500 });
  }),
];