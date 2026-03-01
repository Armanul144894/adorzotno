"use client";
import { Timer, Zap } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import products from "../../../data/data";
import Link from "next/link";
// Flash Sale Component
export default function FlashSaleSection() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashSaleProducts = products.slice(30, 36);

  return (
    <div className="mb-8">
      <div className="bg-gradient-to-r from-primary to-blue-500 rounded-t-lg p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="text-yellow-300" size={32} />
            <div>
              <h2 className="text-2xl font-bold">⚡ Flash Sale</h2>
              <p className="text-sm text-white/90">
                Limited time offers - Hurry up!
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Timer size={24} />
            <div className="flex gap-2">
              <div className="bg-white text-red-600 px-3 py-2 rounded-lg font-bold text-lg">
                {String(timeLeft.hours).padStart(2, "0")}
              </div>
              <span className="text-2xl">:</span>
              <div className="bg-white text-red-600 px-3 py-2 rounded-lg font-bold text-lg">
                {String(timeLeft.minutes).padStart(2, "0")}
              </div>
              <span className="text-2xl">:</span>
              <div className="bg-white text-red-600 px-3 py-2 rounded-lg font-bold text-lg">
                {String(timeLeft.seconds).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-b-lg shadow-md p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4">
          {flashSaleProducts.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.name
                .toLowerCase()
                .replace(/&/g, "and")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "")}`}
            >
              <div className="border h-full border-gray-200 rounded-lg p-3 hover:shadow-lg transition group">
                <div className="relative mb-3">
                  <Image
                    height={200}
                    width={200}
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-32 object-cover rounded"
                  />
                  <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                    {product.discount}
                  </span>
                </div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-2">
                  <span className="text-lg font-bold text-red-600">
                    ${product.price}
                  </span>
                  <span className="text-xs text-gray-400 line-through">
                    ${product.originalPrice}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: "70%" }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mb-2">Sold: 70%</p>
                <button className="w-full bg-primary text-white py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition">
                  Buy Now
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
