import { create } from 'zustand';
/**
 * Auth Store
 * 
 * Purpose: Centralized authentication state management
 * Scope: ONLY handles user authentication (user, token, login/logout)
 * 
 * What belongs here:
 * - Current user object
 * - JWT token (in-memory only)
 * - Authentication status
 * - Login/logout actions
 * 
 * What does NOT belong here:
 * - User preferences (theme, language) - use separate settingsStore if needed
 * - User profile data (bio, avatar) - use local state or server state
 * - User's projects or business data - use local state
 * - Form state - use React Hook Form
 */
// Types
interface User {
  id: string;
  email: string;
  name: string;
}
interface AuthState {
  // State
  user: User | null;
  token: string | null; // In-memory only, not persisted for security
  isAuthenticated: boolean;
  isLoading: boolean;
  // Actions
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  initialize: () => void;
}
export const useAuthStore = create<AuthState>((set, get) => ({
  // Initial state
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
  // Initialize auth from storage on app mount
  initialize: () => {
    try {
      const storedUser = sessionStorage.getItem('auth_user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        set({ user, isAuthenticated: true, isLoading: false });
      } else {
        set({ isLoading: false });
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      set({ isLoading: false });
    }
  },
  // Login action
  login: async (email: string, password: string) => {
    try {
      // TODO: Replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 500));
      // Validate credentials (mock)
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      // Mock user data
      const user: User = {
        id: '1',
        email: email,
        name: email.split('@')[0],
      };
      // Mock token (in production, this comes from API)
      const token = 'mock-jwt-token-' + Date.now();
      // Store user in sessionStorage (cleared on tab close)
      sessionStorage.setItem('auth_user', JSON.stringify(user));
      // Update state
      set({
        user,
        token,
        isAuthenticated: true,
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  },
  // Logout action
  logout: () => {
    // Clear storage
    sessionStorage.removeItem('auth_user');
    sessionStorage.removeItem('auth_token');
    // Clear state
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },
  // Setter for user
  setUser: (user) => {
    set({ user, isAuthenticated: !!user });
  },
  // Setter for token
  setToken: (token) => {
    set({ token });
  },
  // Setter for loading
  setLoading: (loading) => {
    set({ isLoading: loading });
  },
}));