import React from "react";
import ProductCard from "../cards/ProductCard";

export default function FilteredProductCard({
  filteredProducts,
  isLoading = false,
  pagination = null,
  currentPage = 1,
  onPageChange = () => { },
}) {
  const totalPages = pagination?.last_page || 0;
  const buildVisiblePages = () => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = new Set([
      1,
      totalPages,
      Math.max(currentPage - 1, 1),
      currentPage,
      Math.min(currentPage + 1, totalPages),
    ]);

    return Array.from(pages)
      .filter((page) => page >= 1 && page <= totalPages)
      .sort((a, b) => a - b);
  };

  const visiblePages = buildVisiblePages();

  return (
    <div>
      {isLoading ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white"
            >
              <div className="h-40 animate-pulse bg-slate-100 lg:h-44" />
              <div className="space-y-3 p-3">
                <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
                <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
                <div className="h-5 w-1/3 animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredProducts?.length === 0 ? (
        <div className="py-16 text-center text-gray-500">No products found.</div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
            {filteredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {totalPages > 1 ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={!pagination.prev_page_url}
                onClick={() => onPageChange(currentPage - 1)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              {visiblePages.map((page, index) => {
                const isActive = page === currentPage;
                const previousPage = visiblePages[index - 1];
                const showEllipsis = index > 0 && page - previousPage > 1;

                return (
                  <React.Fragment key={page}>
                    {showEllipsis ? (
                      <span className="px-2 text-sm font-semibold text-slate-400">
                        ...
                      </span>
                    ) : null}
                    <button
                      type="button"
                      onClick={() => onPageChange(page)}
                      className={`h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition ${isActive
                        ? "border-primary bg-primary text-white"
                        : "border-slate-200 text-slate-600 hover:border-primary hover:text-primary"
                        }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}

              <button
                type="button"
                disabled={!pagination.next_page_url}
                onClick={() => onPageChange(currentPage + 1)}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-primary hover:text-primary disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
