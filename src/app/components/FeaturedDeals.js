
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import products from '../../../data/data';

export default function FeaturedDeals() {

  const featuredDeals =  products.slice(0, 8);
  return (
    <div>
      {/* Featured Deals */}
      <div className="p-5 md:p-10 bg-blue-200 mb-10 rounded">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Featured Deals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {featuredDeals.map((deal) => (
            <Link key={deal.id} href={`/product/${deal.name.toLowerCase()
              .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
              <div
                className="bg-white h-full rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow relative"
              >
                <div className="relative">
                  <Image
                    src={deal?.images[0]}
                    alt={deal?.name}
                    width={400}
                    height={300}
                    className="w-full h-72 object-contain"
                  />
                  {
                    deal?.discount &&  (
                      <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {deal?.discount}
                  </span>
                    )
                  }
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {deal?.name}
                  </h3>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-2xl font-bold text-primary">
                        ${deal?.price}
                      </span>
                      <span className="text-gray-400 line-through ml-2">
                        ${deal?.originalPrice}
                      </span>
                    </div>
                    <button className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition font-semibold">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>

            </Link>

          ))}
        </div>
      </div>
    </div>
  )
}
