import { Check, Star } from 'lucide-react'
import React from 'react'

export default function ProductDetailsTab({selectedProduct, activeTab, setActiveTab}) {
  return (
    <div>
        {/* Product Details Tabs */}
        <div className="bg-white rounded-lg shadow-md mb-12">
          {/* Tab Headers */}
          <div className="border-b">
            <div className="flex flex-wrap">
              <button
                onClick={() => setActiveTab("description")}
                className={`px-6 py-4 font-semibold transition ${activeTab === "description"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600 hover:text-teal-600"
                  }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("dosage")}
                className={`px-6 py-4 font-semibold transition ${activeTab === "dosage"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600 hover:text-teal-600"
                  }`}
              >
                Dosage & Usage
              </button>
              <button
                onClick={() => setActiveTab("warnings")}
                className={`px-6 py-4 font-semibold transition ${activeTab === "warnings"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600 hover:text-teal-600"
                  }`}
              >
                Warnings
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`px-6 py-4 font-semibold transition ${activeTab === "reviews"
                  ? "text-teal-600 border-b-2 border-teal-600"
                  : "text-gray-600 hover:text-teal-600"
                  }`}
              >
                Reviews ({selectedProduct?.reviews})
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "description" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Product Description
                </h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {selectedProduct?.description}
                </p>
                <h4 className="font-semibold text-gray-800 mb-3">
                  Key Features:
                </h4>
                <ul className="space-y-2">
                  {selectedProduct?.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="text-teal-600 mt-0.5" size={20} />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "dosage" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Dosage & Usage Instructions
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {selectedProduct?.dosage}
                </p>
              </div>
            )}

            {activeTab === "warnings" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Important Warnings
                </h3>
                <ul className="space-y-3">
                  {selectedProduct?.warnings.map((warning, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 p-3 bg-red-50 rounded-lg"
                    >
                      <span className="text-red-600 font-bold">⚠️</span>
                      <span className="text-gray-700">{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">
                  Customer Reviews
                </h3>
                <div className="space-y-4">
                  {/* Sample Review */}
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                      <span className="font-semibold text-gray-800">
                        John D.
                      </span>
                      <span className="text-gray-500 text-sm">2 weeks ago</span>
                    </div>
                    <p className="text-gray-600">
                      Excellent product! Works quickly and effectively. Highly
                      recommend for pain relief.
                    </p>
                  </div>
                  <div className="border-b pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex">
                        {[...Array(4)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="fill-yellow-400 text-yellow-400"
                          />
                        ))}
                        <Star size={16} className="text-gray-300" />
                      </div>
                      <span className="font-semibold text-gray-800">
                        Sarah M.
                      </span>
                      <span className="text-gray-500 text-sm">1 month ago</span>
                    </div>
                    <p className="text-gray-600">
                      Good quality paracetamol. Fast delivery and well packaged.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
    </div>
  )
}
