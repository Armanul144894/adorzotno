'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function BrandSection() {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

const brands = [
  {
    id: 1,
    name: "Pfizer",
    slug: "pfizer",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pfizer_logo.svg/250px-Pfizer_logo.svg.png",
  },
  {
    id: 2,
    name: "Johnson & Johnson",
    slug: "johnson-johnson",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-7B24ITY89Biek0SSz9BuPZD0iKSTi8SNDQ&s",
  },
  {
    id: 3,
    name: "Bayer",
    slug: "bayer",
    logo: "https://e7.pngegg.com/pngimages/979/373/png-clipart-leverkusen-bayer-cropscience-agriculture-business-pharma-company-text-thumbnail.png",
  },
  {
    id: 4,
    name: "GlaxoSmithKline",
    slug: "glaxosmithkline",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/GSK_logo_2014.svg/250px-GSK_logo_2014.svg.png",
  },
  {
    id: 5,
    name: "Abbott",
    slug: "abbott",
    logo: "https://www.abbott.com.sg/etc.clientlibs/abbott-platform/clientlibs/clientlib-site/resources/images/abbott-logo.png",
  },
  {
    id: 6,
    name: "Novartis",
    slug: "novartis",
    logo: "https://www.tbsnews.net/sites/default/files/styles/amp_metadata_content_image_min_696px_wide/public/images/2024/12/05/m.png",
  },
  {
    id: 7,
    name: "Roche",
    slug: "roche",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hoffmann-La_Roche_logo.svg/512px-Hoffmann-La_Roche_logo.svg.png",
  },
  {
    id: 8,
    name: "Merck",
    slug: "merck",
    logo: "https://www.merck.com/wp-content/uploads/sites/124/2022/03/Merck.png",
  },
  {
    id: 9,
    name: "Sanofi",
    slug: "sanofi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/7/79/Sanofi_logo.svg",
  },
  {
    id: 10,
    name: "AstraZeneca",
    slug: "astrazeneca",
    logo: "https://mms.businesswire.com/media/20240206590080/en/484259/5/Logo.jpg?download=1",
  },
  {
    id: 11,
    name: "Eli Lilly",
    slug: "eli-lilly",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Eli_Lilly_and_Company.svg/512px-Eli_Lilly_and_Company.png",
  },
  {
    id: 12,
    name: "Bristol Myers Squibb",
    slug: "bristol-myers-squibb",
    logo: "https://6a3d28ac.delivery.rocketcdn.me/wp-content/uploads/2025/03/Bristol-Myers-Squibb.png",
  },
  {
    id: 13,
    name: "Boehringer Ingelheim",
    slug: "boehringer-ingelheim",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Boehringer_Ingelheim_Logo.svg/960px-Boehringer_Ingelheim_Logo.svg.png",
  },
  {
    id: 14,
    name: "Takeda",
    slug: "takeda",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHE4NuqbvBg1BuzLdPemq1PSVjNocSSEARZA&s",
  },
  {
    id: 15,
    name: "Amgen",
    slug: "amgen",
    logo: "https://amgen.wd1.myworkdayjobs.com/wday/cxs/amgen/Careers/sidebarimage/ff565065af860119e1b725ed27020a01",
  },
  
];


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
    <div className="mb-8 px-4 md:px-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-primary">
            Shop by Brand
          </h2>
          <p className="text-sm md:text-base text-gray-600">
            Trusted brands, quality assured
          </p>
        </div>
        <Link href="/brand">
          <button className="hidden md:flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold text-sm md:text-base group">
            View All Brands
            <ChevronRight 
              size={20} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </button>
        </Link>
      </div>

      {/* Slider Container */}
      <div className="relative">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={isBeginning}
          className={`hidden md:block absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 bg-white shadow-xl rounded-full p-3 transition-all duration-300 ${
            isBeginning
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-100 hover:bg-primary hover:text-white hover:shadow-2xl active:scale-95'
          }`}
          aria-label="Previous brands"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Swiper */}
        <Swiper
          modules={[Navigation, Autoplay, Pagination]}
          spaceBetween={16}
          slidesPerView={2}
          onSwiper={(swiper) => setSwiperInstance(swiper)}
          onSlideChange={handleSlideChange}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          loop={true}
          speed={800}
          breakpoints={{
            375: {
              slidesPerView: 2,
              spaceBetween: 12,
            },
            480: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 16,
            },
            768: {
              slidesPerView: 4,
              spaceBetween: 16,
            },
            1024: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
            1280: {
              slidesPerView: 6,
              spaceBetween: 20,
            },
            1536: {
              slidesPerView: 8,
              spaceBetween: 20,
            },
          }}
          className="!pb-6"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <Link href={`/brand/${brand.slug}`}>
                <div className={`group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full border-2 border-transparent hover:border-primary/20`}>
                  {/* Logo Container */}
                  <div className={`${brand.bgColor} ${brand.hoverColor} p-6 flex items-center justify-center transition-all duration-300 relative overflow-hidden`}>
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '20px 20px'
                      }}></div>
                    </div>
                    
                    {/* Logo */}
                    <div className="relative w-full h-20 md:h-24 flex items-center justify-center">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={160}
                        height={80}
                        className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold text-primary shadow-sm">
                      {brand.products}+
                    </div>
                  </div>

                  {/* Brand Info */}
                  <div className="p-4 text-center">
                    <h3 className="font-bold text-gray-800 text-sm md:text-base mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {brand.name}
                    </h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-1">
                      {brand.description}
                    </p>
                    <div className="flex items-center justify-center gap-1 text-xs text-gray-600">
                      <span className="font-semibold text-primary">{brand.products}</span>
                      <span>Products</span>
                    </div>
                  </div>

                  {/* Hover Border Animation */}
                  <div className="absolute inset-0 border-2 border-primary opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={isEnd}
          className={`hidden md:block absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 bg-white shadow-xl rounded-full p-3 transition-all duration-300 ${
            isEnd
              ? 'opacity-30 cursor-not-allowed'
              : 'opacity-100 hover:bg-primary hover:text-white hover:shadow-2xl active:scale-95'
          }`}
          aria-label="Next brands"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>

      {/* Mobile View All Button */}
      <div className="mt-6 flex md:hidden justify-center">
        <Link href="/brand">
          <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-semibold text-sm group">
            View All Brands
            <ChevronRight 
              size={18} 
              className="group-hover:translate-x-1 transition-transform" 
            />
          </button>
        </Link>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper-slide {
          height: auto;
        }
      `}</style>
    </div>
  );
}