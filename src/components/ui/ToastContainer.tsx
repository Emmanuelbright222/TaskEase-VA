import { useEffect, useState } from 'react';

export type Toast = {
  id: string;
  message: string;
  type: 'success' | 'error';
};

export const createToast = (() => {
  let pushToast: ((toast: Toast) => void) | null = null;
  const queue: Toast[] = [];

  const emitter = (toast: Toast) => {
    if (pushToast) {
      pushToast(toast);
    } else {
      queue.push(toast);
    }
  };

  const register = (fn: (toast: Toast) => void) => {
    pushToast = fn;
    while (queue.length) {
      const item = queue.shift();
      if (item) {
        pushToast(item);
      }
    }
  };

  return { emit: emitter, register };
})();

const ToastContainer = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    createToast.register((toast) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 4000);
    });
  }, []);

  return (
    <div className="pointer-events-none fixed inset-x-4 bottom-6 z-50 space-y-3 md:inset-x-auto md:right-6 md:max-w-sm">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`glass-panel pointer-events-auto flex items-center justify-between border ${
            toast.type === 'success' ? 'border-emerald-400/40' : 'border-rose-400/40'
          }`}
        >
          <p className="text-sm font-medium text-white">{toast.message}</p>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
