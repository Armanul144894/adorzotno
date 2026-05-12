"use client";

import { Package } from "lucide-react";

export default function OrdersSection() {
  return (
    <div className="rounded-3xl border border-dashed border-gray-200 bg-gradient-to-br from-white to-slate-50 p-8 text-center sm:p-12">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Package size={24} />
      </div>
      <h3 className="mt-5 text-xl font-bold text-slate-800">Orders Coming Soon</h3>
      <p className="mt-2 text-sm leading-6 text-slate-500">
        This section is ready for your future order history UI. Once connected,
        customers will be able to review purchases and track deliveries here.
      </p>
    </div>
  );
}
