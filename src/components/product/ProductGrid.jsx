'use client';
import { ShoppingCart, Heart, Star, Truck, Shield, Plus, Minus, Check, Share2, ChevronRight, Home } from "lucide-react";
import React, { useMemo, useState } from "react";
import Image from "next/image";
import ProductDetailsTab from "./ProductDetailsTab";

export default function ProductGrid({
    selectedProduct,
    selectedImage,
    setSelectedImage,
    quantity,
    incrementQuantity,
    decrementQuantity,
    activeTab,
    setActiveTab,
    genericName,
    alternativeBrandProducts = [],
}) {
    const [alternativeSort, setAlternativeSort] = useState("relevance");
    const [expandedAlternativesKey, setExpandedAlternativesKey] = useState("");

    const sortedAlternativeBrandProducts = useMemo(() => {
        const items = [...alternativeBrandProducts];
        if (alternativeSort === "price-low") {
            return items.sort((a, b) => a.price - b.price);
        }
        if (alternativeSort === "price-high") {
            return items.sort((a, b) => b.price - a.price);
        }
        return items;
    }, [alternativeBrandProducts, alternativeSort]);

    const alternativesViewKey = `${selectedProduct?.id || "product"}-${alternativeSort}-${alternativeBrandProducts.length}`;
    const showAllAlternatives = expandedAlternativesKey === alternativesViewKey;

    const visibleAlternativeBrandProducts = showAllAlternatives
        ? sortedAlternativeBrandProducts
        : sortedAlternativeBrandProducts.slice(0, 8);

    return (
        <div className="">
            <div className="grid xl:grid-cols-7 gap-4 mb-4">
                {/* Product Images */}
                <div className="xl:col-span-4">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
                        {/* Thumbnail Images */}
                        <div className="order-2 md:order-1 md:col-span-2">
                            <div className="flex gap-3 overflow-x-auto pb-1 md:max-h-[420] xl:max-h-[500px] md:flex-col md:gap-4 md:overflow-y-auto md:overflow-x-hidden [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-thumb]:bg-gray-300">
                                {selectedProduct?.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`shrink-0 bg-white rounded-lg overflow-hidden border transition-all md:w-full ${selectedImage === index
                                            ? "border-secondary"
                                            : "border-gray-200 hover:border-primary"
                                            }`}
                                    >

                                        <Image
                                            src={image}
                                            alt={`${selectedProduct?.name} ${index + 1}`}
                                            width={300}
                                            height={300}
                                            className="h-20 w-20 object-contain md:h-24 md:w-full"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Main Image */}
                        <div className="order-1 md:order-2 md:col-span-10 md:mb-4">
                            <div className="relative flex h-[320px] items-center justify-center overflow-hidden rounded-lg border bg-white p-4 md:h-[420px] xl:h-[500px]">
                                <Image
                                    src={selectedProduct?.images[selectedImage]}
                                    alt={selectedProduct?.name}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-contain p-4"
                                />
                                {selectedProduct?.discount && (
                                    <span className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                                        {selectedProduct?.discount}
                                    </span>
                                )}
                            </div>
                        </div>


                    </div>

                    <div className="mt-6 max-xl:hidden">
                        <ProductDetailsTab
                            selectedProduct={selectedProduct}
                            activeTab={activeTab}
                            setActiveTab={setActiveTab}
                        />
                    </div>
                </div>

                {/* Product Info */}
                <div className="xl:col-span-3">
                    <div className="bg-white rounded-lg border p-4">
                        {/* Category Badge */}
                        <span className="inline-block bg-teal-100 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                            {selectedProduct?.category}
                        </span>

                        {/* Product Name */}
                        <h1 className="text-3xl font-bold text-gray-800 mb-3">
                            {selectedProduct?.name}
                        </h1>

                        {/* Rating */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={18}
                                        className={`${i < Math.floor(selectedProduct?.rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-gray-600">
                                {selectedProduct?.rating} ({selectedProduct?.reviews} reviews)
                            </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-4xl font-bold text-primary">
                                ৳{selectedProduct?.price}
                            </span>
                            <span className="text-xl text-gray-400 line-through">
                                ৳{selectedProduct?.originalPrice}
                            </span>
                            <span className="bg-red-100 text-red-600 text-sm font-semibold px-3 py-1 rounded">
                                Save ৳{(selectedProduct?.originalPrice - selectedProduct?.price).toFixed(2)}
                            </span>
                        </div>

                        {/* Stock Status */}
                        <div className="mb-6">
                            {selectedProduct?.inStock ? (
                                <div className="flex items-center gap-2 text-green-600">
                                    <Check size={20} />
                                    <span className="font-semibold">
                                        In Stock ({selectedProduct?.stockCount} available)
                                    </span>
                                </div>
                            ) : (
                                <span className="text-red-600 font-semibold">
                                    Out of Stock
                                </span>
                            )}
                        </div>

                        {/* Short Description */}
                        <p className="text-gray-600 mb-6 leading-relaxed">
                            {selectedProduct?.description.substring(0, 200)}...
                        </p>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                                    <button
                                        onClick={decrementQuantity}
                                        className="p-3 hover:bg-gray-100 transition"
                                        disabled={quantity <= 1}
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <span className="px-6 py-2 font-semibold text-lg">
                                        {quantity}
                                    </span>
                                    <button
                                        onClick={incrementQuantity}
                                        className="p-3 hover:bg-gray-100 transition"
                                        disabled={quantity >= selectedProduct?.stockCount}
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <span className="text-gray-600">
                                    Total:{" "}
                                    <span className="font-bold text-primary">
                                        ৳{(selectedProduct?.price * quantity).toFixed(2)}
                                    </span>
                                </span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 mb-6">
                            <button className="max-sm:flex-1 bg-primary text-white sm:px-10 py-3 rounded-lg font-semibold hover:bg-secondary transition flex items-center justify-center gap-2">
                                <ShoppingCart size={20} />
                                Add to Cart
                            </button>
                            <button className="p-3 border-2 border-primary text-primary rounded-lg hover:bg-teal-50 transition">
                                <Heart size={24} />
                            </button>
                            <button className="p-3 border-2 border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition">
                                <Share2 size={24} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t">
                            {/* Product Meta */}
                            <div className="pt-6 space-y-2 text-sm">
                                <div className="flex gap-2">
                                    <span className="text-gray-600">SKU:</span>
                                    <span className="font-semibold text-gray-800">
                                        {selectedProduct?.sku}
                                    </span>
                                </div>
                                <div className="flex gap-2">
                                    <span className="text-gray-600">Manufacturer:</span>
                                    <span className="font-semibold text-primary">
                                        {selectedProduct?.manufacturer}
                                    </span>
                                </div>
                                {selectedProduct?.productType === "medicine" && genericName && (
                                    <div className="flex gap-2">
                                        <span className="text-gray-600">Generic:</span>
                                        <span className="font-semibold text-primary">
                                            {genericName}
                                        </span>
                                    </div>
                                )}
                            </div>
                            {/* Features */}
                            <div className="pt-6 space-y-3">
                                <div className="flex items-center gap-3">
                                    <Truck className="text-primary" size={24} />
                                    <div>
                                        <p className="font-semibold text-gray-800">Free Delivery</p>
                                        <p className="text-sm text-gray-600">On orders over ৳50</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Shield className="text-primary" size={24} />
                                    <div>
                                        <p className="font-semibold text-gray-800">
                                            Secure Payment
                                        </p>
                                        <p className="text-sm text-gray-600">
                                            100% secure transactions
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {selectedProduct?.productType === "medicine" &&
                            genericName &&
                            sortedAlternativeBrandProducts.length > 0 && (
                                <div>
                                    <div className="my-6 flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
                                        <h2 className="text-sm text-gray-500">
                                            Alternative Brands For <span className="text-black font-semibold">{selectedProduct?.name}</span>
                                        </h2>

                                        <select
                                            value={alternativeSort}
                                            onChange={(e) => setAlternativeSort(e.target.value)}
                                            className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                                        >
                                            <option value="relevance">Relevance</option>
                                            <option value="price-low">Price: Low to High</option>
                                            <option value="price-high">Price: High to Low</option>
                                        </select>
                                    </div>

                                    <div className="space-y-3">
                                        {visibleAlternativeBrandProducts.map((product) => (
                                            <div
                                                key={product.id}
                                                className="flex items-center gap-3 rounded-xl transition-all hover:border-primary/20 hover:shadow-sm"
                                            >
                                                <div className="relative h-10 w-10 sm:h-14 sm:w-14 overflow-hidden rounded-lg border bg-gray-50">
                                                    <Image
                                                        src={product.images[0]}
                                                        alt={product.name}
                                                        fill
                                                        sizes="96px"
                                                        className="object-cover"
                                                    />
                                                </div>

                                                <div className="min-w-0 flex-1">
                                                    <h3 className="line-clamp-2 text-sm sm:text-base font-semibold text-gray-800">
                                                        {product.name}
                                                    </h3>
                                                    <p className="mt-1 text-xs sm:text-sm text-gray-500">
                                                        By {product.manufacturer}
                                                    </p>
                                                </div>

                                                <div className="sm:text-right flex items-end gap-1">
                                                    <p className="text-lg sm:text-xl font-bold">
                                                        ৳{product.price}
                                                    </p>
                                                    <p className="text-xs sm:text-sm text-gray-400 line-through">
                                                        ৳{product.originalPrice}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {sortedAlternativeBrandProducts.length > 8 && !showAllAlternatives && (
                                        <div className="mt-5">
                                            <button
                                                onClick={() => setExpandedAlternativesKey(alternativesViewKey)}
                                                className="flex rounded-lg py-2.5 font-semibold text-primary"
                                            >
                                                View More <ChevronRight />
                                            </button>
                                        </div>
                                    )}

                                </div>
                            )}


                    </div>
                </div>
            </div>


        </div>
    );
}
