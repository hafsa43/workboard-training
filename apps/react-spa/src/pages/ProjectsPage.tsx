import { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { ProjectFormModal } from '../components/projects/ProjectFormModal';
import { useUIStore } from '../stores/uiStore';
import type { ProjectCreateFormData } from '../schemas/project.schema';
interface Project {
  id: string;
  name: string;
  description?: string;
}
export function ProjectsPage() {
  // ✅ Use Zustand ONLY for toasts (global UI)
  const addToast = useUIStore((state) => state.addToast);
  
  // ✅ Keep projects in LOCAL state (not Zustand)
  const [projects, setProjects] = useState<Project[]>([
    { id: '1', name: 'Website Redesign', description: 'Modernize company website' },
    { id: '2', name: 'Mobile App', description: 'Build iOS and Android app' },
    { id: '3', name: 'API Integration', description: 'Connect to third-party services' },
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const handleCreateProject = async (data: ProjectCreateFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newProject: Project = {
      id: Date.now().toString(),
      name: data.name,
      description: data.description,
    };
    setProjects([...projects, newProject]);
    
    addToast({
      type: 'success',
      message: `Project "${data.name}" created successfully!`,
    });
  };
  const handleEditProject = async (data: ProjectCreateFormData) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    if (editingProject) {
      setProjects(
        projects.map((p) =>
          p.id === editingProject.id
            ? { ...p, name: data.name, description: data.description }
            : p
        )
      );
      
      addToast({
        type: 'success',
        message: `Project "${data.name}" updated successfully!`,
      });
      
      setEditingProject(null);
    }
  };
  const handleDeleteProject = (id: string) => {
    const project = projects.find((p) => p.id === id);
    
    if (confirm('Are you sure you want to delete this project?')) {
      setProjects(projects.filter((p) => p.id !== id));
      
      addToast({
        type: 'info',
        message: `Project "${project?.name}" deleted.`,
      });
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} title={project.name}>
            <p className="text-gray-600 mb-4">
              {project.description || 'No description'}
            </p>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setEditingProject(project)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteProject(project.id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      {/* Create Modal */}
      <ProjectFormModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateProject}
        mode="create"
      />
      {/* Edit Modal */}
      {editingProject && (
        <ProjectFormModal
          isOpen={!!editingProject}
          onClose={() => setEditingProject(null)}
          onSubmit={handleEditProject}
          initialData={{
            name: editingProject.name,
            description: editingProject.description || '',
          }}
          mode="edit"
        />
      )}
    </div>
  );
}