'use client';
import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  Home, 
  Star, 
  Heart, 
  ShoppingCart,
  Filter,
  X,
  ChevronDown,
  Grid3x3,
  List,
  TrendingUp,
  Award,
  Shield,
  Package
} from 'lucide-react';
import ProductCard from './ProductCard';
import products from '../../../data/data';

export default function BrandProductsPage() {
  const params = useParams();
  const brandSlug = params?.brand || 'pfizer';

  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('popular');
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);

  // Brand data
  const brands = {
    'pfizer': {
      name: 'Pfizer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Pfizer_logo.svg/250px-Pfizer_logo.svg.png',
      banner: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=400&fit=crop',
      description: 'Pfizer Inc. is an American multinational pharmaceutical and biotechnology corporation headquartered in Manhattan, New York City. The company was established in 1849 and is one of the world\'s largest pharmaceutical companies.',
      founded: '1849',
      headquarters: 'New York, USA',
      employees: '83,000+',
      rating: 4.8,
      totalProducts: 145,
      totalReviews: 12847,
      certifications: ['FDA Approved', 'WHO GMP', 'ISO 9001'],
      specialties: ['Vaccines', 'Oncology', 'Cardiology', 'Immunology']
    },
    // Add more brands as needed
  };

  const currentBrand = brands[brandSlug] || brands['pfizer'];

  // Sample products - replace with your actual data
  const allProducts = products;

  // Get unique categories
  const categories = [...new Set(allProducts.map(p => p.category))];

  // Filter and sort products
  const filteredProducts = allProducts.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.id - a.id;
      default:
        return b.reviews - a.reviews;
    }
  });

  const toggleCategory = (category) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-primary flex items-center gap-1">
              <Home size={16} />
              Home
            </Link>
            <ChevronRight size={16} />
            <Link href="/brand" className="hover:text-primary">
              Brands
            </Link>
            <ChevronRight size={16} />
            <span className="text-gray-800 font-semibold">{currentBrand.name}</span>
          </div>
        </div>
      </div>

      {/* Brand Header */}
      <div className="bg-white border-b mb-6">
        <div className="container mx-auto px-4 py-8">
          {/* Brand Banner */}
          <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-6">
            <Image
              src={currentBrand.banner}
              alt={currentBrand.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-8">
                <div className="flex items-center gap-6">
                  <div className="bg-white rounded-2xl p-6 shadow-2xl">
                    <Image
                      src={currentBrand.logo}
                      alt={currentBrand.name}
                      width={120}
                      height={60}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <div className="text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">{currentBrand.name}</h1>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Star className="fill-yellow-400 text-yellow-400" size={18} />
                        {currentBrand.rating} Rating
                      </span>
                      <span>•</span>
                      <span>{currentBrand.totalProducts} Products</span>
                      <span>•</span>
                      <span>{currentBrand.totalReviews.toLocaleString()} Reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Brand Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* About */}
            <div className="md:col-span-2">
              <h2 className="text-xl font-bold text-gray-800 mb-3">About {currentBrand.name}</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {currentBrand.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {currentBrand.specialties.map((specialty, index) => (
                  <span key={index} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Company Info</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-1">Founded</p>
                  <p className="font-semibold text-gray-800">{currentBrand.founded}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Headquarters</p>
                  <p className="font-semibold text-gray-800">{currentBrand.headquarters}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Employees</p>
                  <p className="font-semibold text-gray-800">{currentBrand.employees}</p>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Certifications</h3>
              <div className="space-y-2">
                {currentBrand.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Shield className="text-green-600" size={16} />
                    <span className="text-sm text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <div className="flex items-center gap-2 text-green-700">
                  <Award size={20} />
                  <span className="text-sm font-semibold">Verified Seller</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex gap-6">
          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Filters</h3>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Reset Filters */}
              <button
                onClick={() => {
                  setSelectedCategories([]);
                  setPriceRange([0, 1000]);
                }}
                className="w-full py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
              >
                Reset Filters
              </button>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-bold text-gray-800">
                    {sortedProducts.length} Products
                  </h2>
                  {selectedCategories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {selectedCategories.map((cat) => (
                        <span
                          key={cat}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                        >
                          {cat}
                          <button onClick={() => toggleCategory(cat)}>
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setFilterOpen(true)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50"
                  >
                    <Filter size={18} />
                    Filters
                  </button>

                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest</option>
                  </select>

                  {/* View Mode */}
                  <div className="hidden md:flex gap-2">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded-lg ${
                        viewMode === 'grid'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Grid3x3 size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded-lg ${
                        viewMode === 'list'
                          ? 'bg-primary text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <List size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {sortedProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <Package className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h3>
                <p className="text-gray-600 mb-6">Try adjusting your filters</p>
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 1000]);
                  }}
                  className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div
                className={
                  viewMode === 'grid'
                    ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'
                    : 'space-y-4'
                }
              >
                {sortedProducts.map((product) => (
                  <div key={product.id}>
                    {viewMode === 'grid' ? (
                      <ProductCard product={product} />
                    ) : (
                      <div className="bg-white rounded-lg shadow-md p-4 flex gap-4 hover:shadow-xl transition">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={150}
                          height={150}
                          className="rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <span className="text-xs text-primary font-semibold">
                                {product.category}
                              </span>
                              <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                            </div>
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                              <Heart size={20} className="text-gray-600" />
                            </button>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  size={14}
                                  className={
                                    i < Math.floor(product.rating)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              ({product.reviews} reviews)
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-2xl font-bold text-gray-800">
                                  ${product.price}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                  ${product.originalPrice}
                                </span>
                                <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-1 rounded">
                                  {product.discount}% OFF
                                </span>
                              </div>
                              <span className="text-sm text-green-600 font-semibold">In Stock</span>
                            </div>
                            <button className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition">
                              <ShoppingCart size={20} />
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {filterOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-white shadow-2xl overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Filters</h3>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category)}
                        onChange={() => toggleCategory(category)}
                        className="w-4 h-4 text-primary rounded"
                      />
                      <span className="text-sm text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-700 mb-3">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 1000]);
                  }}
                  className="w-full py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Reset Filters
                </button>
                <button
                  onClick={() => setFilterOpen(false)}
                  className="w-full py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition"
                >
                  Show {sortedProducts.length} Products
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}