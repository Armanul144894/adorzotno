"use client";
import { ChevronRight, Zap } from "lucide-react";
import Link from "next/link";
import ProductCard from "../../cards/ProductCard";
import flashDeals from "../../../../public/data/flashDeals";

export default function FlashDealSection() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-semibold">Flash Deals</h2>
          <Zap className="text-red-500" size={24} />
        </div>

        <Link
          href="#"
          className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/5"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-3">
        {flashDeals.map((deal) => (
          <div key={deal.id}>
            <ProductCard product={deal} />
          </div>
        ))}
      </div>
    </div>
  );
}
