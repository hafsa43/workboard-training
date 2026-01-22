import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectCreateSchema} from '../../schemas/project.schema';
import type { ProjectCreateFormData } from '../../schemas/project.schema';
import { FormInput } from '../forms/FormInput';
import { FormTextarea } from '../forms/FormTextarea';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
interface ProjectFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectCreateFormData) => Promise<void>;
  initialData?: ProjectCreateFormData;
  mode: 'create' | 'edit';
}
export function ProjectFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  mode,
}: ProjectFormModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProjectCreateFormData>({
    resolver: zodResolver(projectCreateSchema),
    defaultValues: initialData || {
      name: '',
      description: '',
    },
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
        <FormInput
          label="Project Name"
          error={errors.name}
          disabled={isSubmitting}
          required
          placeholder="Enter project name"
          helperText="2-80 characters"
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
        <div className="flex justify-end gap-2 pt-4">
          <Button
            type="button"
            variant="secondary"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting
              ? mode === 'create'
                ? 'Creating...'
                : 'Saving...'
              : mode === 'create'
              ? 'Create Project'
              : 'Save Changes'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}