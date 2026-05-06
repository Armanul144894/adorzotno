import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  isCartOpen: false,
};

const normalizeCartItem = (product, quantity = 1) => ({
  id: product.id,
  name: product.name,
  price: product.price,
  quantity,
  image: product.image || product.images?.[0] || "",
  category: product.category || "",
});

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
    },
    setIsCartOpen(state, action) {
      state.isCartOpen = action.payload;
    },
    addToCart(state, action) {
      const product = action.payload;
      const existing = state.cartItems.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.cartItems.push(normalizeCartItem(product));
      }

      state.isCartOpen = true;
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      if (quantity < 1) return;

      const existing = state.cartItems.find((item) => item.id === id);
      if (existing) {
        existing.quantity = quantity;
      }
    },
    removeItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload,
      );
    },
    clearCart(state) {
      state.cartItems = [];
    },
  },
});

export const {
  setCartItems,
  setIsCartOpen,
  addToCart,
  updateQuantity,
  removeItem,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
