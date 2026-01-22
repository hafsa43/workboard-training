import type { Task, TaskStatus } from '../../types/task';
import { TASK_STATUS_LABELS } from '../../types/task';
import { TaskCard } from './TaskCard';

interface TaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export const TaskColumn = ({ status, tasks, onEdit, onDelete, onStatusChange }: TaskColumnProps) => {
  const statusColors = {
    todo: 'bg-gray-100 border-gray-300',
    doing: 'bg-blue-50 border-blue-300',
    done: 'bg-green-50 border-green-300',
  };

  return (
    <div className={`flex-1 min-w-[300px] border-2 rounded-lg p-4 ${statusColors[status]}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-lg text-gray-800">
          {TASK_STATUS_LABELS[status]}
        </h3>
        <span className="bg-white px-2 py-1 rounded-full text-sm font-medium text-gray-600">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No tasks</p>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onStatusChange={onStatusChange}
            />
          ))
        )}
      </div>
    </div>
  );
};
