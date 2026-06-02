import { createSlice } from "@reduxjs/toolkit";

export const GUEST_CART_STORAGE_KEY = "guest_cart";

export const getCartStorageKey = (userId) =>
  userId ? `${userId}_cart` : GUEST_CART_STORAGE_KEY;

export const getStoredCart = (storageKey = GUEST_CART_STORAGE_KEY) => {
  if (typeof window === "undefined") {
    return {
      cartItems: [],
      storageKey,
    };
  }

  try {
    const storedValue = window.localStorage.getItem(storageKey);
    if (!storedValue) {
      return {
        cartItems: [],
        storageKey,
      };
    }

    const parsedValue = JSON.parse(storedValue);

    return {
      cartItems: Array.isArray(parsedValue?.cartItems)
        ? parsedValue.cartItems
        : [],
      storageKey,
    };
  } catch {
    return {
      cartItems: [],
      storageKey,
    };
  }
};

export const removeStoredCart = (storageKey) => {
  if (typeof window === "undefined" || !storageKey) return;
  window.localStorage.removeItem(storageKey);
};

const persistCart = (storageKey, cartState) => {
  if (typeof window === "undefined" || !storageKey) return;

  window.localStorage.setItem(storageKey, JSON.stringify(cartState));
};

const initialState = {
  cartItems: [],
  isCartOpen: false,
  isHydrated: false,
  storageKey: GUEST_CART_STORAGE_KEY,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    hydrateCart(state, action) {
      state.cartItems = Array.isArray(action.payload?.cartItems)
        ? action.payload.cartItems
        : [];
      state.storageKey = action.payload?.storageKey || GUEST_CART_STORAGE_KEY;
      state.isHydrated = true;
    },
    switchCartContext(state, action) {
      state.cartItems = Array.isArray(action.payload?.cartItems)
        ? action.payload.cartItems
        : [];
      state.storageKey = action.payload?.storageKey || GUEST_CART_STORAGE_KEY;
      state.isHydrated = true;
      persistCart(state.storageKey, {
        cartItems: state.cartItems,
      });
    },
    setCartItems(state, action) {
      state.cartItems = action.payload;
      state.isHydrated = true;
      persistCart(state.storageKey, {
        cartItems: state.cartItems,
      });
    },
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    clearCart(state) {
      state.cartItems = [];
      state.isHydrated = true;
      persistCart(state.storageKey, {
        cartItems: [],
      });
    },
  },
});

export const {
  hydrateCart,
  switchCartContext,
  setCartItems,
  setIsCartOpen,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
