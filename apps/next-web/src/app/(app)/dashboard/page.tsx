import type { Metadata } from 'next';
import { Card } from '@/components/ui/Card';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'View your project statistics, active tasks, and productivity metrics',
};

// Cache for 60 seconds, then revalidate in background
export const revalidate = 60;

export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <h3 className="text-lg font-semibold mb-2">Total Projects</h3>
          <p className="text-3xl font-bold text-primary-600">12</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Active Tasks</h3>
          <p className="text-3xl font-bold text-primary-600">48</p>
        </Card>
        <Card>
          <h3 className="text-lg font-semibold mb-2">Completed</h3>
          <p className="text-3xl font-bold text-primary-600">156</p>
        </Card>
      </div>
    </div>
  );
}
