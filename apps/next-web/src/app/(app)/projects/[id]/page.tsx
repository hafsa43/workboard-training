import { Card } from '@/components/ui/Card';

export default async function ProjectDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Project #{params.id}</h1>
      <Card>
        <h2 className="text-xl font-semibold mb-4">Project Details</h2>
        <p className="text-gray-600">Project ID: {params.id}</p>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Tasks</h3>
          <p className="text-sm text-gray-500">No tasks yet. Add your first task to get started.</p>
        </div>
      </Card>
    </div>
  );
}
