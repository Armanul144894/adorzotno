import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ProductCard from "../cards/ProductCard";

export default function FilteredProductCard({ filteredProducts }) {
  return (
    <div>
      {filteredProducts?.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          No products found.
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-4">
          {filteredProducts?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
