import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ToastTypeT = "success" | "error" | "info" | "warning";
interface ToastState {
  type: ToastTypeT;
  message: string;
  open: boolean;
}

const initialState = {
  toast: {} as ToastState,
  componentTypes: {} as any,
  components: {} as any
};

const layoutSlice = createSlice({
  name: "layout",
  initialState: initialState,
  reducers: {
    setToast: (
      state,
      action: PayloadAction<{ type: ToastTypeT; message: string }>
    ) => {
      state.toast = {
        type: action.payload.type,
        message: action.payload.message,
        open: true
      };
    },
    setComponentTypes: (
      state,
      action: PayloadAction<{ type: ToastTypeT; message: string }>
    ) => {
      state.componentTypes = action.payload;
    },
    setComponents: (
      state,
      action: PayloadAction<{ type: ToastTypeT; message: string }>
    ) => {
      state.components = action.payload;
    },

    resetToast: (state) => {
      state.toast = {} as ToastState;
    }
  }
});

export const layoutReducer = layoutSlice.reducer;
export const { setToast, resetToast, setComponentTypes, setComponents } =
  layoutSlice.actions;
