import { useEffect, useState } from 'react';

type ToastType = 'success' | 'error' | 'info';

type ToastItem = {
  id: number;
  title: string;
  message: string;
  type: ToastType;
};

const typeStyles: Record<ToastType, string> = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-100',
  error: 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-800 dark:bg-rose-950/80 dark:text-rose-100',
  info: 'border-slate-200 bg-white text-slate-900 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100',
};

export const pushToast = (title: string, message: string, type: ToastType = 'info') => {
  if (typeof window === 'undefined') {
    return;
  }

  const event = new CustomEvent('app-toast', {
    detail: {
      id: Date.now() + Math.random(),
      title,
      message,
      type,
    },
  });

  window.dispatchEvent(event);
};

export const ToastViewport = () => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => {
    const handleToast = (event: Event) => {
      const customEvent = event as CustomEvent<ToastItem>;
      const toast = customEvent.detail;

      setToasts((prev) => [...prev, toast]);
      window.setTimeout(() => {
        setToasts((prev) => prev.filter((item) => item.id !== toast.id));
      }, 3200);
    };

    window.addEventListener('app-toast', handleToast);
    return () => window.removeEventListener('app-toast', handleToast);
  }, []);

  return (
    <div className="pointer-events-none fixed right-4 top-20 z-[60] flex w-full max-w-sm flex-col gap-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto rounded-2xl border px-4 py-3 shadow-lg backdrop-blur-md transition-all ${typeStyles[toast.type]}`}
        >
          <div className="text-sm font-semibold">{toast.title}</div>
          <div className="mt-1 text-sm opacity-90">{toast.message}</div>
        </div>
      ))}
    </div>
  );
};
