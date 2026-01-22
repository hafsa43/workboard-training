import { Card } from '@/components/ui/Card';

export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="h-5 bg-gray-200 rounded w-48 animate-pulse"></div>
      
      <div>
        <div className="h-9 bg-gray-200 rounded w-64 mb-3 animate-pulse"></div>
      </div>

      <Card className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-32 mb-3"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </Card>

      <Card className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-40 mb-4"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </Card>
    </div>
  );
}
