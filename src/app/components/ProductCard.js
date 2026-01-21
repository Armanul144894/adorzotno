import { Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

export default function ProductCard({ product }) {
    return (
        <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden group flex-shrink-0 w-64">
            <Link key={product.id} href={`/product/${product.name.toLowerCase()
                .replace(/&/g, 'and')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '')}`}>
                <div

                    className="bg-white h-full rounded-lg shadow-md overflow-hidden"
                >

                    <Image
                        src={product.images[0]}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-60 object-cover"
                    />

                    <div className="p-4">
                        <h3 className="font-semibold">{product.name}</h3>

                        <div className="flex gap-1 my-2">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={14}
                                    className={
                                        i < Math.floor(product.rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                    }
                                />
                            ))}
                        </div>

                        <div className="flex gap-2 mb-3">
                            <span className="font-bold">${product.price}</span>
                            <span className="line-through text-gray-400">
                                ${product.originalPrice}
                            </span>
                        </div>

                        <button
                            className="w-full bg-teal-600 text-white py-2 rounded-lg"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>

            </Link>
        </div>
    );

}
