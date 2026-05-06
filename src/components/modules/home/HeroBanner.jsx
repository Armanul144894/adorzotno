'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroSlides = [
        { id: 1, title: 'Slide 1', image: '/images/banner/banner1.png' },
        { id: 2, title: 'Slide 2', image: '/images/banner/banner2.png' },
        { id: 3, title: 'Slide 3', image: '/images/banner/banner3.png' },
        { id: 4, title: 'Slide 4', image: '/images/banner/banner4.png' },
        { id: 5, title: 'Slide 5', image: '/images/banner/banner5.png' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [heroSlides.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    return (
        <div className="relative w-full rounded-lg overflow-hidden mb-6">
            {heroSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'}`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        width={1500}
                        height={500}
                        sizes="100vw"
                        className="w-full h-auto max-h-[500px] min-h-36 object-cover"
                        priority={index === 0}
                    />
                </div>
            ))}

            <button onClick={prevSlide} className="absolute cursor-pointer left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-0.5 sm:p-2 rounded-xl shadow-lg z-20 transition">
                <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
            </button>

            <button onClick={nextSlide} className="absolute cursor-pointer right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white/60 hover:bg-white p-0.5 sm:p-2 rounded-xl shadow-lg z-20 transition">
                <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6 text-gray-800" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
