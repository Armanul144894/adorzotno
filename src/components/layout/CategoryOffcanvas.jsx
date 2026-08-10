"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
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

function MobileCategoryTree({
  items,
  level,
  expandedPath,
  setExpandedPath,
  onNavigate,
}) {
  if (!items?.length) return null;

  const toggleCategory = (category) => {
    setExpandedPath((currentPath) => {
      if (currentPath[level] === category.id) {
        return currentPath.slice(0, level);
      }

      const nextPath = currentPath.slice(0, level);
      nextPath[level] = category.id;
      return nextPath;
    });
  };

  return (
    <div
      className={
        level > 0
          ? "ml-5 border-l border-slate-200 pl-2"
          : "space-y-1"
      }
    >
      {items.map((category) => {
        const hasChildren = category.children?.length > 0;
        const isExpanded = expandedPath[level] === category.id;
        const iconUrl =
          level === 0 && category?.icon ? getImageUrl(category.icon) : null;

        return (
          <div key={category.id}>
            <div
              className={`group flex min-h-12 items-center gap-2 rounded-xl transition-colors duration-200 ${isExpanded ? "bg-sky-50" : "hover:bg-slate-50"
                }`}
            >
              <Link
                href={`/category/${category.slug}`}
                onClick={onNavigate}
                className="flex min-w-0 flex-1 items-center gap-3 px-2.5 py-2.5"
              >
                {iconUrl ? (
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl p-1 transition-colors duration-200 ${isExpanded
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary group-hover:bg-white"
                      }`}
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
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[10px] font-bold uppercase transition-colors duration-200 ${isExpanded
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary group-hover:bg-white"
                      }`}
                  >
                    {category.name?.slice(0, 2)}
                  </span>
                ) : (
                  <span
                    className={`ml-1 h-2 w-2 shrink-0 rounded-full transition-colors duration-200 ${isExpanded ? "bg-primary" : "bg-slate-300"
                      }`}
                  />
                )}

                <span
                  className={`min-w-0 flex-1 text-sm font-semibold leading-snug transition-colors duration-200 ${isExpanded ? "text-primary" : "text-slate-700"
                    }`}
                >
                  {category.name}
                </span>
              </Link>

              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => toggleCategory(category)}
                  aria-expanded={isExpanded}
                  aria-label={`${isExpanded ? "Close" : "Open"} ${category.name} subcategories`}
                  className={`mr-1.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all duration-200 active:scale-95 ${isExpanded
                    ? "bg-primary text-white shadow-sm"
                    : "bg-slate-100 text-slate-400 hover:bg-primary hover:text-white"
                    }`}
                >
                  <ChevronRight
                    size={18}
                    className={`transition-transform duration-300 ease-out ${isExpanded ? "rotate-90" : "rotate-0"
                      }`}
                  />
                </button>
              ) : null}
            </div>

            {hasChildren ? (
              <div
                className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isExpanded
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
                  }`}
              >
                <div className="overflow-hidden">
                  <div className="pb-1 pt-1">
                    <MobileCategoryTree
                      items={category.children}
                      level={level + 1}
                      expandedPath={expandedPath}
                      setExpandedPath={setExpandedPath}
                      onNavigate={onNavigate}
                    />
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

export default function CategoryOffcanvas({ sidebarOpen, setSidebarOpen }) {
  const [expandedPath, setExpandedPath] = useState([]);
  const {
    data: apiCategories = [],
    isLoading,
    isError,
    refetch,
  } = useGetCategoriesQuery(undefined, { skip: !sidebarOpen });

  const categories = useMemo(
    () => normalizeCategories(apiCategories),
    [apiCategories],
  );

  useEffect(() => {
    if (!sidebarOpen) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [sidebarOpen]);

  const closeSidebar = () => {
    setExpandedPath([]);
    setSidebarOpen(false);
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close category menu"
        onClick={closeSidebar}
        className={`fixed inset-0 z-[70] bg-slate-950/45 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden ${sidebarOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
          }`}
      />

      <aside
        aria-hidden={!sidebarOpen}
        className={`fixed inset-y-0 left-0 z-[80] flex h-[100dvh] w-[88vw] max-w-sm flex-col bg-white shadow-[20px_0_60px_rgba(15,23,42,0.22)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] lg:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="relative overflow-hidden bg-slate-900 px-4 pb-4 pt-[max(1rem,env(safe-area-inset-top))] text-white">
          <div className="absolute -right-10 -top-12 h-32 w-32 rounded-full border-[22px] border-sky-400/10" />
          <div className="relative flex min-h-12 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary">
              <Menu size={20} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-300">
                Shop by
              </p>
              <h2 className="text-lg font-bold">Categories</h2>
            </div>
            <button
              type="button"
              onClick={closeSidebar}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white active:scale-95"
              aria-label="Close category menu"
            >
              <X size={21} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-3 pb-[max(1rem,env(safe-area-inset-bottom))] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-300">
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 9 }).map((_, index) => (
                <div key={index} className="flex min-h-12 items-center gap-3 px-2.5 py-2.5">
                  <span className="h-9 w-9 animate-pulse rounded-xl bg-slate-100" />
                  <span className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
                </div>
              ))}
            </div>
          ) : null}

          {!isLoading && isError ? (
            <div className="flex h-full flex-col items-center justify-center px-5 text-center">
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
            <MobileCategoryTree
              items={categories}
              level={0}
              expandedPath={expandedPath}
              setExpandedPath={setExpandedPath}
              onNavigate={closeSidebar}
            />
          ) : null}

          {!isLoading && !isError && categories.length === 0 ? (
            <div className="flex h-full items-center justify-center px-5 text-center text-sm font-semibold text-slate-500">
              No categories available.
            </div>
          ) : null}
        </div>
      </aside>
    </>
  );
}
