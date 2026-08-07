"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { getImageUrl } from "@/lib/imageHelpers";
import { mapApiProductToCard } from "@/lib/mapApiProductToCard";
import {
  useGetCategoriesQuery,
  useGetCategoryProductsQuery,
} from "@/redux/features/category/categoryApi";
import FilteredProductCard from "./FilteredProductCard";
import Image from "next/image";

const flattenCategoryTree = (categories = []) =>
  categories.flatMap((category) => [
    category,
    ...flattenCategoryTree(category?.children || []),
  ]);

export default function ProductCategoryCard({ slug, initialPage = 1 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const { data: apiCategories = [], isLoading: isCategoriesLoading } =
    useGetCategoriesQuery();

  const flattenedCategories = useMemo(
    () => flattenCategoryTree(apiCategories),
    [apiCategories],
  );

  const selectedCategory = useMemo(() => {
    return flattenedCategories.find((category) => category.slug === slug);
  }, [flattenedCategories, slug]);

  const {
    data: categoryProductsResponse = {},
    isLoading: isProductsLoading,
    isFetching: isProductsFetching,
  } = useGetCategoryProductsQuery(
    {
      categorySlug: slug,
      page: currentPage,
      perPage: 20,
      sortBy: "created_at",
      sortOrder: "desc",
    },
    {
      skip: !slug,
    },
  );

  const categoryData = categoryProductsResponse?.category || selectedCategory;
  const productPagination = categoryProductsResponse?.products || null;

  const filteredProducts = useMemo(
    () =>
      (productPagination?.data || []).map((product) => ({
        ...mapApiProductToCard(product),
        category: product?.category?.name || categoryData?.name || "",
      })),
    [categoryData?.name, productPagination?.data],
  );

  const isLoading =
    isCategoriesLoading || isProductsLoading || isProductsFetching;

  const handlePageChange = (page) => {
    if (!productPagination?.last_page) {
      return;
    }

    const nextPage = Math.min(Math.max(page, 1), productPagination.last_page);

    if (nextPage === currentPage) {
      return;
    }

    setCurrentPage(nextPage);

    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (nextPage <= 1) {
      nextSearchParams.delete("page");
    } else {
      nextSearchParams.set("page", String(nextPage));
    }

    const nextQuery = nextSearchParams.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    router.push(nextUrl);
  };
  const categoryBannerUrl = getImageUrl(categoryData?.bg_image);

  return (
    <div>

      {/* Bg Image */}
      <div className="relative mb-3 h-28 overflow-hidden rounded-lg bg-slate-100 sm:h-36 md:h-48">
        <Image
          src={categoryBannerUrl}
          alt={(categoryData?.name || "Category") + " banner"}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 1200px"
          className="object-cover object-center"
          unoptimized
        />
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <button className="flex cursor-pointer items-center gap-1 hover:underline hover:underline-offset-2">
              <Home size={16} />
              Home
            </button>
          </Link>
          <ChevronRight size={16} />
          <div className="space-x-1">
            <span className="font-semibold">
              {categoryData?.name || "Category"}
            </span>
            <span className="text-sm">
              ({productPagination?.total ?? filteredProducts.length} items)
            </span>
          </div>
        </div>
      </div>

      <FilteredProductCard
        filteredProducts={filteredProducts}
        isLoading={isLoading}
        pagination={productPagination}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
