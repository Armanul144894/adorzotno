"use client"

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

// ── slugify ──────────────────────────────────────────────────────────────────
const slugify = (name) =>
    name
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");


export default function CategoryCard({ cat }) {
    return (
        <div>
            <Link
                href={`/category/${slugify(cat.name)}`}
                className="group relative block rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-40"
            >
                <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-4 text-white text-center px-2">
                    <div className="-mb-8 group-hover:mb-0 transition-all duration-300 flex flex-col items-center">
                        <span className="text-sm font-bold mt-1.5 drop-shadow tracking-wide leading-tight">
                            {cat.name}
                        </span>
                    </div>
                    <span className="mt-2 text-[10px] font-semibold bg-white/20 backdrop-blur-sm px-3 py-0.5 rounded-full opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        Shop →
                    </span>
                </div>
            </Link>
        </div>
    )
}
