import { ChevronRight, Home, LayoutGrid } from "lucide-react";
import Link from "next/link";
import React from "react";
import allCategories from "../../../public/data/category";
import CategoryCard from "@/components/cards/CategoryCard";

export const metadata = {
  title: "All Categories | Adorzotno Limited",
  description:
    "Secure contact at Adorzotno Limited. Complete your order with safe payment options and fast delivery.",
  keywords: [
    "category",
    "adorzotno",
    "online pharmacy category",
    "secure payment",
    "medical products order",
  ],
};

export default function page() {
  const categories = allCategories;
  return (
    <div>
      {/* Categories Section */}
      <div className="mb-8">
        <div className="mb-6 overflow-hidden rounded-[28px] bg-gradient-to-br from-white via-slate-50 to-primary/5 p-5 shadow-sm md:p-6">
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1.5 font-medium text-slate-600 transition-colors hover:text-primary"
            >
              <Home size={16} />
              Home
            </Link>
            <ChevronRight size={16} className="text-slate-300" />
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1.5 font-semibold text-primary">
              <LayoutGrid size={16} />
              Categories
            </span>
          </div>

          <div className="mt-4">
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              All Categories
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              Browse every health, wellness, and pharmacy category in one place
              to quickly find the products you need.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
          {categories.map((category, index) => (
            <CategoryCard
              key={category.id ?? `${category.name}-${index}`}
              category={category}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
