import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProject } from '@/lib/projectsApi';
import { getTasks } from '@/lib/tasksApi';
import { Card } from '@/components/ui/Card';
import { ProjectActions } from './ProjectActions';
import { TaskBoardClient } from '@/components/tasks/TaskBoardClient';
import Link from 'next/link';

// Cache individual project pages for 60 seconds
export const revalidate = 60;
// Generate static params for known projects (optional)
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  try {
    const project = await getProject(id);
    
    if (!project) {
      return {
        title: 'Project Not Found',
        description: 'The requested project could not be found',
      };
    }
    
    return {
      title: project.name,
      description: project.description || `Manage tasks and details for ${project.name}`,
      openGraph: {
        title: project.name,
        description: project.description || `Project: ${project.name}`,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Project',
      description: 'View project details and tasks',
    };
  }
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const [project, tasks] = await Promise.all([
    getProject(id),
    getTasks(id),
  ]);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600">
        <Link href="/projects" className="hover:text-primary-600">
          Projects
        </Link>
        <span className="mx-2">/</span>
        <span>{project.name}</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
          <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
              project.status === 'active' ? 'bg-green-100 text-green-800' :
              project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {project.status}
            </span>
            <span className="text-sm text-gray-500">
              Updated {new Date(project.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
        <ProjectActions projectId={id} initialData={project} />
      </div>

      {/* Description */}
      <Card>
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-600 leading-relaxed">
          {project.description || 'No description available'}
        </p>
      </Card>

      {/* Details */}
      <Card>
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-500">Project ID</span>
            <p className="text-gray-900 mt-1">{project.id}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Status</span>
            <p className="text-gray-900 mt-1 capitalize">{project.status}</p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Created At</span>
            <p className="text-gray-900 mt-1">
              {new Date(project.createdAt).toLocaleString()}
            </p>
          </div>
          <div>
            <span className="text-sm font-medium text-gray-500">Last Updated</span>
            <p className="text-gray-900 mt-1">
              {new Date(project.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </Card>

      {/* Tasks */}
      <TaskBoardClient projectId={id} initialTasks={tasks} />
    </div>
  );
}
