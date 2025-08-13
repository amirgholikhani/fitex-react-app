import type { ReactNode } from "react";

type ToastProps = {
  visible: boolean;
  status?: 'success' | 'error' | 'info';
  children: ReactNode;
};

const statusStyles = {
  success: 'bg-green-500 text-white',
  error: 'bg-red-500 text-white',
  info: 'bg-blue-500 text-white',
};

export function Toast({ visible, status = 'info', children }: ToastProps) {
  if (!visible) return null;

  return (
    <div
      className={`fixed top-4 right-4 px-4 py-2 rounded shadow-lg transition-opacity duration-300 ${
        statusStyles[status]
      }`}
    >
      {children}
    </div>
  );
}
