'use client';
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import products from "../../../public/data/data";
import flashDeals from "../../../public/data/flashDeals";
import ProductCarouselSection from "./ProductCarouselSection";
import ProductDetailsTab from "./ProductDetailsTab";
import ProductGrid from "./ProductGrid";

const allProducts = [...products, ...flashDeals];

const slugify = (value = "") =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function ProductDetails() {
  const { id } = useParams();
  const slug = slugify(id);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

  const selectedProduct = useMemo(
    () => allProducts.find((product) => slugify(product?.name) === slug),
    [slug],
  );

  const productsExcludingSelected = allProducts.filter(
    (product) => product?.name !== selectedProduct?.name,
  );

  const youMayAlsoLikeProducts = productsExcludingSelected
    .filter((product) => product?.rating >= 4.5)
    .slice(0, 12);

  const manufacturerProducts = productsExcludingSelected
    .filter((product) => product?.rating >= 4.5)
    .slice(4, 15);

  const frequentlyBoughtTogetherProducts = productsExcludingSelected
    .filter(
      (product) =>
        product?.category === selectedProduct?.category ||
        product?.manufacturer === selectedProduct?.manufacturer,
    )
    .slice(0, 12);

  const previouslyBrowsedProducts = [...productsExcludingSelected]
    .reverse()
    .slice(0, 12);

  const incrementQuantity = () => {
    if (quantity < selectedProduct.stockCount) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/">
          <button className="flex items-center gap-1 hover:text-primary cursor-pointer">
            <Home size={16} /> Home
          </button>
        </Link>
        <ChevronRight size={16} />
        <Link href={`/category/${slugify(selectedProduct?.category)}`}>
          <button className="hover:text-primary">{selectedProduct?.category}</button>
        </Link>
        <ChevronRight size={16} />
        <span className="text-gray-800">{selectedProduct?.name}</span>
      </div>

      <ProductGrid
        selectedProduct={selectedProduct}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        quantity={quantity}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="xl:hidden">
        <ProductDetailsTab
          selectedProduct={selectedProduct}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>


      <div className="bg-red-50">
        <ProductCarouselSection
          relatedProducts={youMayAlsoLikeProducts}
          title="You May Also Like"
          navKey="you-may-also-like"
        />
      </div>


      <ProductCarouselSection
        relatedProducts={manufacturerProducts}
        title={`More from ${selectedProduct?.manufacturer || "Incepta Pharmaceuticals Ltd."}`}
        navKey="more-from-manufacturer"
      />

      <div className="bg-sky-50">
        <ProductCarouselSection
          relatedProducts={frequentlyBoughtTogetherProducts}
          title="Frequently Bought Together"
          navKey="frequently-bought-together"
        />
      </div>

      <ProductCarouselSection
        relatedProducts={previouslyBrowsedProducts}
        title="Previously Browsed Items"
        navKey="previously-browsed-items"
      />
    </div>
  );
}
