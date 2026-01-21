import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import allCategories from '../../../data/category'
import Image from 'next/image'

export default function page() {
    const categories = allCategories
  return (
    <div>
        {/* Categories Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Shop by Category
            </h2>
            <button className="text-teal-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
              View All <ChevronRight size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {categories.map((cat, index) => (
              <Link
                href={`/category/${cat.name
                  .toLowerCase()
                  .replace(/&/g, "and")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/(^-|-$)/g, "")}`}
                key={index}
              >
                <div className="bg-white h-full rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                  <div
                    className={`bg-teal-50 p-4 flex items-center justify-center h-32`}
                  >
                    <div className='text-6xl'>
                        {cat?.icon}
                    </div>
                  </div>
                  <div className="p-3 text-center">
                    <h3 className="font-semibold text-gray-800">
                      {cat.name}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
    </div>
  )
}
