import toast, { ToastOptions } from "react-hot-toast";
import { Toast } from "./Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

export class ErrorToast implements Toast {
  showToast(message: string, options: ToastOptions = {}) {
    toast.error(message, {
      duration: options.duration || 4000,
      className:
        "bg-white text-accent-red font-main font-semibold border-2 border-accent-red rounded-full shadow-lg p-4 flex items-center",
      icon: (
        <span className="flex h-10 w-10 items-center justify-center">
          <FontAwesomeIcon
            icon={faTimesCircle}
            className="text-xl text-red-500"
          />
        </span>
      ),
      ...options,
    });
  }
}
