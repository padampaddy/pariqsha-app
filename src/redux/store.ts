import { configureStore } from "@reduxjs/toolkit";
import modalSlice from "./slices/modal-slice";
import userSlice from "./slices/user-slice";

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
