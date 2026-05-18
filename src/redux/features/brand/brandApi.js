import baseApi from "../../baseApi";

export const brandApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: "/brands",
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.brands || [],
    }),
    getBrandProducts: builder.query({
      query: ({ brandId, page = 1, perPage = 20 }) => ({
        url: `/brands/${brandId}/products`,
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

export const { useGetBrandsQuery, useGetBrandProductsQuery } = brandApi;
