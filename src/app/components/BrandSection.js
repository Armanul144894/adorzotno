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
    name: 'Pfizer',
    slug: 'pfizer',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pfizer_logo.svg/2560px-Pfizer_logo.svg.png',
    products: 145,
    description: 'Leading pharmaceutical company',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100'
  },
  {
    id: 2,
    name: 'Johnson & Johnson',
    slug: 'johnson-johnson',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Johnson_and_Johnson_Logo.svg/2560px-Johnson_and_Johnson_Logo.svg.png',
    products: 238,
    description: 'Healthcare innovation leader',
    bgColor: 'bg-red-50',
    hoverColor: 'hover:bg-red-100'
  },
  {
    id: 3,
    name: 'Bayer',
    slug: 'bayer',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Bayer_Logo.svg/2560px-Bayer_Logo.svg.png',
    products: 152,
    description: 'Science for a better life',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:bg-green-100'
  },
  {
    id: 4,
    name: 'GlaxoSmithKline',
    slug: 'glaxosmithkline',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/GSK_logo_2014.svg/2560px-GSK_logo_2014.svg.png',
    products: 187,
    description: 'Global healthcare company',
    bgColor: 'bg-orange-50',
    hoverColor: 'hover:bg-orange-100'
  },
  {
    id: 5,
    name: 'Abbott',
    slug: 'abbott',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Abbott_Laboratories_logo.svg/2560px-Abbott_Laboratories_logo.svg.png',
    products: 198,
    description: 'Life-changing technologies',
    bgColor: 'bg-purple-50',
    hoverColor: 'hover:bg-purple-100'
  },
  {
    id: 6,
    name: 'Novartis',
    slug: 'novartis',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Novartis-Logo.svg/2560px-Novartis-Logo.svg.png',
    products: 134,
    description: 'Reimagining medicine',
    bgColor: 'bg-cyan-50',
    hoverColor: 'hover:bg-cyan-100'
  },
  {
    id: 7,
    name: 'Roche',
    slug: 'roche',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hoffmann-La_Roche_logo.svg/2560px-Hoffmann-La_Roche_logo.svg.png',
    products: 176,
    description: 'Pioneering healthcare',
    bgColor: 'bg-pink-50',
    hoverColor: 'hover:bg-pink-100'
  },
  {
    id: 8,
    name: 'Merck',
    slug: 'merck',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Merck_%26_Co.svg/2560px-Merck_%26_Co.svg.png',
    products: 143,
    description: 'Inventing for life',
    bgColor: 'bg-indigo-50',
    hoverColor: 'hover:bg-indigo-100'
  },
  {
    id: 9,
    name: 'Sanofi',
    slug: 'sanofi',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sanofi.svg/2560px-Sanofi.svg.png',
    products: 162,
    description: 'Healthcare solutions',
    bgColor: 'bg-teal-50',
    hoverColor: 'hover:bg-teal-100'
  },
  {
    id: 10,
    name: 'AstraZeneca',
    slug: 'astrazeneca',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/AstraZeneca_logo.svg/2560px-AstraZeneca_logo.svg.png',
    products: 129,
    description: 'Science-led biopharmaceutical',
    bgColor: 'bg-yellow-50',
    hoverColor: 'hover:bg-yellow-100'
  },
  {
    id: 11,
    name: 'Eli Lilly',
    slug: 'eli-lilly',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Eli_Lilly_and_Company.svg/2560px-Eli_Lilly_and_Company.svg.png',
    products: 118,
    description: 'Medicines that matter',
    bgColor: 'bg-red-50',
    hoverColor: 'hover:bg-red-100'
  },
  {
    id: 12,
    name: 'Bristol Myers Squibb',
    slug: 'bristol-myers-squibb',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Bristol_Myers_Squibb_Logo.svg/2560px-Bristol_Myers_Squibb_Logo.svg.png',
    products: 156,
    description: 'Transforming patients lives',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100'
  },
  {
    id: 13,
    name: 'Boehringer Ingelheim',
    slug: 'boehringer-ingelheim',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Boehringer_Ingelheim_Logo.svg/2560px-Boehringer_Ingelheim_Logo.svg.png',
    products: 142,
    description: 'Value through innovation',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:bg-green-100'
  },
  {
    id: 14,
    name: 'Takeda',
    slug: 'takeda',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Takeda_Pharmaceutical_Company_logo.svg/2560px-Takeda_Pharmaceutical_Company_logo.svg.png',
    products: 134,
    description: 'Better health, brighter future',
    bgColor: 'bg-purple-50',
    hoverColor: 'hover:bg-purple-100'
  },
  {
    id: 15,
    name: 'Amgen',
    slug: 'amgen',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Amgen.svg/2560px-Amgen.svg.png',
    products: 98,
    description: 'Serving patients',
    bgColor: 'bg-cyan-50',
    hoverColor: 'hover:bg-cyan-100'
  },
  {
    id: 16,
    name: 'Teva Pharmaceutical',
    slug: 'teva-pharmaceutical',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Teva_Pharmaceutical_Industries_logo.svg/2560px-Teva_Pharmaceutical_Industries_logo.svg.png',
    products: 167,
    description: 'Generic medicines leader',
    bgColor: 'bg-blue-50',
    hoverColor: 'hover:bg-blue-100'
  },
  {
    id: 17,
    name: 'Gilead Sciences',
    slug: 'gilead-sciences',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Gilead_Sciences_logo.svg/2560px-Gilead_Sciences_logo.svg.png',
    products: 89,
    description: 'Biopharmaceutical company',
    bgColor: 'bg-green-50',
    hoverColor: 'hover:bg-green-100'
  },
  {
    id: 18,
    name: 'Biogen',
    slug: 'biogen',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Biogen_logo.svg/2560px-Biogen_logo.svg.png',
    products: 76,
    description: 'Neuroscience focused',
    bgColor: 'bg-purple-50',
    hoverColor: 'hover:bg-purple-100'
  },
  {
    id: 19,
    name: 'Moderna',
    slug: 'moderna',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Moderna_logo.svg/2560px-Moderna_logo.svg.png',
    products: 45,
    description: 'mRNA therapeutics',
    bgColor: 'bg-red-50',
    hoverColor: 'hover:bg-red-100'
  },
  {
    id: 20,
    name: 'Regeneron',
    slug: 'regeneron',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Regeneron_Pharmaceuticals_logo.svg/2560px-Regeneron_Pharmaceuticals_logo.svg.png',
    products: 63,
    description: 'Biotechnology company',
    bgColor: 'bg-cyan-50',
    hoverColor: 'hover:bg-cyan-100'
  }
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
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-1">
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
              slidesPerView: 7,
              spaceBetween: 24,
            },
          }}
          className="!pb-2"
        >
          {brands.map((brand) => (
            <SwiperSlide key={brand.id}>
              <Link href={`/brand/${brand.slug}`}>
                <div className={`group cursor-pointer bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full border-2 border-transparent hover:border-primary/20`}>
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