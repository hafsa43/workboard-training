import { useUIStore } from '../../stores/uiStore';
export function ToastContainer() {
  const { toasts, removeToast } = useUIStore();
  if (toasts.length === 0) return null;
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`
            px-4 py-3 rounded-lg shadow-lg max-w-sm
            flex items-center justify-between gap-3
            animate-slide-in
            ${
              toast.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-800'
                : toast.type === 'error'
                ? 'bg-red-50 border border-red-200 text-red-800'
                : toast.type === 'warning'
                ? 'bg-yellow-50 border border-yellow-200 text-yellow-800'
                : 'bg-blue-50 border border-blue-200 text-blue-800'
            }
          `}
        >
          <p className="text-sm font-medium">{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
}