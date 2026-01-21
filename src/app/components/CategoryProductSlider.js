
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';

export default function CategoryProduct({ category, products }) {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleSlideChange = (swiper) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handlePrev = () => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  };

  return (
    <div className="mb-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-gray-800">{category}</h2>
        <Link href={`/category/${category.toLowerCase()
          .replace(/&/g, 'and')
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')}`}>
          <button className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium transition-colors text-sm md:text-base">
            View All
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        </Link>

      </div>

      <div className="relative">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={isBeginning}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 ${isBeginning
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-100 hover:bg-emerald-50 hover:shadow-xl active:scale-95'
            }`}
          aria-label="Previous products"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
        </button>

        {/* Swiper Container */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={16}
          slidesPerView={1}
          onSwiper={setSwiperInstance}
          onSlideChange={handleSlideChange}
          speed={1200}
          watchOverflow={true}
          breakpoints={{
            // Mobile - Medium (375px)
            375: {
              slidesPerView: 1,
              spaceBetween: 12,
            },
            // Mobile - Large (425px)
            425: {
              slidesPerView: 1.2,
              spaceBetween: 14,
            },
             // Mobile - Large (480px)
            480: {
              slidesPerView: 1.6,
              spaceBetween: 16,
            },
            // Tablet - Medium (560px)
            560: {
              slidesPerView: 2,
              spaceBetween: 16,
            },
            // Tablet - Medium (768px)
            768: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            // Tablet - Medium (840px)
            840: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            // Laptop - Small (1024px)
            1024: {
              slidesPerView: 2.5,
              spaceBetween: 18,
            },
            // Laptop - Medium (1280px)
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            // Desktop (1536px)
            1536: {
              slidesPerView: 4.5,
              spaceBetween: 24,
            },
          }}
          className="!pb-4"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id} className="h-auto">
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isEnd}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg rounded-full p-2 md:p-3 transition-all duration-300 ${isEnd
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-100 hover:bg-emerald-50 hover:shadow-xl active:scale-95'
            }`}
          aria-label="Next products"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
        </button>
      </div>

      {/* Mobile Navigation Dots */}
      <div className="flex md:hidden justify-center gap-2 mt-4">
        {Array.from({ length: Math.ceil(products.length / 2) }).map((_, index) => (
          <button
            key={index}
            onClick={() => swiperInstance?.slideTo(index * 2)}
            className={`h-2 rounded-full transition-all duration-300 ${Math.floor((swiperInstance?.activeIndex || 0) / 2) === index
                ? 'w-8 bg-emerald-600'
                : 'w-2 bg-gray-300 hover:bg-gray-400'
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
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
    </div>
  );
}