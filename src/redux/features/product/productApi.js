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
  }),
});

export const { useGetProductQuery } = productApi;
