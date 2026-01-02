import type { Task, TaskStatus } from '../../types/task';
import { TASK_STATUS_LABELS } from '../../types/task';
import { Card } from '../ui/Card';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const priorityColors = {
    low: 'bg-blue-100 text-blue-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800',
  };

  const isOptimistic = task.id.startsWith('temp-');

  return (
    <Card className={`p-4 hover:shadow-md transition-shadow ${isOptimistic ? 'opacity-60' : ''}`}>
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-semibold text-gray-900">{task.title}</h4>
        <span className={`px-2 py-1 rounded text-xs font-medium ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}

      <div className="flex items-center justify-between">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={isOptimistic}
        >
          {Object.entries(TASK_STATUS_LABELS).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 text-sm"
            disabled={isOptimistic}
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 text-sm"
            disabled={isOptimistic}
          >
            Delete
          </button>
        </div>
      </div>
    </Card>
  );
};
