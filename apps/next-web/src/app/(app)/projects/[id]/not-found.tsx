import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ProjectNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="text-center py-12 max-w-md">
        <div className="text-gray-400 text-8xl font-bold mb-4">404</div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Project Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The project you're looking for doesn't exist or has been deleted.
        </p>
        <div className="flex gap-3 justify-center">
          <Link href="/projects">
            <Button>Back to Projects</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="secondary">Go to Dashboard</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
