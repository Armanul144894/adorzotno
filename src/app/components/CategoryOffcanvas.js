import React from 'react'
import Link from 'next/link'
import { ChevronRight, Menu, X } from 'lucide-react'
import allCategories from "../../../data/category";

export default function CategoryOffcanvas({ sidebarOpen, setSidebarOpen }) {

  const categories = allCategories;

  const handleCategoryClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed lg:hidden top-0 left-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex flex-col h-full">

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b bg-primary text-white">
            <div className="flex items-center gap-3">
              <Menu size={24} />
              <div>
                <h2 className="text-xl font-bold">Categories</h2>
                <p className="text-sm text-teal-100">Browse all categories</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 hover:bg-teal-700 rounded-lg"
            >
              <X size={24} />
            </button>
          </div>

          {/* Category List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-2">
            {categories?.map((category, index) => {
              const slug = category.name
                .toLowerCase()
                .replace(/&/g, "and")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

              return (
                <Link
                  key={index}
                  href={`/category/${slug}`}
                  onClick={handleCategoryClick}
                  className="flex items-center justify-between py-2 rounded-lg hover:bg-teal-50 transition group"
                >
                  <div className="flex items-center gap-3">
                    <div className='w-8 mx-auto'><span className="text-2xl">{category.icon}</span></div>
                    <span className="text-gray-700 group-hover:text-primary font-bold">
                      {category.name}
                    </span>
                  </div>
                  <span className="text-xs px-2 py-1 rounded">
                    <ChevronRight />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
