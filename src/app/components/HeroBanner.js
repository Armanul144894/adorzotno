'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

export default function HeroBanner() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const heroSlides = [
        {
            id: 1,
            title: 'Slide 1',
            image: 'https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fsliders%2FMedeasy-website_slider.png&w=3840&q=100',
            bgColor: 'from-teal-500 via-teal-600 to-cyan-600'
        },
        {
            id: 2,
            title: 'Slide 2',
            image: 'https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fsliders%2FMedeasy-website-slider-for-innsaei.png&w=3840&q=100',
            bgColor: 'from-blue-500 via-blue-600 to-indigo-600'
        },
        {
            id: 3,
            title: 'Slide 3',
            image: 'https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fsliders%2FMedEasy-26.jpg&w=3840&q=100',
            bgColor: 'from-purple-500 via-purple-600 to-pink-600'
        }
    ];

    // Auto-advance slider
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };
    return (
        <div>
            {/* Hero Banner Slider */}
            <div className="relative rounded-lg overflow-hidden mb-6 h-full min-h-[200px] md:min-h-[300px] xl:min-h-[400px]">
                {heroSlides.map((slide, index) => (
                    <div
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <div className={`relative h-full bg-gradient-to-r ${slide.bgColor} text-white`}>
                            <div className=" h-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    width={2000}
                                    height={800}
                                    className="w-full h-full"
                                />
                            </div>
                            
                        </div>
                    </div>
                ))}

                {/* Navigation Buttons */}
                <button
                    onClick={prevSlide}
                    className="absolute cursor-pointer left-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition"
                >
                    <ChevronLeft size={24} className="text-gray-800" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute cursor-pointer right-1 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg z-20 transition"
                >
                    <ChevronRight size={24} className="text-gray-800" />
                </button>

                {/* Dots Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2 h-2 cursor-pointer rounded-full transition-all ${index === currentSlide ? 'bg-white w-8' : 'bg-white/50'
                                }`}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}
