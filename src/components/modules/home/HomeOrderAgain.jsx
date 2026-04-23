"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import products from "../../../../public/data/data";
import ProductCard from "../../cards/ProductCard";

const previousOrders = products.slice(30, 44);

function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-sm flex flex-col overflow-hidden h-full animate-pulse">
      <div className="h-40 bg-gray-200" />
      <div className="p-3 flex flex-col gap-2">
        <div className="h-2.5 bg-gray-200 rounded w-1/3" />
        <div className="h-3.5 bg-gray-200 rounded w-4/5" />
        <div className="h-3.5 bg-gray-200 rounded w-3/5" />
        <div className="h-2.5 bg-gray-200 rounded w-1/4 mt-1" />
        <div className="flex gap-1 mt-0.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-3 h-3 bg-gray-200 rounded-full" />
          ))}
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="h-5 bg-gray-200 rounded w-16" />
          <div className="w-9 h-9 bg-gray-200 rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default function HomeOrderAgain() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const skeletonCount = 7;
  return (
    <section className="group/category w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-semibold">Order Again</h2>
          <RotateCcw className="text-primary" size={24} />
        </div>

        <Link
          href="/orders"
          className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/5"
        >
          View Orders <ChevronRight size={16} />
        </Link>
      </div>

      <div className="relative">
        {!loading && (
          <>
            <button
              className="order-again-prev absolute -left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-primary/85 text-white shadow-md opacity-0 transition-all duration-300 group-hover/category:translate-x-0 group-hover/category:opacity-100 md:translate-x-3"
              aria-label="Previous"
            >
              <ChevronLeft size={18} strokeWidth={3} />
            </button>
            <button
              className="order-again-next absolute -right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-primary/85 text-white shadow-md opacity-0 transition-all duration-300 group-hover/category:translate-x-0 group-hover/category:opacity-100 md:-translate-x-3"
              aria-label="Next"
            >
              <ChevronRight size={18} strokeWidth={3} />
            </button>
          </>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-6 gap-3">
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
              1400: { slidesPerView: 6 },
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
