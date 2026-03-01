import { ChevronRight, Heart, Star, TrendingUp } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import products from '../../../data/data';
import ProductCard from './ProductCard';

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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4">
          {recommendedProducts.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      </div>
    );
  };
