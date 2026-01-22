const ENCRYPTION_KEY = 'workboard-secret-key';

export const secureStorage = {
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined') return;
    const encrypted = btoa(value + ENCRYPTION_KEY);
    localStorage.setItem(key, encrypted);
  },

  getItem: (key: string): string | null => {
    if (typeof window === 'undefined') return null;
    const encrypted = localStorage.getItem(key);
    if (!encrypted) return null;
    try {
      return atob(encrypted).replace(ENCRYPTION_KEY, '');
    } catch {
      return null;
    }
  },

  removeItem: (key: string): void => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  },
};
