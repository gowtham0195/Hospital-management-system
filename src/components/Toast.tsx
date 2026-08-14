import React, { useEffect } from 'react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
};

const ToastItem: React.FC<{ toast: ToastMessage; onDismiss: (id: string) => void }> = ({ toast, onDismiss }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(toast.id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onDismiss]);

  const bgColors = {
    success: 'bg-[#006229] text-white',
    error: 'bg-[#ba1a1a] text-white',
    info: 'bg-[#2563eb] text-white',
  };

  const icons = {
    success: 'check_circle',
    error: 'error',
    info: 'info',
  };

  return (
    <div
      className={`pointer-events-auto p-4 rounded-xl shadow-xl flex items-start gap-3 transition-all duration-300 animate-in slide-in-from-bottom-5 ${
        bgColors[toast.type]
      }`}
    >
      <span className="material-symbols-outlined text-[24px] shrink-0 mt-0.5">
        {icons[toast.type]}
      </span>
      <div className="flex-1">
        <h5 className="font-semibold text-[14px] leading-snug">{toast.title}</h5>
        {toast.message && <p className="text-[12px] opacity-90 mt-0.5 leading-normal">{toast.message}</p>}
      </div>
      <button
        onClick={() => onDismiss(toast.id)}
        className="opacity-70 hover:opacity-100 transition-opacity"
      >
        <span className="material-symbols-outlined text-[18px]">close</span>
      </button>
    </div>
  );
};
