import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ProjectFormModal } from '../components/projects/ProjectFormModal';
import { ProjectFilters } from '../components/projects/ProjectFilters';
import { Pagination } from '../components/ui/Pagination';
import { useProjects, useCreateProject } from '../hooks/useProjects';
import { useQueryParams } from '../hooks/useQueryParams';
import { useDebounce } from '../hooks/useDebounce';
import type { ProjectCreateFormData } from '../schemas/project.schema';
import type { ProjectFilters as IProjectFilters } from '../utils/filterTypes';

export function ProjectsPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { params, setParams, clearParams } = useQueryParams<{
    search: string;
    status: string;
    page: string;
  }>();

  // Local state for immediate UI updates
  const [localFilters, setLocalFilters] = useState<IProjectFilters>({
    search: params.search || '',
    status: (params.status as IProjectFilters['status']) || 'all',
  });

  // Debounce search to avoid spamming the network
  const debouncedSearch = useDebounce(localFilters.search, 500);

  // Actual filters used for API call
  const filters = useMemo<IProjectFilters>(() => ({
    search: debouncedSearch,
    status: localFilters.status,
  }), [debouncedSearch, localFilters.status]);

  const currentPage = parseInt(params.page || '1', 10);
  const pageSize = 9; // 3x3 grid

  const { data, isLoading, isError, error } = useProjects(filters, {
    page: currentPage,
    pageSize,
  });

  const createProject = useCreateProject();

  const handleCreateProject = async (formData: ProjectCreateFormData) => {
    await createProject.mutateAsync({
      name: formData.name,
      description: formData.description || undefined,
    });
    setIsModalOpen(false);
  };

  const handleProjectClick = (projectId: string) => {
    navigate(`/projects/${projectId}`);
  };

  const handleFiltersChange = (newFilters: IProjectFilters) => {
    setLocalFilters(newFilters);
    // Update URL immediately for non-search fields
    if (newFilters.status !== localFilters.status) {
      setParams({ 
        status: newFilters.status === 'all' ? undefined : newFilters.status,
        page: '1', // Reset to page 1 on filter change
      });
    }
  };

  // Sync debounced search to URL
  useMemo(() => {
    if (debouncedSearch !== params.search) {
      setParams({
        search: debouncedSearch || undefined,
        page: '1', // Reset to page 1 on search
      }, true);
    }
  }, [debouncedSearch]);

  const handleClearFilters = () => {
    setLocalFilters({ search: '', status: 'all' });
    clearParams();
  };

  const handlePageChange = (page: number) => {
    setParams({ page: String(page) });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <Button onClick={() => setIsModalOpen(true)}>New Project</Button>
        </div>
        <ProjectFilters
          filters={localFilters}
          onFiltersChange={handleFiltersChange}
          onClear={handleClearFilters}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <Button onClick={() => setIsModalOpen(true)}>New Project</Button>
        </div>
        <Card>
          <div className="text-center py-12">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Failed to Load Projects
            </h3>
            <p className="text-gray-600 mb-4">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
            <Button onClick={() => window.location.reload()}>Try Again</Button>
          </div>
        </Card>
      </div>
    );
  }

  const projects = data?.projects || [];
  const total = data?.total || 0;
  const totalPages = data?.totalPages || 1;

  return (
    <>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <Button onClick={() => setIsModalOpen(true)}>New Project</Button>
        </div>

        <ProjectFilters
          filters={localFilters}
          onFiltersChange={handleFiltersChange}
          onClear={handleClearFilters}
        />

        {projects.length === 0 ? (
          <Card>
            <div className="text-center py-12">
              <div className="text-gray-400 text-5xl mb-4">📋</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No Projects Found
              </h3>
              <p className="text-gray-600 mb-4">
                {localFilters.search || localFilters.status !== 'all'
                  ? 'Try adjusting your filters'
                  : 'Get started by creating your first project'}
              </p>
              {!localFilters.search && localFilters.status === 'all' && (
                <Button onClick={() => setIsModalOpen(true)}>
                  Create First Project
                </Button>
              )}
            </div>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleProjectClick(project.id)}
                >
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {project.description || 'No description'}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span
                      className={`px-2 py-1 rounded-full ${
                        project.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {project.status}
                    </span>
                    <span className="text-gray-500">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              total={total}
              pageSize={pageSize}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>

      <ProjectFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateProject}
      />
    </>
  );
}