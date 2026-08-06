"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { getImageUrl } from "@/lib/imageHelpers";
import { useGetCategoriesQuery } from "@/redux/features/category/categoryApi";

const normalizeCategories = (items = []) =>
  items
    .filter((category) => !category?.status || category.status === "active")
    .sort(
      (firstCategory, secondCategory) =>
        (firstCategory?.sort_order ?? 9999) -
        (secondCategory?.sort_order ?? 9999),
    )
    .map((category) => ({
      ...category,
      children: normalizeCategories(category?.children || []),
    }));

function CategoryLevel({ items, level, activePath, setActivePath, onClose }) {
  if (!items?.length) return null;

  const activeCategory = items.find(
    (category) => category.id === activePath[level],
  );

  const handleCategoryEnter = (category) => {
    setActivePath((currentPath) => {
      const nextPath = currentPath.slice(0, level);
      nextPath[level] = category.id;
      return nextPath;
    });
  };

  return (
    <div
      className={`category-menu-reveal ${level === 0
        ? "relative origin-top-left"
        : "absolute left-full top-0 origin-left before:absolute before:-left-2 before:top-0 before:h-full before:w-2"
        } h-[508px] min-w-52 rounded-md border border-slate-200/80 bg-white/95 py-2.5 pl-2.5 shadow-[0_20px_55px_rgba(15,23,42,0.18)] backdrop-blur-xl`}
    >
      <div className="h-full space-y-1 overflow-y-auto pr-2.5 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
        {items.map((category) => {
          const hasChildren = category.children?.length > 0;
          const isActive = activePath[level] === category.id;
          const iconUrl =
            level === 0 && category?.icon
              ? getImageUrl(category.icon)
              : null;

          return (
            <Link
              key={category.id}
              href={`/category/${category.slug}`}
              onMouseEnter={() => handleCategoryEnter(category)}
              onFocus={() => handleCategoryEnter(category)}
              onClick={onClose}
              className={`group/item relative flex items-center gap-2.5 overflow-hidden rounded-lg px-2.5 py-2 text-sm font-semibold transition-all duration-200 ease-out ${isActive
                ? "bg-gradient-to-r from-primary to-sky-500 text-white shadow-md shadow-primary/15"
                : "text-slate-700 hover:translate-x-0.5 hover:bg-sky-50 hover:text-primary"
                }`}
            >
              {iconUrl ? (
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg p-1 transition-all duration-200 ${isActive && "bg-white/[0.18]"}`}
                >
                  <Image
                    src={iconUrl}
                    alt=""
                    width={28}
                    height={28}
                    className="h-full w-full object-contain"
                    unoptimized
                  />
                </span>
              ) : level === 0 ? (
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold uppercase transition-all duration-200 ${isActive
                    ? "bg-white/[0.18] text-white"
                    : "bg-primary/10 text-primary group-hover/item:bg-white"
                    }`}
                >
                  {category.name?.slice(0, 2)}
                </span>
              ) : (
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full transition-all duration-200 ${isActive
                    ? "bg-white"
                    : "bg-slate-300 group-hover/item:scale-125 group-hover/item:bg-primary"
                    }`}
                />
              )}

              <span className="min-w-0 flex-1 leading-snug">
                {category.name}
              </span>

              {hasChildren ? (
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${isActive
                    ? "bg-white/15 text-white"
                    : "text-slate-500 group-hover/item:bg-white group-hover/item:text-primary"
                    }`}
                >
                  <ChevronRight
                    size={14}
                    className="transition-transform duration-200 group-hover/item:translate-x-0.5"
                  />
                </span>
              ) : null}
            </Link>
          );
        })}
      </div>

      {activeCategory?.children?.length ? (
        <CategoryLevel
          items={activeCategory.children}
          level={level + 1}
          activePath={activePath}
          setActivePath={setActivePath}
          onClose={onClose}
        />
      ) : null}
    </div>
  );
}

function CategoryMenuLoading() {
  return (
    <div className="h-[508px] min-w-52 rounded-md border border-slate-200/80 bg-white p-3 shadow-[0_20px_55px_rgba(15,23,42,0.18)]">
      <div className="space-y-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="flex items-center gap-2.5 px-1 py-1">
            <span className="h-8 w-8 animate-pulse rounded-lg bg-slate-100" />
            <span className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FiveLevelCategoryMenu({ isOpen, onClose }) {
  const [activePath, setActivePath] = useState([]);
  const {
    data: apiCategories = [],
    isLoading,
    isError,
    refetch,
  } = useGetCategoriesQuery(undefined, { skip: !isOpen });

  const categories = useMemo(
    () => normalizeCategories(apiCategories),
    [apiCategories],
  );

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-full z-50 mt-1 hidden lg:block">
      {isLoading ? <CategoryMenuLoading /> : null}

      {!isLoading && isError ? (
        <div className="flex h-[508px] min-w-52 flex-col items-center justify-center rounded-md border border-slate-200 bg-white p-5 text-center shadow-[0_20px_55px_rgba(15,23,42,0.18)]">
          <p className="text-sm font-semibold text-slate-700">
            Categories could not be loaded.
          </p>
          <button
            type="button"
            onClick={refetch}
            className="mt-3 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-white"
          >
            Try again
          </button>
        </div>
      ) : null}

      {!isLoading && !isError && categories.length > 0 ? (
        <CategoryLevel
          items={categories}
          level={0}
          activePath={activePath}
          setActivePath={setActivePath}
          onClose={onClose}
        />
      ) : null}

      {!isLoading && !isError && categories.length === 0 ? (
        <div className="flex h-[508px] min-w-52 items-center justify-center rounded-md border border-slate-200 bg-white p-5 text-center text-sm font-semibold text-slate-500 shadow-[0_20px_55px_rgba(15,23,42,0.18)]">
          No categories available.
        </div>
      ) : null}
    </div>
  );
}
