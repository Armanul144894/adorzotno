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
  }),
});

export const { useGetBrandsQuery } = brandApi;
