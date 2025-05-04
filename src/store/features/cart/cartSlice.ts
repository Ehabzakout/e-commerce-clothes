import { RootState } from "@/store/store";
import { ICart } from "@/types/interfaces";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import getCartProducts from "./thunk";
import { isString } from "@/types/gaurd";

const initialState: ICart = {
  item: {},
  cartProducts: [],
  loading: "idle",
  error: null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (state.item[action.payload]) ++state.item[action.payload];
      else state.item[action.payload] = 1;
    },
    removeFromCart: (state, action) => {
      if (state.item[action.payload]) --state.item[action.payload];
    },
    clearFromCart: (state, action) => {
      delete state.item[action.payload];
      state.cartProducts = state.cartProducts.filter(
        (el) => el.id !== action.payload,
      );
    },
    cleanUpCart: (state) => {
      state.item = {};
      state.cartProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCartProducts.fulfilled, (state, action) => {
      state.cartProducts = action.payload;
      state.loading = "success";
      state.error = null;
    });
    builder.addCase(getCartProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getCartProducts.rejected, (state, action) => {
      if (isString(action.payload)) state.error = action.payload as string;
      state.loading = "failed";
    });
  },
});

const getCartItems = createSelector(
  (store: RootState) => store.cart.item,
  (items) => {
    const totaleItems = Object.values(items).reduce((acc, cur) => acc + cur, 0);
    return totaleItems;
  },
);

export { getCartItems, getCartProducts };
export default cartSlice.reducer;
export const { addToCart, removeFromCart, clearFromCart, cleanUpCart } =
  cartSlice.actions;
