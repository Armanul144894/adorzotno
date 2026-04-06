"use client";
import React from "react";
import products from "../../data/data";
import CategoryProduct from "./CategoryProductSlider";
import Image from "next/image";
import Link from "next/link";

export default function HomeCategoryProducts() {
  const allProducts = products;

  const productsByCategory = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) acc[product.category] = [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const banners = [
    { id: 1, image: "/images/banner/banner22.jpg", title: "Summer Health Sale", link: "#" },
    { id: 2, image: "/images/banner/banner222.jpg", title: "Wellness Essentials", link: "#" },
    { id: 3, image: "/images/banner/banner33.jpg", title: "Free Home Delivery", link: "#" },
    { id: 4, image: "/images/banner/banner444.jpg", title: "Special Offers", link: "#" },
    { id: 5, image: "/images/banner/banner11.jpg", title: "New Arrivals", link: "#" },
  ];

  const categoriesWithBanners = [];
  const categoryEntries = Object.entries(productsByCategory).slice(0,8);
  let bannerIndex = 0;
  let layoutToggle = 0;

  categoryEntries.forEach(([category, prods], index) => {
    categoriesWithBanners.push({ type: "category", category, products: prods });

    if ((index + 1) % 3 === 0 && index !== categoryEntries.length - 1) {
      if (layoutToggle % 2 === 0) {
        // Layout A: 2 small stacked left + 1 large right
        categoriesWithBanners.push({
          type: "banner-a",
          small1: banners[bannerIndex % banners.length],
          small2: banners[(bannerIndex + 1) % banners.length],
          large: banners[(bannerIndex + 2) % banners.length],
        });
        bannerIndex += 3;
      } else {
        // Layout B: small + small + wide (1:1:2 ratio)
        categoriesWithBanners.push({
          type: "banner-b",
          b1: banners[bannerIndex % banners.length],
          b2: banners[(bannerIndex + 1) % banners.length],
          b3: banners[(bannerIndex + 2) % banners.length],
        });
        bannerIndex += 3;
      }
      layoutToggle++;
    }
  });

  const BannerImg = ({ banner, sizes = "50vw" }) => (
    <Link href={banner.link} className="group block overflow-hidden m-0 p-0 rounded-xl">
      <Image
        src={banner.image}
        alt={banner.title}
        width={0}
        height={0}
        sizes={sizes}
        className="w-full h-full object-fill transition-transform duration-500 group-hover:scale-105"
      />
    </Link>
  );

  return (
    <div>
      {categoriesWithBanners.map((item, index) => {
        if (item.type === "category") {
          return <CategoryProduct key={item.category} category={item.category} products={item.products} />;
        }

        // Layout A: 2 small stacked left + 1 large right  (like Image 1)
        if (item.type === "banner-a") {
          return (
            <div key={`banner-a-${index}`} className="mb-8 grid gap-3" style={{ gridTemplateColumns: '1fr 2fr' }}>
              <div className="flex flex-col gap-3">
                <BannerImg banner={item.small1} sizes="25vw" />
                <BannerImg banner={item.small2} sizes="25vw" />
              </div>
              <BannerImg banner={item.large} sizes="50vw" />
            </div>
          );
        }

        // Layout B: small + small + wide  (like Image 2)
        if (item.type === "banner-b") {
          return (
            <div key={`banner-b-${index}`} className="mb-8 grid gap-3" style={{ gridTemplateColumns: '2fr 1fr' }}>
              <BannerImg banner={item.b3} sizes="50vw" />
              <div className="flex flex-col gap-3">
                <BannerImg banner={item.b1} sizes="25vw" />
                <BannerImg banner={item.b2} sizes="25vw" />
              </div>
            </div>
          );
        }
      })}
    </div>
  );
}