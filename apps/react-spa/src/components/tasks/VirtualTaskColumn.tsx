import { useRef } from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { TaskCard } from './TaskCard';
import type { Task, TaskStatus } from '../../types/task';

interface VirtualTaskColumnProps {
  status: TaskStatus;
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  doing: 'In Progress',
  done: 'Done',
};

export function VirtualTaskColumn({
  status,
  tasks,
  onEdit,
  onDelete,
  onStatusChange,
}: VirtualTaskColumnProps) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: tasks.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 120, // Estimated height of each task card
    overscan: 5, // Render 5 extra items above/below viewport
  });

  return (
    <div className="bg-gray-100 rounded-lg p-4">
      <h3 className="font-semibold text-lg mb-4 text-gray-700">
        {statusLabels[status]} ({tasks.length})
      </h3>
      
      <div
        ref={parentRef}
        className="space-y-3 overflow-auto"
        style={{ maxHeight: '600px' }}
      >
        <div
          style={{
            height: `${virtualizer.getTotalSize()}px`,
            width: '100%',
            position: 'relative',
          }}
        >
          {virtualizer.getVirtualItems().map((virtualItem) => {
            const task = tasks[virtualItem.index];
            return (
              <div
                key={task.id}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transform: `translateY(${virtualItem.start}px)`,
                }}
              >
                <TaskCard
                  task={task}
                  onEdit={() => onEdit(task)}
                  onDelete={() => onDelete(task.id)}
                  onStatusChange={(id, newStatus) => onStatusChange(id, newStatus)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}