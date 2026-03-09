import useToastStore from '../../../stores/toastStore';
import Toast from './Toast';

const ToastContainer = () => {
  const { toasts, removeToast } = useToastStore();

  // Don't render anything if there are no toasts
  if (toasts.length === 0) return null;

  return (
    // Fixed position in the top-right corner, above everything else (z-50)
    // The flex column with gap stacks multiple toasts vertically
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
