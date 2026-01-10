'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function ProjectsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Projects page error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="text-center py-12 max-w-md">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          {error.message || 'Failed to load projects. Please try again.'}
        </p>
        <div className="flex gap-3 justify-center">
          <Button onClick={reset}>Try Again</Button>
          <Button variant="secondary" onClick={() => window.location.href = '/dashboard'}>
            Go to Dashboard
          </Button>
        </div>
      </Card>
    </div>
  );
}
