"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Grid2x2 } from "lucide-react";

const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function HeaderCategoryMenu({ isOpen, onClose, categories }) {
  if (!isOpen) return null;

  const featuredCategories = categories.slice(0, 3);
  const categoryColumns = [categories.slice(0, 10), categories.slice(10, 20)];

  return (
    <div className="absolute left-0 top-full z-50 mt-1 hidden w-[min(92vw,760px)] max-w-[760px] overflow-hidden border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.16)] lg:block">
      <div className="grid max-h-[min(78vh,680px)] xl:grid-cols-[1.35fr_0.95fr]">
        <div className="border-b border-slate-100 p-5 xl:max-h-[min(78vh,680px)] xl:overflow-y-auto xl:border-b-0 xl:border-r xl:border-slate-100 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Shop Faster
              </p>
              <h3 className="mt-1 text-lg font-bold text-slate-900">
                Explore by category
              </h3>
            </div>
            <Link
              href="/category"
              onClick={onClose}
              className="inline-flex items-center gap-1 rounded-full border border-primary/20 px-3 py-1.5 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-white"
            >
              View all
              <ChevronRight size={16} />
            </Link>
          </div>

          <div className="grid gap-x-3 gap-y-2 md:grid-cols-2">
            {categoryColumns.map((column, columnIndex) => (
              <div key={columnIndex} className="space-y-2">
                {column.map((category) => (
                  <Link
                    key={category.id}
                    href={`/category/${slugify(category.name)}`}
                    onClick={onClose}
                    className="group/item flex items-center justify-between rounded-lg px-3 py-2.5 transition-all duration-300 hover:bg-gradient-to-r hover:from-primary/20 hover:to-primary/10"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-lg">
                        {category.icon}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-slate-800 transition-colors group-hover/item:text-primary">
                          {category.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {category.count}+ products
                        </p>
                      </div>
                    </div>
                    <ChevronRight
                      size={16}
                      className="shrink-0 text-slate-300 transition-all duration-300 group-hover/item:translate-x-0.5 group-hover/item:text-primary"
                    />
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-100 via-white to-primary/5 p-5 xl:max-h-[min(78vh,680px)] xl:overflow-y-auto [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-gray-300">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
            Trending Picks
          </p>
          <div className="mt-4 space-y-3">
            {featuredCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${slugify(category.name)}`}
                onClick={onClose}
                className="group/card block overflow-hidden border border-white bg-white p-2 shadow-md rounded-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="relative h-28 overflow-hidden rounded-lg bg-slate-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="220px"
                    className="object-cover transition-transform duration-500 group-hover/card:scale-105"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      category.color || "from-primary to-secondary"
                    } opacity-65`}
                  />
                </div>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-slate-900">
                      {category.name}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      {category.count}+ items
                    </p>
                  </div>
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition-all duration-300 group-hover/card:border-primary group-hover/card:bg-primary group-hover/card:text-white">
                    <Grid2x2 size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
