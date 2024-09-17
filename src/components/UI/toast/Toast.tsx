import { ToastOptions } from "react-hot-toast";

export interface Toast {
  showToast: (message: string, options?: ToastOptions) => void;
}
