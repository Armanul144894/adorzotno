"use client";

import React from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import allCategories from "../../../data/category";

export default function HomeCategories() {


    const categories = allCategories;
    const slugify = (name) =>
        name
            .toLowerCase()
            .replace(/&/g, "and")
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/(^-|-$)/g, "");

    return (
        <section className="w-full mb-10">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-800">
                    Shop by Category
                </h2>
                <Link
                    href="/category"
                    className="text-teal-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all"
                >
                    View All <ChevronRight size={20} />
                </Link>
            </div>

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
                    slidesPerView={2}
                    observer
                    observeParents
                    watchOverflow={true}
                    breakpoints={{
                        640: { slidesPerView: 3 },
                        768: { slidesPerView: 4 },
                        1024: { slidesPerView: 6 },
                    }}
                    className="!pb-4"
                >
                    {categories.map((cat, index) => (
                        <SwiperSlide key={index} className="h-auto">
                            <Link
                                href={`/category/${slugify(cat.name)}`}
                                className="w-full"
                            >
                                <div className="w-full h-full bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                                    <div
                                        className={`bg-teal-50 rounded-lg p-4 flex items-center justify-center h-32`}
                                    >
                                        <div className='text-6xl '>
                                            {cat?.icon}
                                        </div>
                                    </div>
                                    <div className="p-3 text-center">
                                        <h3 className="text-sm font-semibold text-gray-800">
                                            {cat.name}
                                        </h3>
                                    </div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Styles */}
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
