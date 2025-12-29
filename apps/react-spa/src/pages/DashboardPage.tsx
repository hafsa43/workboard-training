import { Card } from '../components/ui/Card';
export function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card title="Total Projects">
          <p className="text-4xl font-bold text-blue-600">12</p>
        </Card>
        <Card title="Active Tasks">
          <p className="text-4xl font-bold text-green-600">28</p>
        </Card>
        <Card title="Completed">
          <p className="text-4xl font-bold text-gray-600">156</p>
        </Card>
      </div>
    </div>
  );
}