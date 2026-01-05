export interface ProjectFilters {
  search?: string;
  status?: 'active' | 'archived' | 'all';
}

export interface TaskFilters {
  search?: string;
  priority?: 'low' | 'medium' | 'high' | 'all';
  status?: 'todo' | 'doing' | 'done' | 'all';
  assignee?: string;
}

export interface PaginationParams {
  page: number;
  pageSize: number;
}