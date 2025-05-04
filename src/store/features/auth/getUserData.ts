import axiosErrorHandler from "@/util/isAxiosError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { TbasicSchema } from "@/validations/loginForm";

type TUserData = {
  accessToken: string;
  user: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };
};
const getUserData = createAsyncThunk(
  "auth/getUserData",
  async (data: TbasicSchema, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const res = await axios.post<TUserData>(
        "http://localhost:5005/login",
        data,
      );
      return res.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default getUserData;
