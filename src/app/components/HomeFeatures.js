import { Award, Clock, Shield, Truck } from 'lucide-react'
import React from 'react'

export default function HomeFeatures() {
  return (
    <div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-red-400 p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="bg-teal-100 p-3 rounded-full">
              <Truck className="text-primary" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text text-white">Free Shipping</h3>
              <p className="text-xs text-gray-200">On orders over $50</p>
            </div>
          </div>
          <div className="bg-orange-300 p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="bg-blue-100 p-3 rounded-full">
              <Shield className="text-blue-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text text-white">Secure Payment</h3>
              <p className="text-xs text-gray-200">100% protected</p>
            </div>
          </div>
          <div className="bg-blue-300 p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="bg-purple-100 p-3 rounded-full">
              <Clock className="text-purple-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text text-white">24/7 Support</h3>
              <p className="text-xs text-gray-200">Always available</p>
            </div>
          </div>
          <div className="bg-purple-300 p-4 rounded-lg shadow-sm flex items-center gap-3">
            <div className="bg-orange-100 p-3 rounded-full">
              <Award className="text-orange-600" size={24} />
            </div>
            <div>
              <h3 className="font-semibold text text-white">Quality Products</h3>
              <p className="text-xs text-gray-200">Certified & tested</p>
            </div>
          </div>
        </div>
    </div>
  )
}
