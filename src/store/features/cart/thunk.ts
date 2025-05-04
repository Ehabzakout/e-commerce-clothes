import { RootState } from "@/store/store";
import { product } from "@/types/interfaces";
import axiosErrorHandler from "@/util/isAxiosError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCartProducts = createAsyncThunk(
  "cart/getProducts",
  async (_, thunk) => {
    const { rejectWithValue, getState, signal } = thunk;
    const { cart, auth } = getState() as RootState;
    const products = Object.keys(cart.item)
      .map((item) => `id=${item}`)
      .join("&");
    if (!auth.user?.accessToken) return [];
    try {
      if (products) {
        const { data } = await axios.get<product[]>(
          `http://localhost:5005/products?${products}`,
          { signal },
        );

        return data;
      } else return [];
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default getCartProducts;
