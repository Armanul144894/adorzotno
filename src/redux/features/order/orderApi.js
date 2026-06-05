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
  }),
});

export const { useCheckoutOrderMutation } = orderApi;

