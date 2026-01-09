import { describe, it, expect, beforeEach } from 'vitest';
import { secureStorage } from '../secureStorage';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('secureStorage', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should set and get item', () => {
    secureStorage.setItem('test-key', 'test-value');
    const value = secureStorage.getItem('test-key');
    expect(value).toBe('test-value');
  });

  it('should return null for non-existent key', () => {
    const value = secureStorage.getItem('non-existent');
    expect(value).toBeNull();
  });

  it('should remove item', () => {
    secureStorage.setItem('test-key', 'test-value');
    secureStorage.removeItem('test-key');
    const value = secureStorage.getItem('test-key');
    expect(value).toBeNull();
  });

  it('should clear all items', () => {
    secureStorage.setItem('key1', 'value1');
    secureStorage.setItem('key2', 'value2');
    secureStorage.clear();
    
    expect(secureStorage.getItem('key1')).toBeNull();
    expect(secureStorage.getItem('key2')).toBeNull();
  });

  it('should handle JSON objects', () => {
    const obj = { name: 'Test', count: 42 };
    secureStorage.setItem('object', JSON.stringify(obj));
    const retrieved = JSON.parse(secureStorage.getItem('object') || '');
    expect(retrieved).toEqual(obj);
  });
});