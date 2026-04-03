"use client";
import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function HeaderSearch() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [open, setOpen] = useState(false);

  const categories = ["All", "Medicine", "Healthcare", "Lab Test", "Beauty"];

  return (
    <>
      <div className="flex flex-1 max-w-2xl">
        <div className="flex w-full relative">
          {/* Category Dropdown */}
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-1 px-4 py-4 shadow-sm bg-blue-50 border-2 border-red-600/40 rounded-l-lg text-sm font-medium"
            >
              {selectedCategory}
              <ChevronDown size={16} />
            </button>

            {open && (
              <ul className="absolute left-0 top-full z-50 w-40 bg-white border shadow-md">
                {categories.map((cat) => (
                  <li
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setOpen(false);
                    }}
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  >
                    {cat}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Search Input */}
          <input
            type="text"
            placeholder="Search for products..."
            className="w-full px-4 py-3 shadow-sm bg-blue-100 border-2 border-x border-l-0  border-primary/40 focus:outline-none"
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
