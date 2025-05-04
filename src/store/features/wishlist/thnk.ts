import { RootState } from "@/store/store";
import { IWishlistItem } from "@/types/interfaces";
import axiosErrorHandler from "@/util/isAxiosError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const toggleToWishlistData = createAsyncThunk(
  "wislist/toggleData",
  async (id: number, thunk) => {
    const { rejectWithValue, getState } = thunk;
    const { auth } = getState() as RootState;
    const { data } = await axios.get<IWishlistItem[]>(
      `http://localhost:5005/wishlist?userID=${auth.user?.user.id}&itemId=${id}`,
    );

    try {
      if (data.length === 0) {
        await axios.post(`http://localhost:5005/wishlist/`, {
          userID: auth.user?.user.id,
          itemId: id,
        });
        return { type: "add", id };
      } else {
        await axios.delete(`http://localhost:5005/wishlist/${data[0].id}`);
        return { type: "remove", id };
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data.message || error.message);
      } else return rejectWithValue("Un expected Error");
    }
  },
);
const getWishlistProducts = createAsyncThunk(
  "wishlist/getWishlistProducts",
  async (dataType: string, thunk) => {
    const { rejectWithValue, signal, getState } = thunk;
    const { auth } = getState() as RootState;
    if (!auth.user?.accessToken) return { data: [], type: "productIDS" };
    try {
      const { data } = await axios.get<IWishlistItem[]>(
        `http://localhost:5005/wishlist?userID=${auth.user?.user.id}`,
      );
      if (data.length === 0) return { data: [], type: "products" };
      else {
        if (dataType === "productIDs") {
          const productIds = data.map((item) => item.itemId);
          return { data: productIds, type: "productIDs" };
        } else if (dataType === "products") {
          const productIds = data.map((item) => `id=${item.itemId}`).join("&");
          const products = await axios.get(
            `http://localhost:5005/products?${productIds}`,
            { signal },
          );

          return { data: products.data, type: "products" };
        }
      }
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);
export { toggleToWishlistData, getWishlistProducts };
