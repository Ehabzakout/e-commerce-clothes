import { createSlice } from "@reduxjs/toolkit";
import getCategories from "./thunk";
import { categories } from "@/types/interfaces";
import { isString } from "@/types/gaurd";

const initialState: categories = {
  records: [],
  loading: "idle",
  error: null,
};
const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategories: (state) => {
      state.records = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.loading = "success";
      state.error = null;
      state.records = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.loading = "failed";
      if (isString(action.payload)) state.error = action.payload as string;
    });
  },
});

export default categorySlice.reducer;
export const { clearCategories } = categorySlice.actions;
export { getCategories };
