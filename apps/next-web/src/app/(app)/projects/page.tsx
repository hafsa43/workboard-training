import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

export default function ProjectsPage() {
  const projects = [
    { id: 1, name: 'Website Redesign', status: 'active', tasks: 12 },
    { id: 2, name: 'Mobile App', status: 'planning', tasks: 8 },
    { id: 3, name: 'API Integration', status: 'completed', tasks: 15 },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Button>+ New Project</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
              <p className="text-sm text-gray-600 mb-2 capitalize">Status: {project.status}</p>
              <p className="text-sm text-gray-600">{project.tasks} tasks</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
