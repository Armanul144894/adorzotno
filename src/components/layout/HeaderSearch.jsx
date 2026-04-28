"use client";
import { Search } from "lucide-react";

export default function HeaderSearch() {
  return (
    <>
      <div className="flex flex-1 max-w-4xl">
        <div className="flex w-full relative">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-2 sm:py-3.5 shadow-sm bg-blue-50/50 border border-primary/40 rounded-l-lg focus:outline-none"
          />

          {/* Search Button */}
          <button className="px-4 bg-primary text-white rounded-r-lg flex items-center justify-center">
            <Search size={20} />
          </button>
        </div>
      </div>
    </>
  );
}