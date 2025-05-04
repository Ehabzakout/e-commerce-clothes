import { RootState } from "@/store/store";
import axiosErrorHandler from "@/util/isAxiosError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (_, thunk) => {
    const { rejectWithValue, getState } = thunk;
    const { auth } = getState() as RootState;

    try {
      const { data } = await axios.get(
        `http://localhost:5005/orders?userId=${auth.user?.user.id}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default getUserOrders;
