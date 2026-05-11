"use client";

import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import { getStoredAuth, hydrateAuth } from "./features/auth/authSlice";

function AuthHydrator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hydrateAuth(getStoredAuth()));
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
