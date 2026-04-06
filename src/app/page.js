import React from 'react'
import HeroBanner from '../components/HeroBanner'
import HomeFeatures from '../components/HomeFeatures'
import HomeCategories from '../components/HomeCategories'
import FeaturedDeals from '../components/FeaturedDeals'
import HomeCategoryProducts from '../components/HomeCategoryProducts'
import Newsletter from '../components/Newsletter'
import FlashSaleSection from '../components/FlashSaleSection'
import FlashDealSection from '../components/FlashDealSection'
import FAQSection from '../components/FAQSection'
import BrandSection from '../components/BrandSection'
import RecommendedSection from '../components/RecommendedSection'
import OccasionalSection from '../components/OccasionalSection'
import HomeOrderAgain from '../components/HomeOrderAgain'

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

        <HomeOrderAgain/>

        <FlashDealSection/>

        <RecommendedSection/>

        <HomeCategoryProducts/>

        
        {/* Featured Deals */}
        <FeaturedDeals />

        <OccasionalSection/>

        <BrandSection/>
    
        {/* Faq Section */}
        <FAQSection/>

        {/* Newsletter Section */}
        <Newsletter />
    
      </main >
    </div >
    </div>
  )
}
