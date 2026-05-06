'use client';
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addToCartAction,
  removeItem as removeItemAction,
  setCartItems as setCartItemsAction,
  setIsCartOpen as setIsCartOpenAction,
  updateQuantity as updateQuantityAction,
} from "../redux/features/cart/cartSlice";

export function useCart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  const setCartItems = (valueOrUpdater) => {
    const nextValue =
      typeof valueOrUpdater === "function"
        ? valueOrUpdater(cartItems)
        : valueOrUpdater;
    dispatch(setCartItemsAction(nextValue));
  };

  const setIsCartOpen = (value) => {
    dispatch(setIsCartOpenAction(value));
  };

  const addToCart = (product) => {
    dispatch(addToCartAction(product));
  };

  const updateQuantity = (id, quantity) => {
    dispatch(updateQuantityAction({ id, quantity }));
  };

  const removeItem = (id) => {
    dispatch(removeItemAction(id));
  };

  const getItemQuantity = (id) => {
    return cartItems.find((item) => item.id === id)?.quantity ?? 0;
  };

  return {
    cartItems,
    setCartItems,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    updateQuantity,
    removeItem,
    getItemQuantity,
  };
}
