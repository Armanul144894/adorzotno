"use client";
import React from "react";
import products from "../../../data/data";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./CartContext";

export default function OccasionalSection() {
  const { addToCart, getItemQuantity, updateQuantity, removeItem } = useCart();

  const occasions = [
    {
      id: 201,
      title: "Winter Care Essentials",
      icon: "❄️",
      products: products.slice(0, 7).map(p => ({ ...p, occasion: "Winter" })),
    },
    {
      id: 202,
      title: "New Year Health Goals",
      icon: "🎉",
      products: products.slice(4, 11).map(p => ({ ...p, occasion: "New Year" })),
    },
  ];

  return (
    <div className="mb-8">
      {occasions.map((occasion) => (
        <div key={occasion.id} className="mb-8">
          <div className="bg-gradient-to-r from-primary to-blue-500 rounded-t-lg p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{occasion.icon}</div>
                <div>
                  <h2 className="text-2xl font-bold">{occasion.title}</h2>
                  <p className="text-sm text-white/90">Special occasion picks just for you</p>
                </div>
              </div>
              <button className="bg-white text-red-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition">
                Shop Collection
              </button>
            </div>
          </div>

          <div className="bg-white rounded-b-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
              {occasion.products.map((product) => {
                const quantity = getItemQuantity(product.id);
                return (
                  <div key={product.id} className="border h-full border-red-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                    <Link href={`/product/${product.name.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}>
                      <div className="relative">
                        <Image height={200} width={400} src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
                        <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {product.discount}
                        </span>
                        <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold text-red-600">
                          {occasion.icon} {product.occasion}
                        </div>
                      </div>
                      <div className="p-4">
                        <span className="text-xs text-red-600 font-semibold">{product.category}</span>
                        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2">{product.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xl font-bold text-gray-800">${product.price}</span>
                          <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                        </div>
                      </div>
                    </Link>

                    <div className="px-4 pb-4">
                      {quantity > 0 ? (
                        <div className="flex items-center justify-center gap-1 bg-primary rounded-lg overflow-hidden">
                          <button
                            onClick={() => quantity === 1 ? removeItem(product.id) : updateQuantity(product.id, quantity - 1)}
                            className="text-white px-3 py-2 hover:bg-white/20 transition font-bold text-lg"
                          >−</button>
                          <span className="text-white font-semibold text-sm min-w-[20px] text-center">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            className="text-white px-3 py-2 hover:bg-white/20 transition font-bold text-lg"
                          >+</button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(product)}
                          className="w-full bg-primary text-white py-2 rounded-lg hover:opacity-90 transition font-semibold"
                        >
                          Add to Cart
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}