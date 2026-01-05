import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { TaskFilters } from '../../utils/filterTypes';

interface TaskFiltersProps {
  filters: TaskFilters;
  onFiltersChange: (filters: TaskFilters) => void;
  onClear: () => void;
}

export function TaskFilters({ 
  filters, 
  onFiltersChange, 
  onClear 
}: TaskFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <Input
            type="text"
            placeholder="Search tasks..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.priority || 'all'}
            onChange={(e) => 
              onFiltersChange({ 
                ...filters, 
                priority: e.target.value as TaskFilters['priority']
              })
            }
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <Button variant="secondary" onClick={onClear}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
}