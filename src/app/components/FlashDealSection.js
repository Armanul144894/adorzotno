import { ChevronRight, Clock, Zap } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

export default function FlashDealSection () {
    const flashDeals = [
      {
        id: 101,
        name: 'Multivitamin Bundle Pack',
        price: 24.99,
        originalPrice: 39.99,
        image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop',
        discount: '38% OFF',
        dealEnds: '2 hours left'
      },
      {
        id: 102,
        name: 'First Aid Emergency Kit',
        price: 34.99,
        originalPrice: 54.99,
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop',
        discount: '36% OFF',
        dealEnds: '5 hours left'
      },
      {
        id: 103,
        name: 'Immunity Booster Combo',
        price: 29.99,
        originalPrice: 44.99,
        image: 'https://images.unsplash.com/photo-1550572017-4845a78b5f2f?w=400&h=300&fit=crop',
        discount: '33% OFF',
        dealEnds: '3 hours left'
      },
      {
        id: 104,
        name: 'Pain Relief Value Pack',
        price: 19.99,
        originalPrice: 32.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
        discount: '39% OFF',
        dealEnds: '4 hours left'
      },
      {
        id: 105,
        name: 'Pain Relief Value Pack',
        price: 19.99,
        originalPrice: 32.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
        discount: '39% OFF',
        dealEnds: '4 hours left'
      },
      {
        id: 106,
        name: 'First Aid Emergency Kit',
        price: 34.99,
        originalPrice: 54.99,
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop',
        discount: '36% OFF',
        dealEnds: '5 hours left'
      },
      {
        id: 107,
        name: 'Pain Relief Value Pack',
        price: 19.99,
        originalPrice: 32.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
        discount: '39% OFF',
        dealEnds: '4 hours left'
      },
      {
        id: 108,
        name: 'Pain Relief Value Pack',
        price: 19.99,
        originalPrice: 32.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
        discount: '39% OFF',
        dealEnds: '4 hours left'
      },
      {
        id: 109,
        name: 'Pain Relief Value Pack',
        price: 19.99,
        originalPrice: 32.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
        discount: '39% OFF',
        dealEnds: '4 hours left'
      },
      {
        id: 110,
        name: 'First Aid Emergency Kit',
        price: 34.99,
        originalPrice: 54.99,
        image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop',
        discount: '36% OFF',
        dealEnds: '5 hours left'
      },
      {
        id: 111,
        name: 'Pain Relief Value Pack',
        price: 19.99,
        originalPrice: 32.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
        discount: '39% OFF',
        dealEnds: '4 hours left'
      },
      {
        id: 112,
        name: 'Multivitamin Bundle Pack',
        price: 24.99,
        originalPrice: 39.99,
        image: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop',
        discount: '38% OFF',
        dealEnds: '2 hours left'
      },
    ];

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-orange-500 to-red-500 p-2 rounded-lg">
              <Zap className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Flash Deals</h2>
              <p className="text-sm text-gray-600">Best deals of the day - Do not miss out!</p>
            </div>
          </div>
          <button className="text-teal-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          {flashDeals.map((deal) => (
            <div key={deal.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition border-2 border-orange-200">
              <div className="relative">
                <Image height={200} width={400} src={deal.image} alt={deal.name} className="w-full h-48 object-cover" />
                <span className="absolute top-3 right-3 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                  {deal.discount}
                </span>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-orange-600 flex items-center gap-1">
                  <Clock size={14} />
                  {deal.dealEnds}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2">{deal.name}</h3>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl font-bold text-orange-600">${deal.price}</span>
                  <span className="text-sm text-gray-400 line-through">${deal.originalPrice}</span>
                </div>
                <button
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:from-orange-600 hover:to-red-600 transition"
                >
                  Grab Deal Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };