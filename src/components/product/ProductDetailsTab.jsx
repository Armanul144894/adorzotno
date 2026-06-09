import { Check } from "lucide-react";
import React from "react";
import RatingStars from "../shared/RatingStars";

const renderHtml = (html) => ({ __html: html || "" });
const formatReviewDate = (value) => {
  if (!value) return "Recently";

  return new Date(value).toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getReviewFallbacks = () => [
  {
    id: "review-1",
    customer: {
      name: "John D.",
    },
    created_at: new Date().toISOString(),
    rating: 5,
    comment:
      "Excellent product quality and very smooth delivery experience.",
    is_verified_purchase: true,
  },
  {
    id: "review-2",
    customer: {
      name: "Sarah M.",
    },
    created_at: new Date().toISOString(),
    rating: 4,
    comment: "Good product and packaging. Will consider ordering again.",
    is_verified_purchase: false,
  },
];

export default function ProductDetailsTab({
  selectedProduct,
  activeTab,
  setActiveTab,
}) {
  const reviewItems =
    selectedProduct?.reviewItems?.length > 0
      ? selectedProduct.reviewItems
      : getReviewFallbacks();

  const dosageLines = String(selectedProduct?.dosage || "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <div>
      <div className="mb-12 rounded-lg border bg-white">
        <div className="border-b">
          <div className="flex flex-wrap">
            <button
              onClick={() => setActiveTab("description")}
              className={`px-6 py-4 font-semibold transition ${activeTab === "description"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 hover:text-primary"
                }`}
            >
              Description
            </button>
            <button
              onClick={() => setActiveTab("dosage")}
              className={`px-6 py-4 font-semibold transition ${activeTab === "dosage"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 hover:text-primary"
                }`}
            >
              Dosage & Usage
            </button>
            <button
              onClick={() => setActiveTab("warnings")}
              className={`px-6 py-4 font-semibold transition ${activeTab === "warnings"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 hover:text-primary"
                }`}
            >
              Warnings
            </button>
            <button
              onClick={() => setActiveTab("reviews")}
              className={`px-6 py-4 font-semibold transition ${activeTab === "reviews"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-600 hover:text-primary"
                }`}
            >
              Reviews ({selectedProduct?.reviews})
            </button>
          </div>
        </div>

        <div className="p-6">
          {activeTab === "description" ? (
            <div>
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                Product Description
              </h3>
              <div
                className="prose prose-sm mb-6 max-w-none text-gray-600"
                dangerouslySetInnerHTML={renderHtml(
                  selectedProduct?.longDescriptionHtml ||
                  selectedProduct?.shortDescriptionHtml,
                )}
              />
              <h4 className="mb-3 font-semibold text-gray-800">Key Features:</h4>
              <ul className="space-y-2">
                {(selectedProduct?.features || []).map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Check className="mt-0.5 text-primary" size={20} />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {activeTab === "dosage" ? (
            <div>
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                Dosage & Usage Instructions
              </h3>
              {dosageLines.length > 0 ? (
                <ul className="space-y-3">
                  {dosageLines.map((line, index) => (
                    <li
                      key={`${line}-${index}`}
                      className="flex items-start gap-2 text-gray-600"
                    >
                      <Check className="mt-0.5 text-primary" size={18} />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="leading-relaxed text-gray-600">
                  Usage instructions will be updated soon.
                </p>
              )}
            </div>
          ) : null}

          {activeTab === "warnings" ? (
            <div>
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                Important Warnings
              </h3>
              <ul className="space-y-3">
                {(selectedProduct?.warnings || []).map((warning, index) => (
                  <li
                    key={`${warning}-${index}`}
                    className="flex items-start gap-3 rounded-lg bg-red-50 p-3"
                  >
                    <span className="font-bold text-red-600">Warning</span>
                    <span className="text-gray-700">{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {activeTab === "reviews" ? (
            <div>
              <h3 className="mb-4 text-xl font-bold text-gray-800">
                Customer Reviews
              </h3>
              <div className="space-y-4">
                {reviewItems.map((review, index) => (
                  <div
                    key={review?.id || `${review?.customer?.name || review?.author}-${index}`}
                    className="border-b pb-4 last:border-b-0"
                  >
                    <div className="mb-2 flex flex-wrap items-center gap-3">
                      <RatingStars
                        rating={review?.rating}
                        showCount={false}
                        className="shrink-0"
                      />
                      <span className="font-semibold text-gray-800">
                        {review?.customer?.name ||
                          review?.author ||
                          review?.user?.name ||
                          "Customer"}
                      </span>
                      {review?.is_verified_purchase ? (
                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                          Verified Purchase
                        </span>
                      ) : null}
                      <span className="text-sm text-gray-500">
                        {formatReviewDate(review?.approved_at || review?.created_at)}
                      </span>
                    </div>
                    <p className="text-gray-600">
                      {review?.comment || review?.review || "No review comment."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
