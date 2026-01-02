import { useState } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { TaskColumn } from './TaskColumn';
import { TaskFormModal } from './TaskFormModal';
import { Button } from '../ui/Button';
import type { Task, TaskStatus } from '../../types/task';
import type { TaskFormData } from '../../schemas/task.schema';
import { TASK_STATUSES } from '../../types/task';

interface TaskBoardProps {
  projectId: string;
}

export const TaskBoard = ({ projectId }: TaskBoardProps) => {
  const { tasks, isLoading, createTask, updateTask, deleteTask, updateTaskStatus } = useTasks(projectId);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const groupedTasks = TASK_STATUSES.reduce((acc, status) => {
    acc[status] = tasks.filter(task => task.status === status);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data: TaskFormData) => {
    if (editingTask) {
      await updateTask(editingTask.id, data);
    } else {
      await createTask({ ...data, projectId });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      await deleteTask(id);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading tasks...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
        <Button onClick={handleCreate}>+ New Task</Button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {TASK_STATUSES.map(status => (
          <TaskColumn
            key={status}
            status={status}
            tasks={groupedTasks[status]}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onStatusChange={updateTaskStatus}
          />
        ))}
      </div>

      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        task={editingTask}
        projectId={projectId}
      />
    </div>
  );
};
