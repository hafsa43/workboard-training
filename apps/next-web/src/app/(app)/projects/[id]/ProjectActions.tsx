'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ProjectFormModal } from '@/components/projects/ProjectFormModal';
import type { Project } from '@/types/project';
import type { ProjectCreateFormData } from '@/schemas/project.schema';

interface ProjectActionsProps {
  projectId: string;
  initialData: Project;
}

export function ProjectActions({ projectId, initialData }: ProjectActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (data: ProjectCreateFormData) => {
    setIsUpdating(true);
    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update project');
      }

      router.refresh();
      setIsEditModalOpen(false);
    } catch (error) {
      console.error('Update failed:', error);
      alert('Failed to update project. Please try again.');
    } finally {
      setIsUpdating(false);
    }
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
        const error = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(error.error || 'Failed to delete project');
      }

      // Navigate first, then refresh
      router.push('/projects');
      setTimeout(() => router.refresh(), 100);
    } catch (error) {
      console.error('Delete failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete project. Please try again.');
      setIsDeleting(false);
    }
  };

  return (
    <>
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

      <ProjectFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdate}
        initialData={initialData}
        isSubmitting={isUpdating}
        mode="edit"
      />
    </>
  );
}
