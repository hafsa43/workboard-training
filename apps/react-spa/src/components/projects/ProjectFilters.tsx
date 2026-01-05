import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import type { ProjectFilters } from '../../utils/filterTypes';

interface ProjectFiltersProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
  onClear: () => void;
}

export function ProjectFilters({ 
  filters, 
  onFiltersChange, 
  onClear 
}: ProjectFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-4">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <Input
            type="text"
            placeholder="Search projects..."
            value={filters.search || ''}
            onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          />
        </div>

        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters.status || 'all'}
            onChange={(e) => 
              onFiltersChange({ 
                ...filters, 
                status: e.target.value as ProjectFilters['status']
              })
            }
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <Button variant="secondary" onClick={onClear}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
}