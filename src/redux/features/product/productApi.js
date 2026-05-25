import baseApi from "../../baseApi";

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ productSlug }) => ({
        url: `/products/${productSlug}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.product || null,
    }),
    getFlashDeals: builder.query({
      query: ({
        page = 1,
        perPage = 20,
        sortBy = "created_at",
        sortOrder = "desc",
      } = {}) => ({
        url: "/products/flash-deals",
        method: "GET",
        params: {
          page,
          per_page: perPage,
          sort_by: sortBy,
          sort_order: sortOrder,
        },
      }),
      transformResponse: (response) => response?.data || {},
    }),
    getFeaturedDeals: builder.query({
      query: ({
        page = 1,
        perPage = 20,
        sortBy = "created_at",
        sortOrder = "desc",
      } = {}) => ({
        url: "/products/featured",
        method: "GET",
        params: {
          page,
          per_page: perPage,
          sort_by: sortBy,
          sort_order: sortOrder,
        },
      }),
      transformResponse: (response) => response?.data || {},
    }),
    searchProducts: builder.query({
      query: ({
        query,
        page = 1,
        perPage = 20,
      } = {}) => ({
        url: "/products/search",
        method: "GET",
        params: {
          page,
          per_page: perPage,
          q: query,
        },
      }),
      transformResponse: (response) => response?.data || {},
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetFlashDealsQuery,
  useGetFeaturedDealsQuery,
  useSearchProductsQuery,
} = productApi;
