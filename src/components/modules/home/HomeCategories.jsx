"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import allCategories from "../../../../public/data/category";
import CategoryCard from "@/components/cards/CategoryCard";
import CategorySkeletonCard from "@/components/cards/CategorySkeletonCard";

// ── HomeCategories ────────────────────────────────────────────────────────────
export default function HomeCategories() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your real data-fetching logic
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const skeletonCount = 8;

  return (
    <section className="group/category w-full mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-semibold">
            Popular Categories
          </h2>
          <Flame className="text-orange-500" size={24} />
        </div>
        <Link
          href="/category"
          className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/5"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>

      {/* Slider */}
      <div className="relative">
        {!loading && (
          <>
            <button
              className="cat-prev absolute -left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-primary/85 text-white shadow-md opacity-0 transition-all duration-300 group-hover/category:translate-x-0 group-hover/category:opacity-100 md:translate-x-3"
              aria-label="Previous"
            >
              <ChevronLeft size={18} strokeWidth={3} />
            </button>
            <button
              className="cat-next absolute -right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-primary/85 text-white shadow-md opacity-0 transition-all duration-300 group-hover/category:translate-x-0 group-hover/category:opacity-100 md:-translate-x-3"
              aria-label="Next"
            >
              <ChevronRight size={18} strokeWidth={3} />
            </button>
          </>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3">
            {[...Array(skeletonCount)].slice(0, 7).map((_, i) => (
              <CategorySkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation={{ prevEl: ".cat-prev", nextEl: ".cat-next" }}
            spaceBetween={12}
            slidesPerView={2}
            observer
            observeParents
            watchOverflow
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1224: { slidesPerView: 5 },
              1320: { slidesPerView: 6 },
              1500: { slidesPerView: 7 },
            }}
            className="!pb-2"
          >
            {allCategories.map((cat, index) => (
              <SwiperSlide key={index}>
                <CategoryCard cat={cat} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style jsx global>{`
        .swiper-slide {
          display: flex;
          height: auto;
        }
        .swiper-slide > * {
          width: 100%;
        }
      `}</style>
    </section>
  );
}
