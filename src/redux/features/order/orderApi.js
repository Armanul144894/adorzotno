import baseApi from "@/redux/baseApi";

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    checkoutOrder: builder.mutation({
      query: (payload) => ({
        url: "/orders/checkout",
        method: "POST",
        body: payload,
      }),
    }),
    getOrders: builder.query({
      query: ({ page = 1, perPage = 10 } = {}) => ({
        url: "/orders",
        method: "GET",
        params: {
          page,
          per_page: perPage,
        },
      }),
      transformResponse: (response) => response?.data || null,
    }),
    getOrderDetails: builder.query({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "GET",
      }),
      transformResponse: (response) => response?.data?.order || null,
    }),
  }),
});

export const {
  useCheckoutOrderMutation,
  useGetOrdersQuery,
  useGetOrderDetailsQuery,
} = orderApi;
