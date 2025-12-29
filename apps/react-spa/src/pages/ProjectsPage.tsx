import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
export function ProjectsPage() {
  const projects = [
    { id: '1', name: 'Website Redesign', description: 'Modernize company website' },
    { id: '2', name: 'Mobile App', description: 'Build iOS and Android app' },
    { id: '3', name: 'API Integration', description: 'Connect to third-party services' },
  ];
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
        <Button>New Project</Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} title={project.name}>
            <p className="text-gray-600">{project.description}</p>
            <Button variant="secondary" className="mt-4 w-full">
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}