import React from 'react'
import ProductCategoryCard from '../../../components/category/ProductCategoryCard';
import allCategories from '../../../../public/data/category';
import products from '../../../../public/data/data';

// ✅ Metadata generation function (export this)
export async function generateMetadata({ params }) {
  const {id} = await params;
  const slug = id
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const category = allCategories.find(
    (c) =>
      c.name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === slug
  );
  const productCount = products.filter(
    (p) =>
      p.category
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === slug
  ).length;


  return {
    title: `${category?.name || "Category"} - Shop Our Collection`,
    description: `Explore our wide range of ${category?.name || "products"} with ${productCount} items available. Find the best deals and quality products.`,
    keywords: `${category?.name}, products, shop, online store, buy ${category?.name}`,
    openGraph: {
      title: `${category?.name || "Category"} - Shop Our Collection`,
      description: `Browse ${productCount} ${category?.name || "products"} available now`,
      type: "website",
    },
  };
}
export default function page() {
  return (
    <div>
      <ProductCategoryCard/>
    </div>
  )
}
