import { useEffect } from 'react';
import { Card } from '../components/ui/Card';

export function DashboardPage() {
  // Set document title for screen readers and browser tab
  useEffect(() => {
    document.title = 'Dashboard | WorkBoard';
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      
      <div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        role="region"
        aria-label="Dashboard statistics"
      >
        <Card title="Total Projects" as="article">
          <p className="text-4xl font-bold text-blue-600" aria-label="12 total projects">
            12
          </p>
        </Card>
        
        <Card title="Active Tasks" as="article">
          <p className="text-4xl font-bold text-green-600" aria-label="28 active tasks">
            28
          </p>
        </Card>
        
        <Card title="Completed" as="article">
          <p className="text-4xl font-bold text-gray-600" aria-label="156 completed tasks">
            156
          </p>
        </Card>
      </div>
    </div>
  );
}