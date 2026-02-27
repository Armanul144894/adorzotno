"use client";
import React from "react";
import products from "../../../data/data";
import CategoryProduct from "./CategoryProductSlider";
import Image from "next/image";
import Link from "next/link";

export default function HomeCategoryProducts() {
  const allProducts = products;

  // Group products by category
  const productsByCategory = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});

  // Banner images configuration
  const banners = [
    {
      id: 1,
      image: "/images/banner/banner111.jpg",
      title: "Summer Health Sale",
      subtitle: "Up to 50% off on selected items",
      link: "/deals",
      bgColor: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      image: "/images/banner/banner222.jpg",
      title: "Wellness Essentials",
      subtitle: "Boost your immunity today",
      link: "/wellness",
      bgColor: "from-green-500 to-teal-500",
    },
    {
      id: 3,
      image: "/images/banner/banner333.jpg",
      title: "Free Home Delivery",
      subtitle: "On orders above $50",
      link: "/shipping",
      bgColor: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      image: "/images/banner/banner444.jpg",
      title: "Special Offers",
      subtitle: "Limited time deals",
      link: "/offers",
      bgColor: "from-orange-500 to-red-500",
    },
  ];

  // Insert banner pairs after every 4 categories
  const categoriesWithBanners = [];
  const categoryEntries = Object.entries(productsByCategory);
  let bannerIndex = 0;

  categoryEntries.forEach(([category, products], index) => {
    // Add category
    categoriesWithBanners.push({
      type: "category",
      category,
      products,
    });

    // Add banner pair after every 4 categories (not after the last one)
    if ((index + 1) % 4 === 0 && index !== categoryEntries.length - 1) {
      // Get two banners for the pair
      const banner1 = banners[bannerIndex % banners.length];
      const banner2 = banners[(bannerIndex + 1) % banners.length];
      
      categoriesWithBanners.push({
        type: "banner-pair",
        banners: [banner1, banner2]
      });
      
      bannerIndex += 2; // Move to next pair
    }
  });

  return (
    <div>
      {/* Category Sliders with Banners */}
      {categoriesWithBanners.map((item, index) => {
        if (item.type === "category") {
          return (
            <CategoryProduct
              key={item.category}
              category={item.category}
              products={item.products}
            />
          );
        } else if (item.type === "banner-pair") {
          return (
            <div key={`banner-pair-${index}`} className="mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* First Banner */}
                
                <Link  href={item.banners[0].link}
                  className="block relative rounded-xl overflow-hidden group"
                >
                  <div className="relative rounded h-48 md:h-64 lg:h-72">
                    <Image
                      src={item.banners[0].image}
                      alt={item.banners[0].title}
                      fill
                      className="object-cover rounded transition-transform duration-500 group-hover:scale-105"
                      priority={false}
                    />
                    {/* Optional: Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.banners[0].bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>
                </Link>

                {/* Second Banner */}
                
                 <Link href={item.banners[1].link}
                  className="block relative rounded-xl overflow-hidden group"
                >
                  <div className="relative rounded h-48 md:h-64 lg:h-72">
                    <Image
                      src={item.banners[1].image}
                      alt={item.banners[1].title}
                      fill
                      className="object-cover rounded transition-transform duration-500 group-hover:scale-105"
                      priority={false}
                    />
                    {/* Optional: Gradient Overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${item.banners[1].bgColor} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                  </div>
                </Link>
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}