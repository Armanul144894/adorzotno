import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./baseApi";
import cartReducer from "./features/cart/cartSlice";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        [baseApi.reducerPath]: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;
