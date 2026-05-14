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
  }),
});

export const { useGetCategoriesQuery } = categoryApi;
