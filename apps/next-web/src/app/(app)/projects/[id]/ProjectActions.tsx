'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import type { Project } from '@/types/project';

interface ProjectActionsProps {
  projectId: string;
  initialData: Project;
}

export function ProjectActions({ projectId, initialData }: ProjectActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    // TODO: Implement edit modal in Day 13
    alert('Edit functionality will be implemented in Day 13 with React Query');
  };

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${initialData.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      router.push('/projects');
      router.refresh(); // Revalidate server components
    } catch (error) {
      console.error('Delete failed:', error);
      alert('Failed to delete project. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="secondary" onClick={handleEdit}>
        Edit
      </Button>
      <Button
        variant="danger"
        onClick={handleDelete}
        disabled={isDeleting}
        isLoading={isDeleting}
      >
        Delete
      </Button>
    </div>
  );
}