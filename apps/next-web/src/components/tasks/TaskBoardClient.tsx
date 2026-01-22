'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TaskCard } from './TaskCard';
import { TaskFormModal } from './TaskFormModal';
import { Button } from '@/components/ui/Button';
import type { Task, TaskStatus } from '@/types/task';
import type { TaskCreateInput } from '@/schemas/task.schema';
import { TASK_STATUS_LABELS } from '@/types/task';

interface TaskBoardClientProps {
  projectId: string;
  initialTasks: Task[];
}

export function TaskBoardClient({ projectId, initialTasks }: TaskBoardClientProps) {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();

  const groupedTasks = {
    todo: tasks.filter(t => t.status === 'todo'),
    doing: tasks.filter(t => t.status === 'doing'),
    done: tasks.filter(t => t.status === 'done'),
  };

  const handleCreateTask = async (data: TaskCreateInput) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      const newTask = await response.json();
      setTasks((prev) => [...prev, newTask]);
      router.refresh();
    } catch (error) {
      console.error('Error creating task:', error);
      alert('Failed to create task. Please try again.');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleUpdateTask = async (data: TaskCreateInput) => {
    if (!editingTask) return;

    try {
      const response = await fetch(`/api/tasks/${editingTask.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      const updatedTask = await response.json();
      setTasks((prev) =>
        prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
      );
      router.refresh();
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task. Please try again.');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete task');
      }

      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      router.refresh();
    } catch (error) {
      console.error('Error deleting task:', error);
      alert('Failed to delete task. Please try again.');
    }
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <Button onClick={() => setIsCreateModalOpen(true)}>New Task</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(['todo', 'doing', 'done'] as TaskStatus[]).map((status) => {
            const columnColors = {
              todo: 'bg-blue-50 border-blue-200',
              doing: 'bg-yellow-50 border-yellow-200',
              done: 'bg-green-50 border-green-200',
            };
            const badgeColors = {
              todo: 'bg-blue-100 text-blue-800',
              doing: 'bg-yellow-100 text-yellow-800',
              done: 'bg-green-100 text-green-800',
            };
            
            return (
            <div key={status} className={`${columnColors[status]} border-2 rounded-lg p-4`}>
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center justify-between">
                {TASK_STATUS_LABELS[status]}
                <span className={`text-sm font-medium px-2 py-1 rounded-full ${badgeColors[status]}`}>
                  {groupedTasks[status].length}
                </span>
              </h3>

              <div>
                {groupedTasks[status].length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-8">
                    No tasks
                  </p>
                ) : (
                  groupedTasks[status].map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onEdit={handleEditTask}
                      onDelete={handleDeleteTask}
                    />
                  ))
                )}
              </div>
            </div>
            );
          })}
        </div>
      </div>

      <TaskFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateTask}
        projectId={projectId}
        mode="create"
      />

      <TaskFormModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTask(undefined);
        }}
        onSubmit={handleUpdateTask}
        task={editingTask}
        projectId={projectId}
        mode="edit"
      />
    </>
  );
}

