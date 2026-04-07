"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, RotateCcw, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useCart } from "../context/CartContext";
import products from "../../public/data/data";

const previousOrders = products.slice(30, 44);

// ── Skeleton Card ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden h-full animate-pulse">
      {/* Image placeholder */}
      <div className="h-40 bg-gray-200" />
      {/* Info placeholder */}
      <div className="p-3 flex flex-col gap-2">
        <div className="h-2.5 bg-gray-200 rounded w-1/3" />
        <div className="h-3.5 bg-gray-200 rounded w-4/5" />
        <div className="h-3.5 bg-gray-200 rounded w-3/5" />
        <div className="h-2.5 bg-gray-200 rounded w-1/4 mt-1" />
        {/* Stars */}
        <div className="flex gap-1 mt-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 rounded-full" />
          ))}
        </div>
        {/* Price + button row */}
        <div className="flex items-center justify-between mt-2">
          <div className="h-5 bg-gray-200 rounded w-16" />
          <div className="w-9 h-9 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

// ── ProductCard ───────────────────────────────────────────────────────────────
function ProductCard({ product }) {
  const { addToCart, getItemQuantity, updateQuantity, removeItem } = useCart();
  const quantity = getItemQuantity(product.id);
  const inCart = quantity > 0;

  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

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
    if (quantity === 1) removeItem(product.id);
    else updateQuantity(product.id, quantity - 1);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col overflow-hidden h-full">
      <Link
        href={`/product/${product.name
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")}`}
        className="flex flex-col flex-1"
      >
        {/* Image */}
        <div className="relative h-40 bg-gray-50 overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
              -{discount}%
            </span>
          )}
          <span className="absolute bottom-2 left-2 bg-black/50 backdrop-blur-sm text-white text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1">
            <RotateCcw size={9} /> {product.lastOrdered ?? "Recently"}
          </span>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col flex-1 gap-1">
          <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">
            {product.brand}
          </p>
          <h3 className="text-sm font-semibold text-gray-800 leading-tight line-clamp-2 h-10">
            {product.name}
          </h3>
          <p className="text-[10px] text-gray-400">{product.quantity}</p>

          <div className="flex gap-1 mt-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={11}
                className={
                  i < Math.floor(product.rating)
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300"
                }
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1.5">
              <span className="text-base font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-xs text-gray-400 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            </div>

            {inCart ? (
              <div className="flex items-center gap-1 bg-primary rounded-lg overflow-hidden">
                <button
                  onClick={handleDecrease}
                  className="text-white px-2.5 py-1.5 hover:bg-white/20 transition-colors font-bold text-base leading-none"
                >
                  −
                </button>
                <span className="text-white font-semibold text-sm min-w-[18px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={handleIncrease}
                  className="text-white px-2.5 py-1.5 hover:bg-white/20 transition-colors font-bold text-base leading-none"
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className={`flex items-center gap-1 bg-[#1e7aac25] hover:bg-primary text-primary hover:text-white border border-primary rounded-lg font-semibold transition-all duration-300 overflow-hidden px-4 py-2 w-10 h-10 justify-center`}
              >
                <span className="text-2xl leading-none font-medium">+</span>
              </button>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}

// ── HomeOrderAgain ────────────────────────────────────────────────────────────
export default function HomeOrderAgain() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetch — replace with your real fetch/async logic
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const skeletonCount = 7;
  return (
    <section className="w-full mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-semibold">
           Order Again
          </h2>
          <RotateCcw className="text-primary" size={24} />
        </div>

        <Link
          href="/orders"
          className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/5"
        >
          View Orders <ChevronRight size={16} />
        </Link>
      </div>

      {/* Slider — px-5 gives room for the nav buttons, no overflow-hidden here */}
      <div className="relative">
        {!loading && (
          <>
            <button
              className="order-again-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="order-again-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 gap-3">
            {[...Array(skeletonCount)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".order-again-prev",
              nextEl: ".order-again-next",
            }}
            spaceBetween={12}
            slidesPerView={2}
            observer
            observeParents
            watchOverflow
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1224: { slidesPerView: 5 },
              1400: { slidesPerView: 8 },
            }}
          >
            {previousOrders.map((product) => (
              <SwiperSlide key={product.id} className="h-auto py-4">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}
