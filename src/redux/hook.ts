import { useDispatch, useSelector } from "react-redux";

import type { AppDispatch, RootState } from "./store";

import { configureStore } from "@reduxjs/toolkit";

import { baseApi } from "./baseApi";

import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument

  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

setupListeners(store.dispatch);

// Use throughout your app instead of plain `useDispatch` and `useSelector`

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const useAppSelector = useSelector.withTypes<RootState>();
