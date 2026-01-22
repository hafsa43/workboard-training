import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    // Reset store before each test
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  });

  it('should initialize with null user', () => {
    const { user, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(isAuthenticated).toBe(false);
  });

  it('should login user', async () => {
    await useAuthStore.getState().login('test@example.com', 'password');

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeTruthy();
    expect(user?.email).toBe('test@example.com');
    expect(token).toBeTruthy();
    expect(isAuthenticated).toBe(true);
  });

  it('should logout user', async () => {
    await useAuthStore.getState().login('test@example.com', 'password');
    
    useAuthStore.getState().logout();

    const { user, token, isAuthenticated } = useAuthStore.getState();
    expect(user).toBeNull();
    expect(token).toBeNull();
    expect(isAuthenticated).toBe(false);
  });
});