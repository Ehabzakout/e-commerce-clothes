import { createSlice } from "@reduxjs/toolkit";
import { TOrders } from "./../../../types/interfaces";
import placeOrder from "./placeOrder";
import { isString } from "@/types/gaurd";
import getUserOrders from "./getOrders";
const initialState: TOrders = {
  orders: [],
  loading: "idle",
  error: null,
};
const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    clearOrders: (state) => {
      state.orders = [];
      state.loading = "idle";
    },
  },
  extraReducers:
    // place Order
    (builder) => {
      builder.addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = "success";
        state.orders = action.payload;
        state.error = null;
      });
      builder.addCase(placeOrder.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      });
      builder.addCase(placeOrder.rejected, (state, action) => {
        if (isString(action.payload)) state.error = action.payload as string;
      });
      //get user orders
      builder.addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;

        state.error = null;
        state.loading = "success";
      });
      builder.addCase(getUserOrders.pending, (state) => {
        state.error = null;
        state.loading = "pending";
      });
      builder.addCase(getUserOrders.rejected, (state, action) => {
        if (isString(action.payload)) state.error = action.payload as string;
        state.loading = "failed";
      });
    },
});

export default ordersSlice.reducer;
export const { clearOrders } = ordersSlice.actions;
export { placeOrder, getUserOrders };
