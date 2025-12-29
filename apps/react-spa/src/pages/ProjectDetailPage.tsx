import { useParams } from 'react-router-dom';
import { Card } from '../components/ui/Card';
export function ProjectDetailPage() {
  const { projectId } = useParams();
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Project Details
      </h1>
      <Card>
        <p className="text-gray-600">
          Viewing project: <strong>{projectId}</strong>
        </p>
        <p className="mt-4 text-gray-600">
          Task list and details will go here...
        </p>
      </Card>
    </div>
  );
}