"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { authApi } from "./features/auth/authApi";
import { getStoredAuth, hydrateAuth } from "./features/auth/authSlice";

function AuthHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedAuth = getStoredAuth();
    dispatch(hydrateAuth(storedAuth));

    if (storedAuth?.token) {
      dispatch(authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }));
    }
  }, [dispatch]);

  return null;
}

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <AuthHydrator />
      {children}
    </Provider>
  );
}
