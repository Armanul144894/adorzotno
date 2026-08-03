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
  PawPrint,
  Pill,
  ScanHeart,
  Smile,
  Sparkles,
  Tablets,
} from "lucide-react";
import { useState } from "react";
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

function CategoryLevel({ items, level, activePath, setActivePath, onClose }) {
  if (!items?.length || level >= MAX_LEVELS) return null;

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
          const hasChildren =
            category.children?.length > 0 && level + 1 < MAX_LEVELS;
          const isActive = activePath[level] === category.id;
          const CategoryIcon =
            level === 0
              ? firstLevelIcons[category.slug] || HeartPulse
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
              {CategoryIcon ? (
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ${isActive
                      ? "bg-white/[0.18] text-white"
                      : "bg-primary/10 text-primary group-hover/item:bg-white"
                    }`}
                >
                  <CategoryIcon size={16} strokeWidth={2.2} />
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

      {activeCategory?.children?.length && level + 1 < MAX_LEVELS ? (
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

export default function FiveLevelCategoryMenu({ isOpen, onClose }) {
  const [activePath, setActivePath] = useState([]);

  if (!isOpen) return null;

  return (
    <div className="absolute left-0 top-full z-50 mt-1 hidden lg:block">
      <CategoryLevel
        items={categories}
        level={0}
        activePath={activePath}
        setActivePath={setActivePath}
        onClose={onClose}
      />
    </div>
  );
}
