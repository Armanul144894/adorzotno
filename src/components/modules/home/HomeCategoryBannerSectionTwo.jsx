"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const banners = [
  {
    id: 4,
    image: "/images/banner/banner55.jpg",
    title: "Special Offers",
    link: "#",
  },
  {
    id: 5,
    image: "/images/banner/banner11.jpg",
    title: "New Arrivals",
    link: "#",
  },
  {
    id: 6,
    image: "/images/banner/banner33.jpg",
    title: "Wellness Picks",
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

export default function HomeCategoryBannerSectionTwo() {
  return (
    <div className="mb-8 grid gap-3" style={{ gridTemplateColumns: "2fr 1fr" }}>
      <BannerImg banner={banners[2]} sizes="50vw" />
      <div className="flex flex-col gap-3">
        <BannerImg banner={banners[0]} sizes="25vw" />
        <BannerImg banner={banners[1]} sizes="25vw" />
      </div>
    </div>
  );
}
