"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useMemo } from "react";
import { mapApiProductToCard } from "@/lib/mapApiProductToCard";
import {
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
} from "@/redux/features/category/categoryApi";
import ProductCard from "../../cards/ProductCard";

const getOccasionalCategories = (categories = []) =>
  categories
    .filter(
      (category) =>
        (!category?.status || category.status === "active") &&
        (category?.parent_id === null || category?.parent_id === undefined),
    )
    .sort(
      (firstCategory, secondCategory) =>
        (firstCategory?.sort_order ?? 9999) -
        (secondCategory?.sort_order ?? 9999),
    )
    .slice(8, 10);

function CategoryCollection({ category }) {
  const {
    data: categoryProductsResponse = {},
    isLoading,
    isFetching,
    isError,
  } = useGetCategoryProductsQuery(
    {
      categorySlug: category.slug,
      perPage: 6,
      sortBy: "created_at",
      sortOrder: "desc",
    },
    { refetchOnMountOrArgChange: true },
  );

  const categoryProducts = useMemo(
    () =>
      (categoryProductsResponse?.products?.data || [])
        .map(mapApiProductToCard)
        .slice(0, 6),
    [categoryProductsResponse?.products?.data],
  );

  if (!isLoading && !isFetching && (isError || categoryProducts.length === 0)) {
    return null;
  }

  return (
    <section className="mb-8">
      <div className="rounded-t-lg bg-gradient-to-r from-primary/20 to-blue-50 px-4 py-2">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold sm:text-xl md:text-2xl">
            {category.name}
          </h2>

          <Link
            href={`/category/${category.slug}`}
            className="flex shrink-0 items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-semibold text-primary transition hover:bg-gray-100 sm:px-6 sm:text-sm"
          >
            Shop Collection
            <ChevronRight size={16} />
          </Link>
        </div>
      </div>

      <div className="rounded-b-lg bg-white p-3 shadow-md sm:p-6">
        {isLoading || isFetching ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-lg border border-slate-200 bg-white"
              >
                <div className="h-40 animate-pulse bg-slate-100 lg:h-44" />
                <div className="space-y-3 p-3">
                  <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                  <div className="h-5 w-1/2 animate-pulse rounded bg-slate-100" />
                  <div className="h-8 animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function OccasionalSectionSkeleton() {
  return (
    <div className="mb-8 space-y-8">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index}>
          <div className="h-14 animate-pulse rounded-t-lg bg-slate-100" />
          <div className="grid grid-cols-2 gap-3 rounded-b-lg bg-white p-3 shadow-md sm:p-6 md:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
            {Array.from({ length: 6 }).map((__, productIndex) => (
              <div
                key={productIndex}
                className="h-72 animate-pulse rounded-lg bg-slate-100"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function OccasionalSection() {
  const { data: apiCategories = [], isLoading } = useGetCategoriesQuery(
    undefined,
    { refetchOnMountOrArgChange: true },
  );

  const categories = useMemo(
    () => getOccasionalCategories(apiCategories),
    [apiCategories],
  );

  if (isLoading) return <OccasionalSectionSkeleton />;
  if (categories.length === 0) return null;

  return (
    <div className="mb-8">
      {categories.map((category) => (
        <CategoryCollection key={category.id} category={category} />
      ))}
    </div>
  );
}
