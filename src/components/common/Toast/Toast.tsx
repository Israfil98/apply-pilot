import { CheckCircle, X, XCircle } from 'lucide-react';

interface IToastProps {
  message: string;
  type: 'success' | 'error';
  onDismiss: () => void;
}

const TOAST_STYLES = {
  success: {
    container: 'border-green-200 bg-green-50',
    icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    text: 'text-green-800',
  },
  error: {
    container: 'border-red-200 bg-red-50',
    icon: <XCircle className="h-5 w-5 text-red-600" />,
    text: 'text-red-800',
  },
};

const Toast = ({ message, type, onDismiss }: IToastProps) => {
  const styles = TOAST_STYLES[type];

  return (
    <div
      role="alert"
      className={`flex items-center gap-3 rounded-lg border px-4 py-3 shadow-lg ${styles.container}`}
    >
      {styles.icon}
      <p className={`text-sm font-medium ${styles.text}`}>{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        className="ml-auto text-gray-400 transition-colors hover:text-gray-600"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

export default Toast;
