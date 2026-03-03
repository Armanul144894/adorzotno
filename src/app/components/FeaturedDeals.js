import Image from "next/image";
import Link from "next/link";
import React from "react";
import products from "../../../data/data";
import { ChevronRight, Zap } from "lucide-react";
import ProductCard from "./ProductCard";

export default function FeaturedDeals() {
  const featuredDeals = products.slice(0, 14);
  return (
    <div>
      {/* Featured Deals */}
      <div className="mb-10 rounded">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-primary to-blue-500 p-2 rounded-lg">
              <Zap className="text-white" size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-primary">
                Featured Deals
              </h2>
              <p className="text-sm text-gray-600">
                Best deals of the day - Do not miss out!
              </p>
            </div>
          </div>
          <Link
            href="#"
            className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/5"
          >
            View Orders <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-7 gap-4">
          {featuredDeals.map((deal) => (
            <ProductCard key={deal.id} product={deal} />
          ))}
        </div>
      </div>
    </div>
  );
}
