"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { mapApiProductToCard } from "@/lib/mapApiProductToCard";
import {
  addPreviouslyBrowsedProduct,
  getPreviouslyBrowsedSnapshot,
  getPreviouslyBrowsedStorageKey,
  parsePreviouslyBrowsedSnapshot,
  subscribeToPreviouslyBrowsed,
} from "@/lib/previouslyBrowsedProducts";
import { productApi } from "@/redux/features/product/productApi";
import ProductCarouselSection from "./ProductCarouselSection";

const EMPTY_HISTORY_SNAPSHOT = "[]";

function LatestPreviouslyBrowsedProducts({ productSlugs }) {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);

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

      setProducts(
        latestProducts
          .filter(Boolean)
          .map(mapApiProductToCard),
      );
    });

    return () => {
      isActive = false;
    };
  }, [dispatch, productSlugs]);

  if (products.length === 0) return null;

  return (
    <ProductCarouselSection
      relatedProducts={products}
      title="Previously Browsed Items"
      navKey="previously-browsed-items"
    />
  );
}

export default function PreviouslyBrowsedItems({ currentProductSlug }) {
  const { user, isAuthenticated, isHydrated } = useSelector(
    (state) => state.auth,
  );

  const storageKey = useMemo(() => {
    if (!isHydrated) return null;
    if (isAuthenticated && !user?.id) return null;

    return getPreviouslyBrowsedStorageKey(
      isAuthenticated ? user.id : null,
    );
  }, [isAuthenticated, isHydrated, user?.id]);

  const getSnapshot = useCallback(
    () => getPreviouslyBrowsedSnapshot(storageKey),
    [storageKey],
  );
  const historySnapshot = useSyncExternalStore(
    subscribeToPreviouslyBrowsed,
    getSnapshot,
    () => EMPTY_HISTORY_SNAPSHOT,
  );

  useEffect(() => {
    if (!storageKey || !currentProductSlug) return;
    addPreviouslyBrowsedProduct(storageKey, currentProductSlug);
  }, [currentProductSlug, storageKey]);

  const productSlugs = useMemo(
    () =>
      parsePreviouslyBrowsedSnapshot(historySnapshot).filter(
        (slug) => slug !== currentProductSlug,
      ),
    [currentProductSlug, historySnapshot],
  );

  if (productSlugs.length === 0) return null;

  return (
    <LatestPreviouslyBrowsedProducts
      key={`${storageKey}:${productSlugs.join("|")}`}
      productSlugs={productSlugs}
    />
  );
}