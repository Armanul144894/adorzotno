"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "../../cards/ProductCard";
import { mapApiProductToCard } from "@/lib/mapApiProductToCard";
import { useGetOrdersQuery } from "@/redux/features/order/orderApi";
import { productApi } from "@/redux/features/product/productApi";

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="h-40 animate-pulse bg-slate-100 lg:h-44" />
      <div className="space-y-3 p-3">
        <div className="h-4 w-3/4 animate-pulse rounded bg-slate-100" />
        <div className="h-4 w-1/2 animate-pulse rounded bg-slate-100" />
        <div className="h-5 w-1/3 animate-pulse rounded bg-slate-100" />
      </div>
    </div>
  );
}

function OrderAgainSection({ products = [], isLoading = false }) {
  if (!isLoading && products.length === 0) return null;

  return (
    <section className="group/category mb-8 w-full">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold sm:text-xl md:text-2xl">
            Order Again
          </h2>
          <RotateCcw className="text-primary" size={24} />
        </div>

        <Link
          href="/profile?tab=orders"
          className="flex items-center gap-1 rounded-full border border-primary/30 px-3 py-1.5 text-sm font-semibold text-primary transition-all hover:gap-2 hover:bg-primary/5"
        >
          View Orders <ChevronRight size={16} />
        </Link>
      </div>

      <div className="relative">
        {!isLoading && products.length > 0 ? (
          <>
            <button
              className="order-again-prev absolute -left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-primary/85 text-white shadow-md opacity-0 transition-all duration-300 group-hover/category:translate-x-0 group-hover/category:opacity-100 md:translate-x-3"
              aria-label="Previous"
            >
              <ChevronLeft size={18} strokeWidth={3} />
            </button>
            <button
              className="order-again-next absolute -right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-primary/85 text-white shadow-md opacity-0 transition-all duration-300 group-hover/category:translate-x-0 group-hover/category:opacity-100 md:-translate-x-3"
              aria-label="Next"
            >
              <ChevronRight size={18} strokeWidth={3} />
            </button>
          </>
        ) : null}

        {isLoading ? (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        ) : (
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: ".order-again-prev",
              nextEl: ".order-again-next",
            }}
            spaceBetween={12}
            slidesPerView={2}
            observer
            observeParents
            watchOverflow
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1224: { slidesPerView: 5 },
              1400: { slidesPerView: 6 },
            }}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id} className="h-auto py-4">
                <ProductCard product={product} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </section>
  );
}

function LatestOrderedProducts({ productSlugs }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const requests = productSlugs.map((productSlug) =>
      dispatch(
        productApi.endpoints.getProduct.initiate(
          { productSlug },
          { forceRefetch: true, subscribe: false },
        ),
      ),
    );

    Promise.all(
      requests.map((request) => request.unwrap().catch(() => null)),
    ).then((latestProducts) => {
      if (!isActive) return;

      setProducts(latestProducts.filter(Boolean).map(mapApiProductToCard));
      setIsLoading(false);
    });

    return () => {
      isActive = false;
    };
  }, [dispatch, productSlugs]);

  return <OrderAgainSection products={products} isLoading={isLoading} />;
}

export default function HomeOrderAgain() {
  const { isAuthenticated, isHydrated } = useSelector((state) => state.auth);
  const { data: ordersResponse, isLoading } = useGetOrdersQuery(
    {
      page: 1,
      perPage: 10,
    },
    {
      skip: !isHydrated || !isAuthenticated,
      refetchOnMountOrArgChange: true,
    },
  );

  const orderedProductSlugs = useMemo(() => {
    const uniqueSlugs = new Set();

    (ordersResponse?.data || []).forEach((order) => {
      order?.items?.forEach((item) => {
        const productSlug = item?.sku?.product?.slug;
        if (productSlug) uniqueSlugs.add(productSlug);
      });
    });

    return Array.from(uniqueSlugs).slice(0, 14);
  }, [ordersResponse]);

  if (!isHydrated || !isAuthenticated) return null;
  if (isLoading) return <OrderAgainSection isLoading />;
  if (orderedProductSlugs.length === 0) return null;

  return (
    <LatestOrderedProducts
      key={orderedProductSlugs.join("|")}
      productSlugs={orderedProductSlugs}
    />
  );
}
