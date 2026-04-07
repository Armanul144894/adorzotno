"use client";
import { ChevronRight, Clock, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCart } from "../context/CartContext";
import ProductCard from "./cards/ProductCard";

const flashDeals = [
  {
    id: 101,
    name: "Multivitamin Bundle Pack",
    price: 24.99,
    originalPrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    discount: "38% OFF",
    dealEnds: "2 hours left",
    images: [
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 102,
    name: "First Aid Emergency Kit",
    price: 34.99,
    originalPrice: 54.99,
    image:
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
    discount: "36% OFF",
    dealEnds: "5 hours left",
    images: [
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
    ],
  },
  // {
  //   id: 103,
  //   name: "Immunity Booster Combo",
  //   price: 29.99,
  //   originalPrice: 44.99,
  //   image:
  //     "https://images.unsplash.com/photo-1550572017-4845a78b5f2f?w=400&h=300&fit=crop",
  //   discount: "33% OFF",
  //   dealEnds: "3 hours left",
  //   images: [
  //     "https://images.unsplash.com/photo-1550572017-4845a78b5f2f?w=400&h=300&fit=crop",
  //   ],
  // },
  {
    id: 104,
    name: "Pain Relief Value Pack",
    price: 19.99,
    originalPrice: 32.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    discount: "39% OFF",
    dealEnds: "4 hours left",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 105,
    name: "Pain Relief Value Pack",
    price: 19.99,
    originalPrice: 32.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    discount: "39% OFF",
    dealEnds: "4 hours left",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 106,
    name: "First Aid Emergency Kit",
    price: 34.99,
    originalPrice: 54.99,
    image:
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
    discount: "36% OFF",
    dealEnds: "5 hours left",
    images: [
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 107,
    name: "Pain Relief Value Pack",
    price: 19.99,
    originalPrice: 32.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    discount: "39% OFF",
    dealEnds: "4 hours left",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 108,
    name: "Pain Relief Value Pack",
    price: 19.99,
    originalPrice: 32.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    discount: "39% OFF",
    dealEnds: "4 hours left",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 109,
    name: "Pain Relief Value Pack",
    price: 19.99,
    originalPrice: 32.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    discount: "39% OFF",
    dealEnds: "4 hours left",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 110,
    name: "First Aid Emergency Kit",
    price: 34.99,
    originalPrice: 54.99,
    image:
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
    discount: "36% OFF",
    dealEnds: "5 hours left",
    images: [
      "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 111,
    name: "Pain Relief Value Pack",
    price: 19.99,
    originalPrice: 32.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    discount: "39% OFF",
    dealEnds: "4 hours left",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 112,
    name: "Multivitamin Bundle Pack",
    price: 24.99,
    originalPrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    discount: "38% OFF",
    dealEnds: "2 hours left",
    images: [
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 113,
    name: "Pain Relief Value Pack",
    price: 19.99,
    originalPrice: 32.99,
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    discount: "39% OFF",
    dealEnds: "4 hours left",
    images: [
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 114,
    name: "Multivitamin Bundle Pack",
    price: 24.99,
    originalPrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    discount: "38% OFF",
    dealEnds: "2 hours left",
    images: [
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 115,
    name: "Multivitamin Bundle Pack",
    price: 24.99,
    originalPrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    discount: "38% OFF",
    dealEnds: "2 hours left",
    images: [
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    ],
  },
  {
    id: 116,
    name: "Multivitamin Bundle Pack",
    price: 24.99,
    originalPrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    discount: "38% OFF",
    dealEnds: "2 hours left",
    images: [
      "https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=400&h=300&fit=crop",
    ],
  },
];

export default function FlashDealSection() {
  const { addToCart, getItemQuantity, updateQuantity, removeItem } = useCart();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl md:text-2xl font-semibold">Flash Deals</h2>
          <Zap className="text-red-500" size={24} />
        </div>

        <Link
          href="#"
          className="text-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm border border-primary/30 px-3 py-1.5 rounded-full hover:bg-primary/5"
        >
          View All <ChevronRight size={16} />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 2xl:grid-cols-8 gap-3">
        {flashDeals.map((deal) => {
          const quantity = getItemQuantity(deal.id);
          return (
            <div key={deal.id}>
              <ProductCard product={deal} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
