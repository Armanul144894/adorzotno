"use client";

import { ChevronRight, Heart, Home, Star } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo } from "react";
import products from "../../../../data/data";
import allCategories from "../../../../data/category";
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
          .replace(/(^-|-$)/g, "") === slug
    );
  }, [slug]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(
      (p) =>
        p.category
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === slug
    );
  }, [slug]);


  /* ================= UI ================= */

  return (
    <div className="">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
          <Link href="/">
            <button
              className="flex items-center gap-1 hover:text-teal-600 cursor-pointer"
            >
              <Home size={16} />
              Home
            </button>
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-800 font-semibold">
            {selectedCategory?.name}
          </span>
        </div>

        {/* Category Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg p-8 mb-6 text-white">
          <div className="flex items-center gap-4">
            <div className="text-6xl">{selectedCategory?.icon}</div>
            <div>
              <h1 className="text-4xl font-bold mb-2">
                {selectedCategory?.name}
              </h1>
              <p className="text-teal-100">
                Explore our wide range of {selectedCategory?.name} products
              </p>
            </div>
          </div>
        </div>

        {/* Products Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCategory?.name}
            <span className="text-sm text-gray-500 ml-2">
              ({filteredProducts.length} items)
            </span>
          </h2>
        </div>

        {/* Products Grid */}
        <FilteredProductCard filteredProducts={filteredProducts} />
      </div>
  );
}
 