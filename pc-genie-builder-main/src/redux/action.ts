import { setToast, ToastTypeT } from "./slice";

export const showToast = (type: ToastTypeT, message: string) => {
  return setToast({ type, message });
};
