import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Card } from './ui/Card';
import { Modal } from './ui/Modal';
import { ToastContainer } from './ui/Toast';
import type { ToastType } from './ui/Toast';
import { SkeletonCard, SkeletonList } from './ui/Skeleton';

export function ComponentDemo() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [toasts, setToasts] = useState<Array<{ id: string; message: string; type: ToastType }>>([]);
  const addToast = (message: string, type: ToastType) => {
    const id = Date.now().toString();
    setToasts([...toasts, { id, message, type }]);
  };
  const removeToast = (id: string) => {
    setToasts(toasts.filter(t => t.id !== id));
  };
  return (
    <div className="space-y-8">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      {/* Buttons */}
      <Card title="Buttons">
        <div className="flex flex-wrap gap-4">
          <Button variant="primary" size="sm">Small Primary</Button>
          <Button variant="primary" size="md">Medium Primary</Button>
          <Button variant="primary" size="lg">Large Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="danger">Danger</Button>
        </div>
      </Card>
      {/* Inputs */}
      <Card title="Inputs">
        <div className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <Input
            label="Password"
            type="password"
            placeholder="Enter password"
            error="Password must be at least 8 characters"
          />
        </div>
      </Card>
      {/* Modal */}
      <Card title="Modal">
        <Button onClick={() => setIsModalOpen(true)}>Open Modal</Button>
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Example Modal"
        >
          <p className="text-gray-600">This is a modal dialog. Press Escape or click outside to close.</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => setIsModalOpen(false)}>
              Confirm
            </Button>
          </div>
        </Modal>
      </Card>
      {/* Toasts */}
      <Card title="Toasts">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => addToast('Success message!', 'success')}>
            Success Toast
          </Button>
          <Button onClick={() => addToast('Error occurred!', 'error')}>
            Error Toast
          </Button>
          <Button onClick={() => addToast('Info message', 'info')}>
            Info Toast
          </Button>
          <Button onClick={() => addToast('Warning!', 'warning')}>
            Warning Toast
          </Button>
        </div>
      </Card>
      {/* Skeletons */}
      <Card title="Loading Skeletons">
        <SkeletonList count={2} />
      </Card>
    </div>
  );
}