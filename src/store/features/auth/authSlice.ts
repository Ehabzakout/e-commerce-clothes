import { createSlice } from "@reduxjs/toolkit";
import addNewUser from "./thunk";
import getUserData from "./getUserData";

type TauthSlice = {
  user: {
    accessToken: string;
    user: {
      id: string;
      first_name: string;
      last_name: string;
      email: string;
      password: string;
    };
  } | null;
  error: null | string;
  loading: "idle" | "pending" | "success" | "failed";
};
const initialState: TauthSlice = {
  error: null,
  loading: "idle",
  user: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetUI: (state) => {
      state.error = null;
      state.loading = "idle";
    },
    logOut: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addNewUser.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(addNewUser.fulfilled, (state) => {
      state.loading = "success";
    });
    builder.addCase(addNewUser.rejected, (state, action) => {
      state.loading = "failed";
      state.error = action.payload as string;
    });
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.user = action.payload;
      state.user.accessToken = action.payload.accessToken;
      state.loading = "success";
      state.error = null;
    });
    builder.addCase(getUserData.pending, (state) => {
      state.loading = "pending";
      state.error = null;
    });
    builder.addCase(getUserData.rejected, (state, action) => {
      state.error = action.payload as string;
      state.loading = "failed";
    });
  },
});

export default AuthSlice.reducer;
export { addNewUser, getUserData };
export const { resetUI, logOut } = AuthSlice.actions;
