import Link from 'next/link';
import { Card } from '@/components/ui/Card';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage(props: PageProps) {
  const params = await props.params;
  
  return (
    <div className="space-y-6">
      <div className="text-sm text-gray-600">
        <Link href="/projects" className="hover:text-blue-600">
          Projects
        </Link>
        <span className="mx-2">/</span>
        <span>Project #{params.id}</span>
      </div>

      <div>
        <h1 className="text-3xl font-bold mb-2">Project #{params.id}</h1>
      </div>

      <Card>
        <h2 className="text-xl font-semibold mb-3">Description</h2>
        <p className="text-gray-600 leading-relaxed">
          Project details coming soon...
        </p>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="text-sm font-medium text-gray-500">Project ID</span>
            <p className="text-gray-900 mt-1">{params.id}</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
