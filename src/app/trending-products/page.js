import React from "react";
import TrendingProductsPage from "@/components/product/TrendingProductsPage";

export const metadata = {
  title: "Trending Products | Adorzotno",
  description:
    "Explore the products that are trending now on Adorzotno.",
  keywords: "trending products, popular products, adorzotno",
  openGraph: {
    title: "Trending Products | Adorzotno",
    description: "Browse the products customers are trending right now.",
    type: "website",
  },
};

export default function page() {
  return (
    <div>
      <TrendingProductsPage />
    </div>
  );
}
