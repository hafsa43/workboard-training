import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProjectFormModal } from '../components/projects/ProjectFormModal';
import { useProject, useUpdateProject, useDeleteProject } from '../hooks/useProjects';
import type { ProjectCreateFormData } from '../schemas/project.schema';

export function ProjectDetailPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const { data: project, isLoading, isError, error } = useProject(projectId!);
  const updateProject = useUpdateProject();
  const deleteProject = useDeleteProject();

  const handleUpdateProject = async (formData: ProjectCreateFormData) => {
    if (!projectId) return;

    await updateProject.mutateAsync({
      id: projectId,
      data: {
        name: formData.name,
        description: formData.description || undefined,
      },
    });
    setIsEditModalOpen(false);
  };

  const handleDeleteProject = async () => {
    if (!projectId) return;
    
    const confirmed = window.confirm(
      'Are you sure you want to delete this project? This action cannot be undone.'
    );
    
    if (confirmed) {
      await deleteProject.mutateAsync(projectId);
      navigate('/projects');
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
          <Card>
            <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </Card>
        </div>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="space-y-4">
        <Card>
          <div className="text-center py-12">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Project Not Found
            </h3>
            <p className="text-gray-600 mb-4">
              {error instanceof Error
                ? error.message
                : 'The project you are looking for does not exist.'}
            </p>
            <Button onClick={() => navigate('/projects')}>
              Back to Projects
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              onClick={() => setIsEditModalOpen(true)}
            >
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={handleDeleteProject}
              disabled={deleteProject.isPending}
            >
              {deleteProject.isPending ? 'Deleting...' : 'Delete'}
            </Button>
          </div>
        </div>

        <Card title="Project Details">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Description</h3>
              <p className="mt-1 text-gray-900">
                {project.description || 'No description provided'}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Status</h3>
              <span
                className={`inline-block mt-1 px-3 py-1 rounded-full text-sm font-medium ${
                  project.status === 'active'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'completed'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {project.status}
              </span>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">Created</h3>
              <p className="mt-1 text-gray-900">
                {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Last Updated
              </h3>
              <p className="mt-1 text-gray-900">
                {new Date(project.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Card>
      </div>

      <ProjectFormModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleUpdateProject}
        initialData={project}
        isSubmitting={updateProject.isPending}
        mode="edit"
      />
    </>
  );
}
