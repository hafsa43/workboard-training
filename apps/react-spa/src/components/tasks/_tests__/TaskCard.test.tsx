import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { render, screen } from '@/test/utils';
import userEvent from '@testing-library/user-event';
import { TaskCard } from '../TaskCard';
import type { Task } from '@/types/task';

const mockTask: Task = {
  id: '1',
  title: 'Test Task',
  description: 'Test description',
  status: 'todo',
  priority: 'high',
  projectId: '1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

describe('TaskCard', () => {
  it('should render task information', () => {
    render(<TaskCard task={mockTask} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('should call onEdit when edit button is clicked', async () => {
    const user = userEvent.setup();
    const handleEdit = vi.fn();

    render(<TaskCard task={mockTask} onEdit={handleEdit} onDelete={vi.fn()} onStatusChange={vi.fn()} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    await user.click(editButton);

    expect(handleEdit).toHaveBeenCalledWith(mockTask);
  });

  it('should call onDelete when delete button is clicked', async () => {
    const user = userEvent.setup();
    const handleDelete = vi.fn();

    render(<TaskCard task={mockTask} onEdit={vi.fn()} onDelete={handleDelete} onStatusChange={vi.fn()} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    await user.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledWith(mockTask.id);
  });

  it('should display priority badge', () => {
    render(<TaskCard task={mockTask} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />);
    expect(screen.getByText(/high/i)).toBeInTheDocument();
  });

  it('should render card element', () => {
    const { container } = render(<TaskCard task={mockTask} onEdit={vi.fn()} onDelete={vi.fn()} onStatusChange={vi.fn()} />);
    const card = container.querySelector('.p-4');
    expect(card).toBeInTheDocument();
  });
});