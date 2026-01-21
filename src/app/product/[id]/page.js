import React from 'react'
import ProductDetails from '../components/ProductDetails'
import products from '../../../../data/data';


// ✅ Metadata generation function (export this)
export async function generateMetadata({ params }) {
  const {id} = await params;
  const slug = id
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const product = products.find(
    (p) =>
      p.name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "") === slug
  );

  return {
    title: `${product?.name || "Product"} - Shop Our Collection`,
    description: `Explore our wide range of ${product?.name || "Products"} with items available. Find the best deals and quality products.`,
    keywords: `${product?.name}, products, shop, online store, buy ${product?.name}`,
    openGraph: {
      title: `${product?.name || "Product"} - Shop Our Collection`,
      description: `Browse ${product?.name || "Products"} available now`,
      type: "website",
    },
  };

}

export default function page() {
  return (
    <div>
      <ProductDetails/>
    </div>
  )
}
