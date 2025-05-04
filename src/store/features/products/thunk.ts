import { product } from "@/types/interfaces";
import axiosErrorHandler from "@/util/isAxiosError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getProducts = createAsyncThunk(
  "products/getProducts",
  async (prefix: string, thunkAPI) => {
    const { rejectWithValue, signal } = thunkAPI;
    try {
      const { data } = await axios.get<product[]>(
        `http://localhost:5005/products?cat_prefix=${prefix}`,
        { signal },
      );
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export { getProducts };
