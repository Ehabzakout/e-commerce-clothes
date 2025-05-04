import { IWishlist } from "@/types/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { toggleToWishlistData } from "./thnk";
import { getWishlistProducts } from "./thnk";
import { isString } from "@/types/gaurd";
import { logOut } from "../auth/authSlice";
const initialState: IWishlist = {
  items: [],
  wishlistItems: [],
  loading: "idle",
  error: null,
};
const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistItems: (state) => {
      state.wishlistItems = [];
      state.loading = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(toggleToWishlistData.fulfilled, (state, action) => {
      if (action.payload?.type === "add") {
        state.items.push(action.payload?.id);
      }
      if (action.payload?.type === "remove") {
        state.items = state.items.filter((el) => el !== action.payload?.id);
        state.wishlistItems = state.wishlistItems.filter(
          (item) => item.id !== action.payload?.id,
        );
      }
      state.loading = "success";
    });
    builder.addCase(toggleToWishlistData.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(toggleToWishlistData.rejected, (state, action) => {
      state.loading = "failed";
      if (action.payload && typeof action.payload === "string")
        state.error = action.payload as string;
    });
    // Git wishlist products
    builder.addCase(getWishlistProducts.fulfilled, (state, action) => {
      if (action.payload?.type === "productIDs")
        state.items = action.payload.data;
      if (action.payload?.type === "products") {
        state.wishlistItems = action.payload.data;
        state.loading = "success";
        state.error = null;
      }
    });
    builder.addCase(getWishlistProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getWishlistProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload;
    });
    // Clear wishlist items when logOut
    builder.addCase(logOut, (state) => {
      state.items = [];
      state.wishlistItems = [];
    });
  },
});

export default wishListSlice.reducer;
export const { clearWishlistItems } = wishListSlice.actions;
export { toggleToWishlistData, getWishlistProducts };
