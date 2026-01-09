import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { ProjectFilters } from '../ProjectFilters';

describe('ProjectFilters', () => {
  const mockOnFiltersChange = vi.fn();
  const mockFilters = { search: '', status: 'all' as const, priority: 'all' as const };

  it('should render all filter inputs', () => {
    render(<ProjectFilters filters={mockFilters} onFiltersChange={mockOnFiltersChange} onClear={vi.fn()} />);

    expect(screen.getByPlaceholderText(/search/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/status/i)).toBeInTheDocument();
  });

  it('should call onFiltersChange when search input changes', async () => {
    const user = userEvent.setup();
    render(<ProjectFilters filters={mockFilters} onFiltersChange={mockOnFiltersChange} onClear={vi.fn()} />);

    const searchInput = screen.getByPlaceholderText(/search/i);
    await user.type(searchInput, 'test');

    expect(mockOnFiltersChange).toHaveBeenCalled();
  });

  it('should call onFiltersChange when status filter changes', async () => {
    const user = userEvent.setup();
    render(<ProjectFilters filters={mockFilters} onFiltersChange={mockOnFiltersChange} onClear={vi.fn()} />);

    const statusSelect = screen.getByLabelText(/status/i);
    await user.selectOptions(statusSelect, 'active');

    expect(mockOnFiltersChange).toHaveBeenCalled();
  });

  it('should reset filters when clear button is clicked', async () => {
    const user = userEvent.setup();
    const mockOnClear = vi.fn();
    render(<ProjectFilters filters={mockFilters} onFiltersChange={mockOnFiltersChange} onClear={mockOnClear} />);

    const clearButton = screen.getByRole('button', { name: /clear/i });
    await user.click(clearButton);

    expect(mockOnClear).toHaveBeenCalled();
  });
});