import { configureStore } from "@reduxjs/toolkit";
import { CartItem } from "../types/Cart";
import alertSlice from "./slices/alert-slice";
import cartSlice from "./slices/cart-slice";
import modalSlice from "./slices/modal-slice";
import userSlice from "./slices/user-slice";

function getPersistedState() {
  const pStateString = localStorage.getItem("reduxState");
  if (pStateString) {
    const state = JSON.parse(pStateString);
    state.cart.items = state.cart.items.map(
      (item: {
        mId: any;
        mDescription: any;
        mImages: any[];
        mName: any;
        mPriceCoins: any;
      }) =>
        new CartItem({
          id: item.mId,
          description: item.mDescription,
          images: item.mImages.join(","),
          name: item.mName,
          price_coins: item.mPriceCoins,
        })
    );
    console.log(state);
    return state;
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
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
