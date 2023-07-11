import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
