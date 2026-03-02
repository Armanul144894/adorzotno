'use client';
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, {
                id: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                image: product.images[0],
                category: product.category || '',
            }];
        });
        // Auto-open cart when item is added
        setIsCartOpen(true);
    };

    const updateQuantity = (id, newQuantity) => {
        if (newQuantity < 1) return;
        setCartItems(prev =>
            prev.map(item => item.id === id ? { ...item, quantity: newQuantity } : item)
        );
    };

    const removeItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const getItemQuantity = (id) => {
        return cartItems.find(item => item.id === id)?.quantity ?? 0;
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            setCartItems,
            isCartOpen,
            setIsCartOpen,
            addToCart,
            updateQuantity,
            removeItem,
            getItemQuantity,
        }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used within CartProvider');
    return ctx;
}