import { ChevronRight, Heart, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import products from '../../../data/data';

export default function RecommendedSection () {
    const recommendedProducts = products.slice(4, 16);

    return (
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-lg">
              <TrendingUp className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Recommended For You</h2>
              <p className="text-sm text-gray-600">Personalized picks based on your interests</p>
            </div>
          </div>
          <button className="text-teal-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
            View All <ChevronRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {recommendedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="relative">
                <Image height={200} width={400} src={product.images[0]} alt={product.name} className="w-full h-48 object-cover" />
                <span className="absolute top-2 right-2 bg-teal-500 text-white text-xs font-bold px-2 py-1 rounded">
                  {product.discount}
                </span>
                <button className="absolute top-2 left-2 bg-white p-2 rounded-full hover:bg-gray-100">
                  <Heart size={18} className="text-gray-600" />
                </button>
              </div>
              <div className="p-4">
                <span className="text-xs text-teal-600 font-semibold">{product.category}</span>
                <h3 className="font-semibold text-gray-800 mt-1 mb-2">{product.name}</h3>
                <div className="flex items-center gap-1 mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className={`${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl font-bold text-gray-800">${product.price}</span>
                  <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                </div>
                <button
                  className="w-full bg-primary text-white py-2 rounded-lg hover:bg-teal-700 transition font-semibold"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };
