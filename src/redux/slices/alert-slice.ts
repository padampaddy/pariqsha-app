import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Alert } from "../../types/Alert";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    visible: false,
  } as Alert,
  reducers: {
    showAlert: (state, { payload }: PayloadAction<Omit<Alert, "visible">>) => {
      return { ...state, ...payload, visible: true };
    },
    hideAlert: (state) => {
      state.visible = false;
    },
  },
});

export default alertSlice;
