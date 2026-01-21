
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function FeaturedDeals() {

  const featuredDeals = [
    {
      id: 1,
      title: "Winter Health Pack",
      description: "Complete immunity boost bundle",
      price: 39.99,
      originalPrice: 59.99,
      image:
        "https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fmedicines%2FBlack_Friday_Special_Offer_with_Podium_Product_Instagram_Post_15.png&w=640&q=100",
      badge: "SAVE 33%",
    },
    {
      id: 2,
      title: "Diabetes Care Kit",
      description: "Monitor + Test strips + Lancets",
      price: 79.99,
      originalPrice: 119.99,
      image:
        "https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fmedicines%2Fnormal-iYJBxNyKM76CFb9AlM40f8peduyRkJ.jpg&w=750&q=75",
      badge: "BEST SELLER",
    },
    {
      id: 3,
      title: "Diabetes Care Kit",
      description: "Monitor + Test strips + Lancets",
      price: 79.99,
      originalPrice: 119.99,
      image:
        "https://medeasy.health/_next/image?url=https%3A%2F%2Fapi.medeasy.health%2Fmedia%2Fmedicines%2Fnormal-5Di5ZBQiGjj1TcIWs6aydbGw7JUFFg.jpg&w=640&q=100",
      badge: "BEST SELLER",
    },
  ];
  return (
    <div>
      {/* Featured Deals */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Featured Deals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {featuredDeals.map((deal) => (
            <Link key={deal.id} href={`/category/${deal.title.toLowerCase()
              .replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}>
              <div
                className="bg-white h-full rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow relative"
              >
                <div className="relative">
                  <Image
                    src={deal.image}
                    alt={deal.title}
                    width={400}
                    height={300}
                    className="w-full h-72 object-contain"
                  />
                  <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {deal.badge}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">
                    {deal.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {deal.description}
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <span className="text-2xl font-bold text-teal-600">
                        ${deal.price}
                      </span>
                      <span className="text-gray-400 line-through ml-2">
                        ${deal.originalPrice}
                      </span>
                    </div>
                    <button className="bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition font-semibold">
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
