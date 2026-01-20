'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { setUser, setToken } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!');
    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      const mockUser = { id: '1', email, name: email.split('@')[0] };
      const mockToken = 'mock-jwt-token-' + Date.now();
      
      console.log('Setting user:', mockUser);
      
      // Set in Zustand
      setUser(mockUser);
      setToken(mockToken);
      
      // Also set in localStorage directly as backup
      localStorage.setItem('workboard-user', JSON.stringify(mockUser));
      localStorage.setItem('workboard-token', mockToken);
      
      console.log('LocalStorage set:', localStorage.getItem('workboard-user'));
      console.log('Zustand state:', useAuthStore.getState());
      
      setIsLoading(false);
      
      // Navigate
      setTimeout(() => {
        console.log('Navigating to dashboard...');
        window.location.href = '/dashboard';
      }, 100);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Login to Workboard</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />
          <Button type="submit" className="w-full" isLoading={isLoading}>
            Sign In
          </Button>
        </form>
      </Card>
    </div>
  );
}