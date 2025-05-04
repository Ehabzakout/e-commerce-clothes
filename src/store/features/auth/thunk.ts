import axiosErrorHandler from "@/util/isAxiosError";
import { TRegisterForm } from "@/validations/registerForm";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export type TUser = Omit<TRegisterForm, "confirm_password">;

const addNewUser = createAsyncThunk(
  "auth/addNewUser",
  async (userData: TUser, thunk) => {
    const { rejectWithValue } = thunk;
    try {
      const { data } = await axios.post(
        "http://localhost:5005/register",
        userData,
      );
      return data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default addNewUser;
