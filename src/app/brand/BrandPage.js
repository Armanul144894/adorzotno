'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  Grid3x3, 
  List, 
  TrendingUp, 
  Filter,
  ChevronDown,
  Package,
  Star,
  ArrowUpDown
} from 'lucide-react';

export default function BrandPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [sortBy, setSortBy] = useState('name-asc');
  const [filterBy, setFilterBy] = useState('all'); // 'all', 'popular', 'az'

  const brands = [
    {
      id: 1,
      name: 'Pfizer',
      slug: 'pfizer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Pfizer_logo.svg/2560px-Pfizer_logo.svg.png',
      products: 145,
      description: 'Leading pharmaceutical company',
      rating: 4.8,
      totalReviews: 12847,
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      founded: '1849',
      country: 'USA',
      specialties: ['Vaccines', 'Oncology', 'Cardiology']
    },
    {
      id: 2,
      name: 'Johnson & Johnson',
      slug: 'johnson-johnson',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Johnson_and_Johnson_Logo.svg/2560px-Johnson_and_Johnson_Logo.svg.png',
      products: 238,
      description: 'Healthcare innovation leader',
      rating: 4.7,
      totalReviews: 18934,
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100',
      founded: '1886',
      country: 'USA',
      specialties: ['Consumer Health', 'Medical Devices', 'Pharmaceuticals']
    },
    {
      id: 3,
      name: 'Bayer',
      slug: 'bayer',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Bayer_Logo.svg/2560px-Bayer_Logo.svg.png',
      products: 152,
      description: 'Science for a better life',
      rating: 4.6,
      totalReviews: 9876,
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      founded: '1863',
      country: 'Germany',
      specialties: ['Pain Relief', 'Cardiology', 'Women\'s Health']
    },
    {
      id: 4,
      name: 'GlaxoSmithKline',
      slug: 'glaxosmithkline',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/94/GSK_logo_2014.svg/2560px-GSK_logo_2014.svg.png',
      products: 187,
      description: 'Global healthcare company',
      rating: 4.7,
      totalReviews: 11234,
      bgColor: 'bg-orange-50',
      hoverColor: 'hover:bg-orange-100',
      founded: '2000',
      country: 'UK',
      specialties: ['Vaccines', 'Respiratory', 'HIV']
    },
    {
      id: 5,
      name: 'Abbott',
      slug: 'abbott',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Abbott_Laboratories_logo.svg/2560px-Abbott_Laboratories_logo.svg.png',
      products: 198,
      description: 'Life-changing technologies',
      rating: 4.8,
      totalReviews: 13567,
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      founded: '1888',
      country: 'USA',
      specialties: ['Nutrition', 'Diagnostics', 'Medical Devices']
    },
    {
      id: 6,
      name: 'Novartis',
      slug: 'novartis',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Novartis-Logo.svg/2560px-Novartis-Logo.svg.png',
      products: 134,
      description: 'Reimagining medicine',
      rating: 4.7,
      totalReviews: 10456,
      bgColor: 'bg-cyan-50',
      hoverColor: 'hover:bg-cyan-100',
      founded: '1996',
      country: 'Switzerland',
      specialties: ['Oncology', 'Immunology', 'Neuroscience']
    },
    {
      id: 7,
      name: 'Roche',
      slug: 'roche',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Hoffmann-La_Roche_logo.svg/2560px-Hoffmann-La_Roche_logo.svg.png',
      products: 176,
      description: 'Pioneering healthcare',
      rating: 4.9,
      totalReviews: 15678,
      bgColor: 'bg-pink-50',
      hoverColor: 'hover:bg-pink-100',
      founded: '1896',
      country: 'Switzerland',
      specialties: ['Oncology', 'Immunology', 'Diagnostics']
    },
    {
      id: 8,
      name: 'Merck',
      slug: 'merck',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/Merck_%26_Co.svg/2560px-Merck_%26_Co.svg.png',
      products: 143,
      description: 'Inventing for life',
      rating: 4.6,
      totalReviews: 8923,
      bgColor: 'bg-indigo-50',
      hoverColor: 'hover:bg-indigo-100',
      founded: '1891',
      country: 'USA',
      specialties: ['Vaccines', 'Oncology', 'Diabetes']
    },
    {
      id: 9,
      name: 'Sanofi',
      slug: 'sanofi',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Sanofi.svg/2560px-Sanofi.svg.png',
      products: 162,
      description: 'Healthcare solutions',
      rating: 4.7,
      totalReviews: 11890,
      bgColor: 'bg-teal-50',
      hoverColor: 'hover:bg-teal-100',
      founded: '1973',
      country: 'France',
      specialties: ['Diabetes', 'Cardiovascular', 'Vaccines']
    },
    {
      id: 10,
      name: 'AstraZeneca',
      slug: 'astrazeneca',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/AstraZeneca_logo.svg/2560px-AstraZeneca_logo.svg.png',
      products: 129,
      description: 'Science-led biopharmaceutical',
      rating: 4.8,
      totalReviews: 14234,
      bgColor: 'bg-yellow-50',
      hoverColor: 'hover:bg-yellow-100',
      founded: '1999',
      country: 'UK',
      specialties: ['Oncology', 'Cardiovascular', 'Respiratory']
    },
    {
      id: 11,
      name: 'Eli Lilly',
      slug: 'eli-lilly',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Eli_Lilly_and_Company.svg/2560px-Eli_Lilly_and_Company.svg.png',
      products: 118,
      description: 'Medicines that matter',
      rating: 4.7,
      totalReviews: 9567,
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100',
      founded: '1876',
      country: 'USA',
      specialties: ['Diabetes', 'Oncology', 'Immunology']
    },
    {
      id: 12,
      name: 'Bristol Myers Squibb',
      slug: 'bristol-myers-squibb',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Bristol_Myers_Squibb_Logo.svg/2560px-Bristol_Myers_Squibb_Logo.svg.png',
      products: 156,
      description: 'Transforming patients lives',
      rating: 4.6,
      totalReviews: 10234,
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      founded: '1887',
      country: 'USA',
      specialties: ['Oncology', 'Immunology', 'Cardiovascular']
    },
    {
      id: 13,
      name: 'Boehringer Ingelheim',
      slug: 'boehringer-ingelheim',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Boehringer_Ingelheim_Logo.svg/2560px-Boehringer_Ingelheim_Logo.svg.png',
      products: 142,
      description: 'Value through innovation',
      rating: 4.7,
      totalReviews: 8765,
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      founded: '1885',
      country: 'Germany',
      specialties: ['Respiratory', 'Cardiology', 'Oncology']
    },
    {
      id: 14,
      name: 'Takeda',
      slug: 'takeda',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Takeda_Pharmaceutical_Company_logo.svg/2560px-Takeda_Pharmaceutical_Company_logo.svg.png',
      products: 134,
      description: 'Better health, brighter future',
      rating: 4.8,
      totalReviews: 11234,
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      founded: '1781',
      country: 'Japan',
      specialties: ['Oncology', 'Gastroenterology', 'Neuroscience']
    },
    {
      id: 15,
      name: 'Amgen',
      slug: 'amgen',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Amgen.svg/2560px-Amgen.svg.png',
      products: 98,
      description: 'Serving patients',
      rating: 4.6,
      totalReviews: 7890,
      bgColor: 'bg-cyan-50',
      hoverColor: 'hover:bg-cyan-100',
      founded: '1980',
      country: 'USA',
      specialties: ['Oncology', 'Cardiovascular', 'Inflammation']
    },
    {
      id: 16,
      name: 'Teva Pharmaceutical',
      slug: 'teva-pharmaceutical',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Teva_Pharmaceutical_Industries_logo.svg/2560px-Teva_Pharmaceutical_Industries_logo.svg.png',
      products: 167,
      description: 'Generic medicines leader',
      rating: 4.5,
      totalReviews: 9456,
      bgColor: 'bg-blue-50',
      hoverColor: 'hover:bg-blue-100',
      founded: '1901',
      country: 'Israel',
      specialties: ['Generic Drugs', 'Specialty Medicines', 'Biosimilars']
    },
    {
      id: 17,
      name: 'Gilead Sciences',
      slug: 'gilead-sciences',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Gilead_Sciences_logo.svg/2560px-Gilead_Sciences_logo.svg.png',
      products: 89,
      description: 'Biopharmaceutical company',
      rating: 4.8,
      totalReviews: 10567,
      bgColor: 'bg-green-50',
      hoverColor: 'hover:bg-green-100',
      founded: '1987',
      country: 'USA',
      specialties: ['HIV/AIDS', 'Hepatitis', 'Oncology']
    },
    {
      id: 18,
      name: 'Biogen',
      slug: 'biogen',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Biogen_logo.svg/2560px-Biogen_logo.svg.png',
      products: 76,
      description: 'Neuroscience focused',
      rating: 4.7,
      totalReviews: 6789,
      bgColor: 'bg-purple-50',
      hoverColor: 'hover:bg-purple-100',
      founded: '1978',
      country: 'USA',
      specialties: ['Neurology', 'Multiple Sclerosis', 'Alzheimer\'s']
    },
    {
      id: 19,
      name: 'Moderna',
      slug: 'moderna',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Moderna_logo.svg/2560px-Moderna_logo.svg.png',
      products: 45,
      description: 'mRNA therapeutics',
      rating: 4.9,
      totalReviews: 15234,
      bgColor: 'bg-red-50',
      hoverColor: 'hover:bg-red-100',
      founded: '2010',
      country: 'USA',
      specialties: ['Vaccines', 'mRNA Technology', 'Infectious Diseases']
    },
    {
      id: 20,
      name: 'Regeneron',
      slug: 'regeneron',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Regeneron_Pharmaceuticals_logo.svg/2560px-Regeneron_Pharmaceuticals_logo.svg.png',
      products: 63,
      description: 'Biotechnology company',
      rating: 4.8,
      totalReviews: 8456,
      bgColor: 'bg-cyan-50',
      hoverColor: 'hover:bg-cyan-100',
      founded: '1988',
      country: 'USA',
      specialties: ['Oncology', 'Ophthalmology', 'Immunology']
    }
  ];

  // Filter brands based on search query
  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    brand.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort brands
  const sortedBrands = [...filteredBrands].sort((a, b) => {
    switch (sortBy) {
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      case 'products-high':
        return b.products - a.products;
      case 'products-low':
        return a.products - b.products;
      case 'rating-high':
        return b.rating - a.rating;
      case 'popular':
        return b.totalReviews - a.totalReviews;
      default:
        return 0;
    }
  });

  // Group brands alphabetically
  const groupedBrands = sortedBrands.reduce((acc, brand) => {
    const firstLetter = brand.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(brand);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary/80 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Shop by Brand
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              Discover trusted pharmaceutical brands and healthcare products from leading companies worldwide
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={24} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search brands..."
                className="w-full pl-14 pr-4 py-4 rounded-xl text-gray-800 text-lg focus:outline-none focus:ring-4 focus:ring-white/30 shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {brands.length}
              </div>
              <div className="text-sm text-gray-600">Total Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {brands.reduce((sum, b) => sum + b.products, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Products</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {(brands.reduce((sum, b) => sum + b.rating, 0) / brands.length).toFixed(1)}★
              </div>
              <div className="text-sm text-gray-600">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                100%
              </div>
              <div className="text-sm text-gray-600">Verified Brands</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <span className="text-gray-700 font-semibold">
                {sortedBrands.length} Brands
              </span>
              {searchQuery && (
                <span className="text-sm text-gray-500">
                  searching for "{searchQuery}"
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="flex-1 md:flex-none px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="name-asc">Name: A-Z</option>
                <option value="name-desc">Name: Z-A</option>
                <option value="products-high">Most Products</option>
                <option value="products-low">Least Products</option>
                <option value="rating-high">Highest Rated</option>
                <option value="popular">Most Popular</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Grid3x3 size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
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

        {/* No Results */}
        {sortedBrands.length === 0 && (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="mx-auto text-gray-300 mb-4" size={64} />
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              No brands found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search query
            </p>
            <button
              onClick={() => setSearchQuery('')}
              className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Grid View */}
        {viewMode === 'grid' && sortedBrands.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedBrands.map((brand) => (
              <Link key={brand.id} href={`/brand/${brand.slug}`}>
                <div className={`group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer border-2 border-transparent hover:border-primary/20 h-full flex flex-col`}>
                  {/* Logo Container */}
                  <div className={`${brand.bgColor} ${brand.hoverColor} p-8 flex items-center justify-center transition-all duration-300 relative`}>
                    <div className="relative w-full h-32 flex items-center justify-center">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={200}
                        height={100}
                        className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                    
                    {/* Product Count Badge */}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-primary shadow-md">
                      {brand.products}+ Products
                    </div>
                  </div>

                  {/* Brand Info */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                      {brand.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-1">
                      {brand.description}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="fill-yellow-400 text-yellow-400" size={18} />
                        <span className="font-bold text-gray-800">{brand.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({brand.totalReviews.toLocaleString()} reviews)
                      </span>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-600 pt-4 border-t">
                      <span>Founded {brand.founded}</span>
                      <span className="font-semibold">{brand.country}</span>
                    </div>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {brand.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={index}
                          className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold"
                        >
                          {specialty}
                        </span>
                      ))}
                      {brand.specialties.length > 2 && (
                        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-semibold">
                          +{brand.specialties.length - 2}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* View Products Button */}
                  <div className="p-6 pt-0">
                    <button className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all group-hover:shadow-lg">
                      View Products
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && sortedBrands.length > 0 && (
          <div className="space-y-4">
            {sortedBrands.map((brand) => (
              <Link key={brand.id} href={`/brand/${brand.slug}`}>
                <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/20 p-6">
                  <div className="flex gap-6">
                    {/* Logo */}
                    <div className={`${brand.bgColor} ${brand.hoverColor} rounded-xl p-6 flex items-center justify-center w-48 flex-shrink-0`}>
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={150}
                        height={75}
                        className="object-contain max-w-full max-h-full"
                        unoptimized
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-primary transition-colors">
                            {brand.name}
                          </h3>
                          <p className="text-gray-600 mb-2">{brand.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-primary mb-1">
                            {brand.products}
                          </div>
                          <div className="text-sm text-gray-500">Products</div>
                        </div>
                      </div>

                      {/* Rating & Reviews */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={18}
                                className={`${
                                  i < Math.floor(brand.rating)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-bold text-gray-800">{brand.rating}</span>
                        </div>
                        <span className="text-gray-500">
                          {brand.totalReviews.toLocaleString()} reviews
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600">
                          Founded {brand.founded}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600 font-semibold">
                          {brand.country}
                        </span>
                      </div>

                      {/* Specialties */}
                      <div className="flex flex-wrap gap-2">
                        {brand.specialties.map((specialty, index) => (
                          <span
                            key={index}
                            className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-semibold"
                          >
                            {specialty}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action */}
                    <div className="flex items-center">
                      <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-all whitespace-nowrap">
                        View Products
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}