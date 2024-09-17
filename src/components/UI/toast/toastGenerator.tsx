import { ToastOptions } from "react-hot-toast";
import { Toast } from "./Toast";
import { SuccessToast } from "./SuccessToast";
import { ErrorToast } from "./ErrorToast";

export type ToastType = "success" | "error";

const getToastStrategy = (type: ToastType): Toast => {
  switch (type) {
    case "success":
      return new SuccessToast();
    case "error":
      return new ErrorToast();
    default:
      const _exhaustive: never = type;
      return _exhaustive;
  }
};

const toastGenerator = (
  message: string,
  type: ToastType = "success",
  options: ToastOptions = {},
) => {
  const toastStrategy = getToastStrategy(type);
  toastStrategy.showToast(message, options);
};

export default toastGenerator;
