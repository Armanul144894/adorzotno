import React from 'react'
import HeroBanner from './components/HeroBanner'
import HomeFeatures from './components/HomeFeatures'
import HomeCategories from './components/HomeCategories'
import FeaturedDeals from './components/FeaturedDeals'
import HomeCategoryProducts from './components/HomeCategoryProducts'
import Newsletter from './components/Newsletter'

export default function page() {
  return (
    <div>
      <div className="min-h-screen">
      {/* Main Content */}
      <main className="">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Features */}
        <HomeFeatures />

        {/* Categories Section */}
        <HomeCategories />

        {/* Featured Deals */}
        <FeaturedDeals />

        <HomeCategoryProducts/>

        {/* Newsletter Section */}
        <Newsletter />
      </main >
    </div >
    </div>
  )
}
