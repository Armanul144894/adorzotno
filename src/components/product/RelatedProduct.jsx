"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ProductCard from "../cards/ProductCard";

import "swiper/css";
import "swiper/css/navigation";

export default function RelatedProduct({ relatedProducts }) {
  return (
    <div className="w-full py-12">
      <h2 className="text-xl md:text-2xl font-semibold">Related Products 🧊</h2>
      {/* Slider Wrapper (IMPORTANT) */}
      <div className="relative w-full max-w-full overflow-hidden">
        {/* Navigation buttons */}
        <button
          className="cat-prev absolute left-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100"
          aria-label="Previous"
        >
          <ChevronLeft size={18} />
        </button>

        <button
          className="cat-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-blue-50 shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-blue-100"
          aria-label="Next"
        >
          <ChevronRight size={18} />
        </button>

        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: ".cat-prev",
            nextEl: ".cat-next",
          }}
          spaceBetween={14}
          slidesPerView={2}
          speed={2000}
          observer
          observeParents
          watchOverflow
          breakpoints={{
            380: { slidesPerView: 2 },
            540: { slidesPerView: 2.5 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1380: { slidesPerView: 5 },
            1536: {
              slidesPerView: 6,
              spaceBetween: 10,
            },
          }}
          className="w-full max-w-full"
        >
          {relatedProducts?.map((item) => (
            <SwiperSlide key={item?.id} className="h-auto py-4">
              <ProductCard product={item} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
