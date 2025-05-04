import { category } from "@/types/interfaces";
import axiosErrorHandler from "@/util/isAxiosError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const getCategories = createAsyncThunk(
  "category/getCategories",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const { data } = await axios.get<category[]>(
        "http://localhost:5005/categories",
      );
      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default getCategories;
