"use client";

import Link from "next/link";
import {
  Accessibility,
  Activity,
  Baby,
  ChevronRight,
  Cross,
  Dumbbell,
  HeartHandshake,
  HeartPulse,
  HousePlus,
  Leaf,
  Menu,
  PawPrint,
  Pill,
  ScanHeart,
  Smile,
  Sparkles,
  Tablets,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import sampleResponse from "@/data/sampleCategories.json";

const categories = sampleResponse?.data?.categories || [];
const MAX_LEVELS = 5;

const firstLevelIcons = {
  medicine: Pill,
  "personal-care": Sparkles,
  "medical-devices": ScanHeart,
  "vitamins-supplements": Tablets,
  "mother-baby": Baby,
  "beauty-cosmetics": Sparkles,
  "dental-care": Smile,
  "first-aid": Cross,
  "sexual-wellness": HeartHandshake,
  "diabetes-care": Activity,
  "health-foods": Leaf,
  "fitness-nutrition": Dumbbell,
  "elderly-care": Accessibility,
  "home-healthcare": HousePlus,
  "pet-care": PawPrint,
};

function MobileCategoryTree({
  items,
  level,
  expandedPath,
  setExpandedPath,
  onNavigate,
}) {
  if (!items?.length || level >= MAX_LEVELS) return null;

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
        const hasChildren =
          category.children?.length > 0 && level + 1 < MAX_LEVELS;
        const isExpanded = expandedPath[level] === category.id;
        const CategoryIcon =
          level === 0
            ? firstLevelIcons[category.slug] || HeartPulse
            : null;

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
                {CategoryIcon ? (
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors duration-200 ${isExpanded
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary group-hover:bg-white"
                      }`}
                  >
                    <CategoryIcon size={17} strokeWidth={2.2} />
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
          <MobileCategoryTree
            items={categories}
            level={0}
            expandedPath={expandedPath}
            setExpandedPath={setExpandedPath}
            onNavigate={closeSidebar}
          />
        </div>
      </aside>
    </>
  );
}
