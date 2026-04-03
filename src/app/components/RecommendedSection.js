import { ChevronRight, Heart, Star, TrendingUp } from "lucide-react";
import Image from "next/image";
import React from "react";
import products from "../../../data/data";
import ProductCard from "./ProductCard";
import Link from "next/link";

export default function RecommendedSection() {
  const recommendedProducts = products.slice(2, 18);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-gradient-to-r from-teal-500 to-cyan-500 p-2 rounded-lg">
            <TrendingUp className="text-white" size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Recommended For You
            </h2>
            <p className="text-sm text-gray-600">
              Personalized picks based on your interests
            </p>
          </div>
        </div>
        <Link
          href="#"
          className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/5"
        >
          View all <ChevronRight size={16} />
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4">
        {recommendedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
