import Link from "next/link";
import { ChevronRight, Flame, Sparkles } from "lucide-react";
import allCategories from "../../../../public/data/category";
import CategoryCard from "@/components/cards/CategoryCard";

export default function HomePopularCategories() {
    const popularCategories = allCategories.slice(0, 8);

    return (
        <section className="mb-10 bg-gray-50/30 p-4 sm:p-5 border border-gray-200/20">
            <div className="mb-5 flex justify-between gap-4 lg:items-end lg:justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
                        Popular Categories
                    </h2>
                    <Flame className="text-orange-500" size={24} />
                </div>

                <Link
                    href="/category"
                    className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
                >
                    <span className="sm:hidden whitespace-nowrap">View all</span>
                    <span className="hidden sm:inline">Explore all categories</span>
                    <ChevronRight size={16} />
                </Link>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 2xl:grid-cols-8">
                {popularCategories.map((category, index) => (
                    <CategoryCard
                        key={category.id ?? `${category.name}-${index}`}
                        category={category}
                        index={index}
                    />
                ))}
            </div>
        </section>
    );
}
