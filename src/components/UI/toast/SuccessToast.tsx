import toast, { ToastOptions } from "react-hot-toast";
import { Toast } from "./Toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export class SuccessToast implements Toast {
  showToast(message: string, options: ToastOptions = {}) {
    toast.success(message, {
      duration: options.duration || 4000,
      className:
        "bg-white text-primary-green font-main font-semibold border-2 border-primary-green rounded-full shadow-lg p-4 flex items-center",
      icon: (
        <span className="flex h-8 w-8 items-center justify-center">
          <FontAwesomeIcon
            icon={faCheckCircle}
            className="text-lg text-green-500"
          />
        </span>
      ),
      ...options,
    });
  }
}
