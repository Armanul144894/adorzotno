'use client';
import React from 'react'
import products from '../../../data/data';
import CategoryProduct from './CategoryProductSlider';

export default function HomeCategoryProducts() {

    const allProducts = products;

  // Group products by category
  const productsByCategory = allProducts.reduce((acc, product) => {
    if (!acc[product.category]) {
      acc[product.category] = [];
    }
    acc[product.category].push(product);
    return acc;
  }, {});


  return (
    <div className="min-h-screen ">
      <div className="">

        {/* Category Sliders */}
        {Object.entries(productsByCategory).map(([category, products]) => (
          <CategoryProduct
            key={category}
            category={category}
            products={products}
          />
        ))}
      </div>

      
    </div>
  );
}
