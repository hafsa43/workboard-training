import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useUIStore } from '../stores/uiStore';
import { Button } from './ui/Button';
interface LayoutProps {
  children: ReactNode;
}
export function Layout({ children }: LayoutProps) {
  const navigate = useNavigate();
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
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">WorkBoard</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              Welcome, {user?.name || 'User'}
            </span>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-[calc(100vh-73px)]">
          <nav className="p-4 space-y-2">
            <Link
              to="/dashboard"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Dashboard
            </Link>
            <Link
              to="/projects"
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Projects
            </Link>
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}