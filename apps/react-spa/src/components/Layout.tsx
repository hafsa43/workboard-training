import type { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';
import { Button } from './ui/Button';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const addToast = useUIStore((state) => state.addToast);

  const handleLogout = () => {
    logout();
    addToast({
      type: 'info',
      message: 'You have been logged out.',
    });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to main content link for keyboard users */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-md"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="bg-white shadow-sm" role="banner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            <Link to="/dashboard" className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md">
              WorkBoard
            </Link>
          </h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600" aria-label="Current user">
              Welcome, {user?.name || 'User'}
            </span>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={handleLogout}
              aria-label="Sign out of your account"
            >
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside 
          className="w-64 bg-white shadow-sm min-h-[calc(100vh-73px)]" 
          role="navigation"
          aria-label="Main navigation"
        >
          <nav className="p-4 space-y-2">
            <Link
              to="/dashboard"
              className={`block px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                location.pathname === '/dashboard'
                  ? 'bg-blue-100 text-blue-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-current={location.pathname === '/dashboard' ? 'page' : undefined}
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className={`block px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                location.pathname.startsWith('/projects')
                  ? 'bg-blue-100 text-blue-900 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              aria-current={location.pathname.startsWith('/projects') ? 'page' : undefined}
            >
              Projects
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main 
          id="main-content"
          className="flex-1 p-8" 
          role="main"
          tabIndex={-1}
        >
          {children}
        </main>
      </div>
    </div>
  );
}