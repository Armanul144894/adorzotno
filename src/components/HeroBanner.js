'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroSlides = [
        { id: 1, title: 'Slide 1', image: '/images/banner/banner11.jpg' },
        { id: 2, title: 'Slide 2', image: '/images/banner/banner22.jpg' },
        { id: 3, title: 'Slide 3', image: '/images/banner/banner33.jpg' },
        { id: 4, title: 'Slide 4', image: '/images/banner/banner111.jpg' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

    return (
        <div className="relative w-full rounded-lg overflow-hidden mb-6">
            {heroSlides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`transition-opacity duration-1000 ${
                        index === currentSlide ? 'opacity-100 relative' : 'opacity-0 absolute inset-0'
                    }`}
                >
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="w-full h-auto"
                        priority={index === 0}
                    />
                </div>
            ))}

            <button onClick={prevSlide} className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition">
                <ChevronLeft size={24} className="text-gray-800" />
            </button>

            <button onClick={nextSlide} className="absolute cursor-pointer right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition">
                <ChevronRight size={24} className="text-gray-800" />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                {heroSlides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                            index === currentSlide ? 'bg-white w-8' : 'bg-white/50 w-2'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}