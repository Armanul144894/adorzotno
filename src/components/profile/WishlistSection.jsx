"use client";

import { Heart } from "lucide-react";

export default function WishlistSection() {
  return (
    <div className="rounded-3xl border border-dashed border-gray-200 bg-gradient-to-br from-white to-slate-50 p-8 text-center sm:p-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Heart size={24} />
      </div>
      <h3 className="mt-5 text-xl font-bold text-slate-800">Wishlist Coming Soon</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        Saved products and favorites can live here later. The dashboard structure
        is already ready for that expansion.
      </p>
    </div>
  );
}
