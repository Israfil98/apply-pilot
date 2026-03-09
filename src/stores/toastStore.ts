import { create } from 'zustand';

type TToastType = 'success' | 'error';

interface IToast {
  id: string;
  message: string;
  type: TToastType;
}

interface IToastStore {
  toasts: IToast[];
  addToast: (message: string, type: TToastType) => void;
  removeToast: (id: string) => void;
}

const useToastStore = create<IToastStore>((set) => ({
  toasts: [],

  addToast: (message, type) => {
    // Generate a unique ID using timestamp + random number
    // This ensures each toast can be individually removed even if messages are identical
    const id = `${Date.now()}-${Math.random()}`;

    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));

    // Auto-dismiss after 4 seconds
    // setTimeout runs outside React's render cycle, so we just call removeToast
    // which triggers a Zustand state update, causing a re-render
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }));
    }, 4000);
  },

  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((toast) => toast.id !== id),
    })),
}));

export default useToastStore;
