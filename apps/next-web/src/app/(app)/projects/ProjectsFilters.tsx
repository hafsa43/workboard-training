'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import type { ProjectFilters } from '@/types/project';

interface ProjectsFiltersProps {
  initialFilters: ProjectFilters;
}

export function ProjectsFilters({ initialFilters }: ProjectsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(initialFilters.search || '');
  const [status, setStatus] = useState(initialFilters.status || 'all');

  const updateFilters = (newSearch?: string, newStatus?: string) => {
    const params = new URLSearchParams(searchParams);
    
    const searchValue = newSearch !== undefined ? newSearch : search;
    const statusValue = newStatus !== undefined ? newStatus : status;

    if (searchValue) {
      params.set('search', searchValue);
    } else {
      params.delete('search');
    }

    if (statusValue !== 'all') {
      params.set('status', statusValue);
    } else {
      params.delete('status');
    }

    params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`/projects?${params.toString()}`);
  };

  const handleSearch = () => {
    updateFilters(search, status);
  };

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus as 'all' | 'active' | 'completed' | 'archived');
    updateFilters(search, newStatus);
  };

  const handleClear = () => {
    setSearch('');
    setStatus('all');
    router.push('/projects');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <Input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>

        <div className="min-w-[150px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <Button onClick={handleSearch}>Search</Button>
        <Button variant="secondary" onClick={handleClear}>
          Clear
        </Button>
      </div>
    </div>
  );

}