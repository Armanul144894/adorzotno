import React from "react";
import BrandProductsPage from "../../../components/brand/BrandProductsPage";

const normalizePage = (value) => {
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const readableName = slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

  return {
    title: `${readableName || "Brand"} Products | Adorzotno`,
    description: `Explore products, details, and offers from ${readableName || "this brand"}.`,
    keywords: `${readableName}, brand products, pharmacy brands, adorzotno`,
    openGraph: {
      title: `${readableName || "Brand"} Products | Adorzotno`,
      description: `Browse products from ${readableName || "this brand"} available now.`,
      type: "website",
    },
  };
}

export default async function page({ params, searchParams }) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const initialPage = normalizePage(resolvedSearchParams?.page);

  return (
    <div>
      <BrandProductsPage
        key={`${slug}-${initialPage}`}
        slug={slug}
        initialPage={initialPage}
      />
    </div>
  );
}
