import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { getProjects } from '@/lib/projectsApi';
import { Card } from '@/components/ui/Card';
import { ProjectsFilters } from './ProjectsFilters';
import { PaginationControls } from './PaginationControls';

// Cache for 60 seconds by default
export const revalidate = 60;
// Dynamic for URL parameters
export const dynamicParams = true;

interface PageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    page?: string;
  }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const status = params.status || 'all';
  const search = params.search;
  
  let title = 'Projects';
  let description = 'Browse and manage all your projects';
  
  if (search) {
    title = `Search: ${search} | Projects`;
    description = `Projects matching "${search}"`;
  } else if (status !== 'all') {
    title = `${status.charAt(0).toUpperCase() + status.slice(1)} Projects`;
    description = `View all ${status} projects in your workspace`;
  }
  
  return {
    title,
    description,
  };
}

export default async function ProjectsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const currentPage = parseInt(params.page || '1', 10);
  const filters = {
    search: params.search,
    status: (params.status as 'all' | 'active' | 'completed' | 'archived') || 'all',
  };

  // Server-side data fetching
  const data = await getProjects(filters, { page: currentPage, pageSize: 9 });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>

      {/* Client component for filters */}
      <ProjectsFilters initialFilters={filters} />

      <Suspense fallback={<ProjectsSkeleton />}>
        {data.projects.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-500 text-lg">No projects found</p>
            <p className="text-gray-400 text-sm mt-2">
              Try adjusting your filters or create a new project
            </p>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {data.projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
                    <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {project.description || 'No description'}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded font-medium ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' :
                        project.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {project.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(project.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>

            {data.totalPages > 1 && (
              <PaginationControls
                currentPage={data.page}
                totalPages={data.totalPages}
                total={data.total}
              />
            )}
          </>
        )}
      </Suspense>
    </div>
  );
}

function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-3"></div>
          <div className="flex justify-between">
            <div className="h-6 bg-gray-200 rounded w-16"></div>
            <div className="h-4 bg-gray-200 rounded w-20"></div>
          </div>
        </Card>
      ))}
    </div>
  );
}
