import baseApi from "../../baseApi";

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: "/categories",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.categories || [],
    }),
    getCategoryProducts: builder.query({
      query: ({ categoryId, page = 1, perPage = 20 }) => ({
        url: `/categories/${categoryId}/products`,
        method: "GET",
        params: {
          page,
          per_page: perPage,
        },
      }),
      transformResponse: (response) => response?.data || {},
    }),
  }),
});

export const { useGetCategoriesQuery, useGetCategoryProductsQuery } = categoryApi;
