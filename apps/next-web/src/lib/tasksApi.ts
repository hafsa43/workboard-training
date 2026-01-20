import { mockTasksServer } from './mockServer';
import type { Task } from '@/types/task';

export async function getTasks(projectId: string): Promise<Task[]> {
  const tasks = await mockTasksServer.getTasks(projectId);
  return tasks;
}
