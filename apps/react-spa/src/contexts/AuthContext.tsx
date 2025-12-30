import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { secureStorage } from '../utils/secureStorage';
// Types
interface User {
  id: string;
  email: string;
  name: string;
}
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}
// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);
// Storage keys
const STORAGE_KEYS = {
  USER: 'auth_user',
  TOKEN: 'auth_token', // For future use when you integrate real API
} as const;
// Provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      try {
        // Use secureStorage instead of direct sessionStorage
        const storedUser = secureStorage.getItem<User>(STORAGE_KEYS.USER);
        
        if (storedUser) {
          setUser(storedUser);
        }
      } catch (error) {
        console.error('Failed to restore auth state:', error);
        // Clear corrupted data
        secureStorage.removeItem(STORAGE_KEYS.USER);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);
  const login = async (email: string, password: string) => {
    try {
      // TODO: Replace with real API call
      // For now, simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      // Validate credentials (mock validation)
      if (!email || !password) {
        throw new Error('Email and password are required');
      }
      // Mock user data
      const userData: User = {
        id: '1',
        email: email,
        name: email.split('@')[0],
      };
      // Store user data using secureStorage
      secureStorage.setItem(STORAGE_KEYS.USER, userData);
      
      // In real implementation, you'd also store the token:
      // secureStorage.setItem(STORAGE_KEYS.TOKEN, response.token);
      
      setUser(userData);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };
  const logout = () => {
    // Clear all auth data from secureStorage
    secureStorage.removeItem(STORAGE_KEYS.USER);
    secureStorage.removeItem(STORAGE_KEYS.TOKEN);
    
    setUser(null);
  };
  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}