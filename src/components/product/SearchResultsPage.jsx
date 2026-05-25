"use client";

import { Search } from "lucide-react";
import React, { useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mapApiProductToCard } from "@/lib/mapApiProductToCard";
import { useSearchProductsQuery } from "@/redux/features/product/productApi";
import FilteredProductCard from "../category/FilteredProductCard";

export default function SearchResultsPage({ initialQuery = "", initialPage = 1 }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(initialPage);

  const trimmedQuery = initialQuery.trim();

  const {
    data: searchResponse = {},
    isLoading,
    isFetching,
  } = useSearchProductsQuery(
    {
      query: trimmedQuery,
      page: currentPage,
      perPage: 20,
    },
    {
      skip: !trimmedQuery,
    },
  );

  const pagination = searchResponse || null;

  const searchResults = useMemo(
    () => (searchResponse?.data || []).map(mapApiProductToCard),
    [searchResponse?.data],
  );

  const handlePageChange = (page) => {
    if (!pagination?.last_page) {
      return;
    }

    const nextPage = Math.min(Math.max(page, 1), pagination.last_page);

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

    if (trimmedQuery) {
      nextSearchParams.set("q", trimmedQuery);
    }

    const nextQuery = nextSearchParams.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;

    router.push(nextUrl);
  };

  if (!trimmedQuery) {
    return (
      <div className="rounded-lg border border-dashed border-slate-200 bg-white py-16 text-center text-gray-500">
        Start typing in the header search to find products.
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-start gap-4 px-4 py-5 sm:px-6">
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80">
              Search Results
            </p>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Results for &quot;{trimmedQuery}&quot;
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              Showing {pagination?.from ?? 0}-{pagination?.to ?? searchResults.length} of{" "}
              {pagination?.total ?? searchResults.length} items
            </p>
          </div>
        </div>
      </div>

      <FilteredProductCard
        filteredProducts={searchResults}
        isLoading={isLoading || isFetching}
        pagination={pagination}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
