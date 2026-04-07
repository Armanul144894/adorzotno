"use client";
import React, { useState } from "react";
import {
  X,
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  Tag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../context/CartContext";

const CartOffcanvas = () => {
  const {
    cartItems,
    setCartItems,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeItem,
  } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const applyCoupon = () => {
    if (couponCode.toUpperCase() === "SAVE10") {
      setAppliedCoupon({ code: "SAVE10", discount: 10 });
      setCouponCode("");
    } else if (couponCode.toUpperCase() === "HEALTH20") {
      setAppliedCoupon({ code: "HEALTH20", discount: 20 });
      setCouponCode("");
    } else {
      alert("Invalid coupon code");
    }
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const calculateSubtotal = () =>
    cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const calculateDiscount = () => {
    if (!appliedCoupon) return 0;
    return (calculateSubtotal() * appliedCoupon.discount) / 100;
  };

  const getShippingCost = () => (calculateSubtotal() > 50 ? 0 : 5.99);

  const calculateTotal = () =>
    calculateSubtotal() - calculateDiscount() + getShippingCost();

  return (
    <div>
      {/* Overlay */}
      {isCartOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Offcanvas */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-primary text-white">
            <div className="flex items-center gap-3">
              <ShoppingBag size={24} />
              <div>
                <h2 className="text-xl font-bold">Shopping Cart</h2>
                <p className="text-sm text-teal-100">
                  {cartItems.length} items
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 hover:bg-white/20 rounded-lg transition"
            >
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-600 mb-6">
                  Add some items to get started!
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-primary transition"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 rounded-lg p-4 relative"
                  >
                    <button
                      onClick={() => removeItem(item.id)}
                      className="absolute top-2 right-2 p-1 text-red-500 hover:bg-red-50 rounded transition"
                    >
                      <Trash2 size={18} />
                    </button>
                    <div className="flex gap-4">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <span className="text-xs text-primary font-semibold">
                          {item.category}
                        </span>
                        <h3 className="font-semibold text-gray-800 text-sm mb-1">
                          {item.name}
                        </h3>
                        <p className="text-primary font-bold">${item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1 bg-white border border-gray-300 rounded text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1 border border-gray-300 rounded hover:bg-gray-100 transition"
                          >
                            <Plus size={16} />
                          </button>
                          <span className="ml-auto text-sm text-gray-600">
                            = ${(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Coupon */}
            {cartItems.length > 0 && (
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <Tag size={18} className="text-primary" />
                  Have a Coupon Code?
                </h3>
                {appliedCoupon ? (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-primary">
                        {appliedCoupon.code} Applied!
                      </p>
                      <p className="text-xs text-primary">
                        You saved {appliedCoupon.discount}%
                      </p>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-red-500 hover:text-red-700 text-sm font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-sm"
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-secondary text-white px-4 py-2 rounded-lg hover:bg-primary transition text-sm font-semibold"
                    >
                      Apply
                    </button>
                  </div>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Try: <span className="font-semibold">SAVE10</span> or{" "}
                  <span className="font-semibold">HEALTH20</span>
                </p>
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t bg-white p-6">
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal:</span>
                  <span>${calculateSubtotal().toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-sm text-primary">
                    <span>Discount ({appliedCoupon.discount}%):</span>
                    <span>-${calculateDiscount().toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping:</span>
                  <span>
                    {getShippingCost() === 0 ? (
                      <span className="text-primary font-semibold">FREE</span>
                    ) : (
                      `$${getShippingCost().toFixed(2)}`
                    )}
                  </span>
                </div>
                {calculateSubtotal() < 50 && (
                  <p className="text-xs text-orange-600">
                    Add ${(50 - calculateSubtotal()).toFixed(2)} more for free
                    shipping!
                  </p>
                )}
              </div>

              <div className="flex justify-between text-lg font-bold text-gray-800 mb-4 pt-4 border-t">
                <span>Total:</span>
                <span className="text-primary">
                  ${calculateTotal().toFixed(2)}
                </span>
              </div>

              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                <button className="w-full mb-2 bg-primary text-white py-3 rounded-lg hover:bg-secondary transition font-semibold flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight size={18} />
                </button>
              </Link>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  🔒 Secure Checkout - SSL Encrypted
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartOffcanvas;
