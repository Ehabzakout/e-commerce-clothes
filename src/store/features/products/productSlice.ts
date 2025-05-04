import { products } from "@/types/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { getProducts } from "./thunk";
import { isString } from "@/types/gaurd";
const initialState: products = {
  records: [],
  loading: "idle",
  error: null,
};
const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProducts: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.records = action.payload;
      state.loading = "success";
      state.error = null;
    });
    builder.addCase(getProducts.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getProducts.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload as string;
    });
  },
});

export default productSlice.reducer;
export const productsAction = productSlice.actions;
export { getProducts };
