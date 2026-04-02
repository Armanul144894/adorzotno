"use client";
import { Star, ShoppingCart, RotateCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useCart } from "./CartContext";

export default function ProductCard({ product }) {
  const { addToCart, getItemQuantity, updateQuantity, removeItem } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  const quantity = getItemQuantity(product.id);
  const inCart = quantity > 0;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleIncrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity === 1) {
      removeItem(product.id);
    } else {
      updateQuantity(product.id, quantity - 1);
    }
  };

  return (
    <div className="bg-white h-full rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden group flex-shrink-0">
      <Link
        href={`/product/${product.name
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`}
      >
        <div className="bg-white h-full rounded-lg overflow-hidden">
          <div className="relative h-48 bg-gray-50 overflow-hidden">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          </div> 

          <div className="p-4">
            <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10">
              {product.name}
            </h3>

            <div className="flex flex-wrap justify-between items-center gap-3">
              <div>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <span className="font-bold">${product.price}</span>
                  <span className="line-through text-gray-400">
                    ${product.originalPrice}
                  </span>
                </div>
              </div>

              {/* Add to Cart Button / Quantity Controls */}
              {inCart ? (
                /* Already in cart: always show quantity controls */
                <div className="flex items-center gap-1 bg-primary rounded-lg overflow-hidden">
                  <button
                    onClick={handleDecrease}
                    className="text-white px-3 py-2 hover:bg-white/20 transition-colors font-bold text-lg leading-none"
                  >
                    −
                  </button>
                  <span className="text-white font-semibold text-sm min-w-[20px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={handleIncrease}
                    className="text-white px-3 py-2 hover:bg-white/20 transition-colors font-bold text-lg leading-none"
                  >
                    +
                  </button>
                </div>
              ) : (
                /* Not in cart: show + button, expand on hover */
                <div
                  className="relative"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Collapsed: just the + icon */}
                  <button
                    onClick={handleAdd}
                    className={`
                                            flex items-center gap-1 bg-primary text-white rounded-lg font-semibold
                                            transition-all duration-300 overflow-hidden
                                             px-4 py-2 w-10 h-10 justify-center
                                            }
                                        `}
                  >
                    <span className="text-xl leading-none font-bold">+</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
