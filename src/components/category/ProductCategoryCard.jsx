"use client";

import { ChevronRight, Heart, Home, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import products from "../../../public/data/data";
import allCategories from "../../../public/data/category";
import FilteredProductCard from "./FilteredProductCard";

export default function ProductCategoryCard() {
  const { id } = useParams(); // ✅ correct param

  const slug = id
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  /* ================= DATA ================= */
  const categories = allCategories;

  const allProducts = products;

  /* ================= LOGIC ================= */

  const selectedCategory = useMemo(() => {
    return categories.find(
      (c) =>
        c.name
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === slug,
    );
  }, [categories, slug]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(
      (p) =>
        p.category
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === slug,
    );
  }, [allProducts, slug]);

  /* ================= UI ================= */

  return (
    <div className="">
      {/* Breadcrumb */}

      {/* Category Header */}
      <div className="bg-gradient-to-r from-primary to-primary/80 rounded-md px-4 py-3 mb-6 text-white">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="flex items-center gap-1 hover:underline hover:underline-offset-2 cursor-pointer">
              <Home size={16} />
              Home
            </button>
          </Link>
          <ChevronRight size={16} />
          <div className="space-x-1">
            <span className="font-semibold">
              {selectedCategory?.name}
            </span>
            <span className="text-sm text-gray-100">
              ({filteredProducts.length} items)
            </span>
          </div>
        </div>
      </div>

      {/* Products Header */}
      {/* <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          {selectedCategory?.name}
          <span className="text-sm text-gray-500 ml-2">
            ({filteredProducts.length} items)
          </span>
        </h2>
      </div> */}

      {/* Products Grid */}
      <FilteredProductCard filteredProducts={filteredProducts} />
    </div>
  );
}
