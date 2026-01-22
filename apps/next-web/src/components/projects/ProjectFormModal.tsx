'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectCreateSchema, projectUpdateSchema, type ProjectCreateFormData } from '@/schemas/project.schema';
import { Input } from '../ui/Input';
import { FormTextarea } from '../forms/FormTextarea';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import type { Project } from '@/types/project';

interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: Project;
  isSubmitting?: boolean;
  mode?: 'create' | 'edit';
}

export function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  isSubmitting = false,
  mode = 'create',
}: ProjectFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: zodResolver(mode === 'edit' ? projectUpdateSchema : projectCreateSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      description: initialData.description || '',
      status: initialData.status,
    } : undefined,
  });

  const handleFormSubmit = async (data: ProjectCreateFormData) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={mode === 'create' ? 'Create New Project' : 'Edit Project'}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <Input
          label="Project Name"
          error={errors.name?.message as string}
          disabled={isSubmitting}
          required
          placeholder="Enter project name"
          {...register('name')}
        />

        <FormTextarea
          label="Description"
          error={errors.description}
          disabled={isSubmitting}
          placeholder="Enter project description (optional)"
          helperText="Maximum 500 characters"
          rows={4}
          {...register('description')}
        />

        {mode === 'edit' && (
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              id="status"
              {...register('status')}
              disabled={isSubmitting}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
            {errors.status && (
              <p className="mt-1 text-sm text-red-600">{errors.status.message as string}</p>
            )}
          </div>
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting} isLoading={isSubmitting}>
            {mode === 'create' ? 'Create Project' : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
