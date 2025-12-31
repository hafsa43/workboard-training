import { create } from 'zustand';
/**
 * UI Store
 * 
 * Purpose: Global UI state management
 * Scope: ONLY handles global UI elements (toasts, modals)
 * 
 * What belongs here:
 * - Toast notifications (triggered from anywhere)
 * - Global modal state (if used across app)
 * - Global loading overlays (if needed)
 * 
 * What does NOT belong here:
 * - Form validation errors - use React Hook Form
 * - Component-specific loading states - use local useState
 * - Page-specific UI state - use local useState
 * - Derived state - calculate from existing state
 */
// Toast types
export type ToastType = 'success' | 'error' | 'info' | 'warning';
export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}
// Modal types
export interface ModalState {
  isOpen: boolean;
  title?: string;
  content?: React.ReactNode;
}
interface UIState {
  // Toast state
  toasts: Toast[];
  
  // Modal state
  modal: ModalState;
  // Toast actions
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
  // Modal actions
  openModal: (title: string, content?: React.ReactNode) => void;
  closeModal: () => void;
}
export const useUIStore = create<UIState>((set) => ({
  // Initial state
  toasts: [],
  modal: {
    isOpen: false,
  },
  // Add toast with auto-dismiss
  addToast: (toast) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 3000,
    };
    set((state) => ({
      toasts: [...state.toasts, newToast],
    }));
    // Auto-remove after duration
    if (newToast.duration) {
      setTimeout(() => {
        set((state) => ({
          toasts: state.toasts.filter((t) => t.id !== id),
        }));
      }, newToast.duration);
    }
  },
  // Remove toast manually
  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
  // Clear all toasts
  clearToasts: () => {
    set({ toasts: [] });
  },
  // Open modal
  openModal: (title, content) => {
    set({
      modal: {
        isOpen: true,
        title,
        content,
      },
    });
  },
  // Close modal
  closeModal: () => {
    set({
      modal: {
        isOpen: false,
        title: undefined,
        content: undefined,
      },
    });
  },
}));