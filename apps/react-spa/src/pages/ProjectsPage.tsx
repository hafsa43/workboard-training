import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProjectFormModal } from '../components/projects/ProjectFormModal';
import { useProjects, useCreateProject } from '../hooks/useProjects';
import type { ProjectCreateFormData } from '../schemas/project.schema';

export function ProjectsPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError, error } = useProjects();
  const createProject = useCreateProject();

  const handleCreateProject = async (formData: ProjectCreateFormData) => {
    await createProject.mutateAsync({
      name: formData.name,
      description: formData.description || undefined,
    });
    setIsModalOpen(false);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        </div>
        <Card>
          <div className="text-center py-12">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Failed to Load Projects
            </h3>
            <p className="text-gray-600 mb-4">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  const projects = data?.projects || [];

  if (projects.length === 0) {
    return (
      <>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
            <Button onClick={() => setIsModalOpen(true)}>New Project</Button>
          </div>
          <Card>
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Projects Yet
              </h3>
              <p className="text-gray-600 mb-4">
                Get started by creating your first project
              </p>
              <Button onClick={() => setIsModalOpen(true)}>
                Create First Project
              </Button>
            </div>
          </Card>
        </div>

        <ProjectFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleCreateProject}
          isSubmitting={createProject.isPending}
        />
      </>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <Button onClick={() => setIsModalOpen(true)}>New Project</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="cursor-pointer"
              onClick={() => handleProjectClick(project.id)}
            >
              <Card className="hover:shadow-lg transition-shadow">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.name}
                </h3>
                <p className="text-gray-600 mb-4">
                  {project.description || 'No description'}
                </p>
                <div className="flex items-center justify-between">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
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
              </Card>
            </div>
          ))}
        </div>
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
        isSubmitting={createProject.isPending}
      />
    </>
  );
}
