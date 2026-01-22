import { useState, useMemo } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { TaskColumn } from './TaskColumn';
import { TaskFormModal } from './TaskFormModal';
import { TaskFilters } from './TaskFilters';
import { Button } from '../ui/Button';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useDebounce } from '../../hooks/useDebounce';
import type { Task, TaskStatus } from '../../types/task';
import { TASK_STATUSES } from '../../types/task';
import type { TaskFormData } from '../../schemas/task.schema';
import type { TaskFilters as ITaskFilters } from '../../utils/filterTypes';

interface TaskBoardProps {
  projectId: string;
}

export const TaskBoard = ({ projectId }: TaskBoardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { params, setParams, clearParams } = useQueryParams<{
    search: string;
    priority: string;
  }>();

  // Local state for immediate UI updates
  const [localFilters, setLocalFilters] = useState<ITaskFilters>({
    search: params.search || '',
    priority: (params.priority as ITaskFilters['priority']) || 'all',
  });

  // Debounce search
  const debouncedSearch = useDebounce(localFilters.search, 300);

  // Actual filters for API
  const filters = useMemo<ITaskFilters>(() => ({
    search: debouncedSearch,
    priority: localFilters.priority,
  }), [debouncedSearch, localFilters.priority]);

  const { tasks, isLoading, createTask, updateTask, deleteTask, updateTaskStatus } = 
    useTasks(projectId, filters);

  // Sync debounced search to URL
  useMemo(() => {
    if (debouncedSearch !== params.search) {
      setParams({
        search: debouncedSearch || undefined,
      }, true);
    }
  }, [debouncedSearch]);

  const groupedTasks = TASK_STATUSES.reduce((acc, status) => {
    acc[status] = tasks.filter((task) => task.status === status);
    return acc;
  }, {} as Record<TaskStatus, Task[]>);

  const handleFiltersChange = (newFilters: ITaskFilters) => {
    setLocalFilters(newFilters);
    // Update URL immediately for non-search fields
    if (newFilters.priority !== localFilters.priority) {
      setParams({
        priority: newFilters.priority === 'all' ? undefined : newFilters.priority,
      });
    }
  };

  const handleClearFilters = () => {
    setLocalFilters({ search: '', priority: 'all' });
    clearParams();
  };

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
    setIsModalOpen(false);
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
    <>
      <div className="mb-4 flex justify-between items-start gap-4">
        <div className="flex-1">
          <TaskFilters
            filters={localFilters}
            onFiltersChange={handleFiltersChange}
            onClear={handleClearFilters}
          />
        </div>
        <Button onClick={handleCreate}>Add Task</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {TASK_STATUSES.map((status) => (
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
        onClose={() => {
          setIsModalOpen(false);
          setEditingTask(null);
        }}
        onSubmit={handleSubmit}
        task={editingTask}
        projectId={projectId}
      />
    </>
  );
};