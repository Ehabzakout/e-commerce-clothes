import { RootState } from "@/store/store";
import axiosErrorHandler from "@/util/isAxiosError";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
//place Order
const placeOrder = createAsyncThunk(
  "orders/placeOrder",
  async (subTotal: number, thunk) => {
    const { rejectWithValue, getState } = thunk;
    const { auth, cart } = getState() as RootState;
    const product = cart.cartProducts.map((product) => ({
      id: product.id,
      price: product.price,
      img: product.img,
      title: product.title,
      quantity: cart.item[product.id],
    }));
    try {
      const order = { userId: auth.user?.user.id, products: product, subTotal };
      const { data } = await axios.post(" http://localhost:5005/orders", order);

      return data;
    } catch (error) {
      return rejectWithValue(axiosErrorHandler(error));
    }
  },
);

export default placeOrder;
