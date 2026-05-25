"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const banners = [
  {
    id: 1,
    image: "/images/banner/banner22.jpg",
    title: "Summer Health Sale",
    link: "#",
  },
  {
    id: 2,
    image: "/images/banner/banner33.jpg",
    title: "Wellness Essentials",
    link: "#",
  },
  {
    id: 3,
    image: "/images/banner/banner5.png",
    title: "Free Home Delivery",
    link: "#",
  },
];

const BannerImg = ({ banner, sizes = "50vw" }) => (
  <Link
    href={banner.link}
    className="group block overflow-hidden rounded-xl"
  >
    <Image
      src={banner.image}
      alt={banner.title}
      width={0}
      height={0}
      sizes={sizes}
      className="h-full w-full object-fill transition-transform duration-500 group-hover:scale-105"
    />
  </Link>
);

export default function HomeCategoryBannerSectionOne() {
  return (
    <div className="mb-8 grid gap-3" style={{ gridTemplateColumns: "1fr 2fr" }}>
      <div className="flex flex-col gap-3">
        <BannerImg banner={banners[0]} sizes="25vw" />
        <BannerImg banner={banners[1]} sizes="25vw" />
      </div>
      <BannerImg banner={banners[2]} sizes="50vw" />
    </div>
  );
}
