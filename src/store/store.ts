import { configureStore, combineReducers } from "@reduxjs/toolkit";
import categorySlice from "./features/categories/categorySlice";
import productSlice from "./features/products/productSlice";
import cartSlice from "./features/cart/cartSlice";
import wishListSlice from "./features/wishlist/wishlistSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import AuthSlice from "./features/auth/authSlice";
import ordersSlice from "./features/orders/ordersSlice";
import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const cartPersistConfig = {
  key: "cart",
  storage,
  whiteList: ["item"],
};

const authPersistCongfig = {
  key: "auth",
  storage,
  whiteList: ["user", "accessToken"],
};
const rootPersistConfig = {
  key: "root",
  storage,
  whiteList: ["cart", "auth"],
};
const rootReducer = combineReducers({
  categories: categorySlice,
  products: productSlice,
  cart: persistReducer(cartPersistConfig, cartSlice),
  wishList: wishListSlice,
  auth: persistReducer(authPersistCongfig, AuthSlice),
  orders: ordersSlice,
});

const persistedReducer = persistReducer(rootPersistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export { persistor, store };
