"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Menu, X } from "lucide-react";
import { getImageUrl } from "@/lib/imageHelpers";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";

export default function CategoryOffcanvas({ sidebarOpen, setSidebarOpen }) {
  const { data: apiCategories = [], isLoading } = useGetCategoriesQuery();

  const categories = useMemo(() => {
    return apiCategories
      .filter((category) => (category?.status ? category.status === "active" : true))
      .sort((a, b) => (a?.sort_order ?? 9999) - (b?.sort_order ?? 9999));
  }, [apiCategories]);

  const handleCategoryClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:hidden top-0 left-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-primary text-white">
            <div className="flex items-center gap-3">
              <Menu size={24} />
              <div>
                <h2 className="text-xl font-bold">Categories</h2>
                <p className="text-sm text-teal-100">Browse all categories</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-teal-700 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Category List */}
          <div className="flex-1 overflow-y-auto py-6 space-y-2">
            {isLoading ? (
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-6 py-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 animate-pulse rounded-lg bg-slate-100" />
                    <div className="space-y-2">
                      <div className="h-4 w-28 animate-pulse rounded bg-slate-100" />
                      <div className="h-3 w-16 animate-pulse rounded bg-slate-100" />
                    </div>
                  </div>
                  <div className="h-5 w-5 animate-pulse rounded bg-slate-100" />
                </div>
              ))
            ) : (
              categories?.map((category) => {
                const iconUrl = category?.icon ? getImageUrl(category.icon) : null;

                return (
                  <Link
                    key={category.id}
                    href={`/category/${category.slug}`}
                    onClick={handleCategoryClick}
                    className="flex items-center justify-between px-6 py-3 transition group hover:bg-sky-50"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg ${iconUrl ? "bg-transparent" : "bg-slate-100"
                          }`}
                      >
                        {iconUrl ? (
                          <Image
                            src={iconUrl}
                            alt={category.name}
                            width={40}
                            height={40}
                            className="h-full w-full object-cover"
                            unoptimized
                          />
                        ) : (
                          <span className="text-sm font-bold text-primary">
                            {category?.name?.slice(0, 2)?.toUpperCase()}
                          </span>
                        )}
                      </span>

                      <div className="min-w-0">
                        <span className="block truncate font-bold text-gray-700 group-hover:text-primary">
                          {category.name}
                        </span>
                        <span className="block text-xs text-slate-500">
                          {category.children?.length > 0
                            ? `${category.children.length} subcategories`
                            : "Explore products"}
                        </span>
                      </div>
                    </div>

                    <span className="rounded text-slate-400 transition group-hover:text-primary">
                      <ChevronRight size={18} />
                    </span>
                  </Link>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
