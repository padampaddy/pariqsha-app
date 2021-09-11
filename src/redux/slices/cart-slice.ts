import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../types/Cart";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  } as { items: CartItem[] },
  reducers: {
    addItem: (state, { payload }: PayloadAction<CartItem>) => ({
      items: [...state.items, payload],
    }),
    removeItem: (state, { payload }: PayloadAction<number>) => ({
      items: [
        ...state.items.slice(0, payload),
        ...state.items.slice(payload + 1),
      ],
    }),
  },
});

export default cartSlice;
