import Image from "next/image";
import Link from "next/link";
import React from "react";
import products from "../../../../public/data/data";
import { ChevronRight, Zap } from "lucide-react";
import ProductCard from "../../cards/ProductCard";

export default function FeaturedDeals() {
  const featuredDeals = products.slice(0, 14);
  return (
    <div>
      {/* Featured Deals */}
      <div className="mb-10 rounded">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl md:text-2xl font-semibold">
              Featured Deals
            </h2>
            <Zap className="text-orange-500" size={24} />
          </div>

          <Link
            href="#"
            className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/5"
          >
            View all <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6 gap-3">
          {featuredDeals.map((deal) => (
            <ProductCard key={deal.id} product={deal} />
          ))}
        </div>
      </div>
    </div>
  );
}
