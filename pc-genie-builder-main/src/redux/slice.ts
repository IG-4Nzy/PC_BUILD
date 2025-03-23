import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export type ToastTypeT = "success" | "error" | "info" | "warning";
interface ToastState {
  type: ToastTypeT;
  message: string;
  open: boolean;
}

const initialState = {
  toast: {} as ToastState
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
    resetToast: (state) => {
      state.toast = {} as ToastState;
    }
  }
});

export const layoutReducer = layoutSlice.reducer;
export const { setToast, resetToast } = layoutSlice.actions;
