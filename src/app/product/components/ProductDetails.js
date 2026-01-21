'use client';
import {
  ShoppingCart,
  Heart,
  Star,
  Truck,
  Shield,
  Plus,
  Minus,
  Check,
  Share2,
  ChevronRight,
  Home,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useMemo, useState } from "react";
import products from "../../../../data/data";
import RelatedProduct from "./RelatedProduct";
import ProductDetailsTab from "./ProductDetailsTab";
import ProductGrid from "./ProductGrid";

export default function ProductDetails() {
  const { id } = useParams(); // ✅ correct param
  const slug = id
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState("description");

const allProducts = products;
  

  const selectedProduct = useMemo(() => {
    return allProducts.find(
      (p) =>
        p?.name
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === slug
    );
  }, [slug]);

  const category = selectedProduct?.category.toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");


  const relatedProducts = useMemo(() => {
    if (!category || !selectedProduct) return [];
    return allProducts.filter(
      (p) =>
        p?.category
          .toLowerCase()
          .replace(/&/g, "and")
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "") === category
    );
  }, [category]);


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
          <Link href={"/"}>
            <button className="flex items-center gap-1 hover:text-teal-600 cursor-pointer">
              <Home size={16} /> Home
            </button>
          </Link>
          <ChevronRight size={16} />
          <Link
            href={`/category/${selectedProduct?.category
              .toLowerCase()
              .replace(/&/g, "and")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/(^-|-$)/g, "")}`}
          >
            <button className="hover:text-teal-600">{selectedProduct?.category}</button>
          </Link>
          <ChevronRight size={16} />
          <span className="text-gray-800">{selectedProduct?.name}</span>
        </div>

        <ProductGrid selectedProduct={selectedProduct} selectedImage={selectedImage} setSelectedImage={setSelectedImage} quantity={quantity} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity}/>

        {/* Product Details Tabs */}
        <ProductDetailsTab
          selectedProduct={selectedProduct}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        {/* Related Products */}
        <RelatedProduct relatedProducts={relatedProducts}/>
        
      </div>
  );
}
