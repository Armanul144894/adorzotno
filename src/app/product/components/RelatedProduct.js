'use client';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

export default function RelatedProduct({ relatedProducts }) {


  return (
    <div className="w-full py-12">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Related Products
      </h2>

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
          className="cat-next absolute right-0 top-1/2 z-10 -translate-y-1/2 bg-white shadow-md rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-100"
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
          spaceBetween={16}
          slidesPerView={1}
          speed={2000}
          observer
          observeParents
          watchOverflow
          breakpoints={{
            640: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1380: { slidesPerView: 5 },
          }}
          className="w-full max-w-full"
        >
          {relatedProducts?.map((item) => (
            <SwiperSlide key={item?.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer">
              <Link href={`/product/${item?.name.toLowerCase()
                .replace(/&/g, 'and')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')}`}>
                <div className="relative">
                  <Image
                    src={item?.images[0]}
                    alt={item?.name}
                    width={300}
                    height={300}
                    className="w-full h-48 object-contain"
                  />
                  {item?.discount && (
                    <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                      {item?.discount}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {item?.name}
                  </h3>
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${i < Math.floor(item?.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                          }`}
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xl font-bold text-gray-800">
                      ${item?.price}
                    </span>
                    <span className="text-sm text-gray-400 line-through">
                      ${item?.originalPrice}
                    </span>
                  </div>
                  <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition font-semibold">
                    View Details
                  </button>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div >
    </div >
  );
};
