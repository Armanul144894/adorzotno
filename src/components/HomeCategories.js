"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import allCategories from "../../public/data/category";

// ── slugify ──────────────────────────────────────────────────────────────────
const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

// ── SkeletonCard ─────────────────────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="relative rounded-2xl overflow-hidden h-40 bg-gray-200 animate-pulse">
      {/* Simulated gradient shimmer at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-300 to-transparent" />
      {/* Emoji placeholder */}
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
        <div className="w-20 h-3 bg-gray-300 rounded-full" />
      </div>
    </div>
  );
}

// ── CategoryCard ─────────────────────────────────────────────────────────────
function CategoryCard({ cat }) {
  return (
    <Link
      href={`/category/${slugify(cat.name)}`}
      className="group relative block rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-40"
    >
      <Image
        src={cat.image}
        alt={cat.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
        className="object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
      <div
        className={`absolute inset-0 bg-gradient-to-t ${cat.color ?? "from-teal-600 to-teal-300"
          } opacity-55 group-hover:opacity-70 transition-opacity duration-300`}
      />
      <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 text-white text-center px-2">
        <div className="-mb-8 group-hover:mb-0 transition-all duration-300 flex flex-col items-center">
          <span className="text-3xl drop-shadow-lg leading-none">
            {cat.emoji ?? cat.icon}
          </span>
          <span className="text-sm font-bold mt-1.5 drop-shadow tracking-wide leading-tight">
            {cat.name}
          </span>
        </div>
        <span className="mt-2 text-[10px] font-semibold bg-white/20 backdrop-blur-sm px-3 py-0.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
          Shop →
        </span>
      </div>
    </Link>
  );
}

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
    <section className="w-full mb-8">
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
              className="cat-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              className="cat-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {[...Array(skeletonCount)].map((_, i) => (
              <SkeletonCard key={i} />
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
              768: { slidesPerView: 5 },
              1224: { slidesPerView: 6 },
              1320: { slidesPerView: 7 },
              1500: { slidesPerView: 8 },
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