import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useUIStore } from '../uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    useUIStore.setState({
      toasts: [],
    });
    vi.clearAllTimers();
  });

  it('should add toast', () => {
    useUIStore.getState().addToast({
      message: 'Test message',
      type: 'success',
    });

    const { toasts } = useUIStore.getState();
    expect(toasts).toHaveLength(1);
    expect(toasts[0].message).toBe('Test message');
    expect(toasts[0].type).toBe('success');
  });

  it('should remove toast', () => {
    useUIStore.getState().addToast({
      message: 'Test message',
      type: 'info',
    });

    const { toasts } = useUIStore.getState();
    const toastId = toasts[0].id;

    useUIStore.getState().removeToast(toastId);

    expect(useUIStore.getState().toasts).toHaveLength(0);
  });

  it('should generate unique IDs for toasts', () => {
    useUIStore.getState().addToast({ message: 'First', type: 'success' });
    useUIStore.getState().addToast({ message: 'Second', type: 'error' });

    const { toasts } = useUIStore.getState();
    expect(toasts[0].id).not.toBe(toasts[1].id);
  });
});