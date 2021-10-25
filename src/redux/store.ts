import { configureStore } from "@reduxjs/toolkit";
import { CartItem } from "../types/Cart";
import alertSlice from "./slices/alert-slice";
import cartSlice from "./slices/cart-slice";
import modalSlice from "./slices/modal-slice";
import userSlice from "./slices/user-slice";

function getPersistedState() {
  const pStateString = localStorage.getItem("cartItems");
  if (pStateString) {
    const cartItems = JSON.parse(pStateString);
    cartItems.items = cartItems?.items?.map(
      (item: {
        mId: string;
        mDescription: string;
        mImages: string[];
        mName: string;
        mPriceCoins: number;
      }) =>
        new CartItem({
          id: item.mId,
          description: item.mDescription,
          images: item.mImages.join(","),
          name: item.mName,
          price_coins: item.mPriceCoins,
        })
    ) ?? [];
    return {
      cart: cartItems
    };
  } else {
    return {};
  }
}

const store = configureStore({
  preloadedState: getPersistedState(),
  reducer: {
    user: userSlice.reducer,
    modal: modalSlice.reducer,
    cart: cartSlice.reducer,
    alert: alertSlice.reducer,
  },
});

store.subscribe(() => {
  localStorage.setItem("cartItems", JSON.stringify(store.getState().cart));
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
