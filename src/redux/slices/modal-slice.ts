import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Modal } from "../../types/Modal";

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    visible: false,
    dismissable: true,
  } as Modal,
  reducers: {
    showModal: (state, { payload }: PayloadAction<Omit<Modal, "visible">>) => {
      return { ...state, ...payload, visible: true };
    },
    hideModal: (state) => {
      state.visible = false;
    },
  },
});

export default modalSlice;
