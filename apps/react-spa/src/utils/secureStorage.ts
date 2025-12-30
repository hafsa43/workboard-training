/**
 * Secure storage utility
 * Uses sessionStorage by default (cleared on tab close)
 * More secure than localStorage for sensitive data
 */
class SecureStorage {
  private storage: Storage;
  constructor(useSession = true) {
    // sessionStorage is cleared when tab closes (more secure)
    // localStorage persists (less secure but more convenient)
    this.storage = useSession ? sessionStorage : localStorage;
  }
  /**
   * Store an item securely
   */
  setItem(key: string, value: any): void {
    try {
      const serialized = JSON.stringify(value);
      this.storage.setItem(key, serialized);
    } catch (error) {
      console.error('SecureStorage: Failed to set item', error);
      throw error;
    }
  }
  /**
   * Retrieve an item with type safety
   */
  getItem<T>(key: string): T | null {
    try {
      const item = this.storage.getItem(key);
      if (!item) return null;
      return JSON.parse(item) as T;
    } catch (error) {
      console.error('SecureStorage: Failed to get item', error);
      return null;
    }
  }
  /**
   * Remove a specific item
   */
  removeItem(key: string): void {
    try {
      this.storage.removeItem(key);
    } catch (error) {
      console.error('SecureStorage: Failed to remove item', error);
    }
  }
  /**
   * Clear all stored items
   */
  clear(): void {
    try {
      this.storage.clear();
    } catch (error) {
      console.error('SecureStorage: Failed to clear storage', error);
    }
  }
  /**
   * Check if an item exists
   */
  hasItem(key: string): boolean {
    return this.storage.getItem(key) !== null;
  }
  /**
   * Get all keys
   */
  getAllKeys(): string[] {
    const keys: string[] = [];
    for (let i = 0; i < this.storage.length; i++) {
      const key = this.storage.key(i);
      if (key) keys.push(key);
    }
    return keys;
  }
}
// Export singleton instance using sessionStorage (secure by default)
export const secureStorage = new SecureStorage(true);
// Export class for custom instances if needed
export default SecureStorage;