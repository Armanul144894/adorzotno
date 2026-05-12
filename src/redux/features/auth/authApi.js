import baseApi from "../../baseApi";
import { clearAuth, setCredentials } from "./authSlice";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation({
            query: (payload) => ({
                url: "/auth/register",
                method: "POST",
                body: payload,
            }),
        }),
        login: builder.mutation({
            query: (payload) => ({
                url: "/auth/login",
                method: "POST",
                body: payload,
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const user = data?.data?.user || null;
                    const token = data?.data?.token || null;

                    if (token) {
                        dispatch(
                            setCredentials({
                                user,
                                token,
                            }),
                        );

                        dispatch(authApi.endpoints.getMe.initiate(undefined, { forceRefetch: true }));
                    }
                } catch {
                    // Errors are handled in the consuming UI.
                }
            },
        }),
        getMe: builder.query({
            query: () => ({
                url: "/auth/me",
                method: "GET",
            }),
            async onQueryStarted(_, { dispatch, getState, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    const currentToken = getState()?.auth?.token || null;

                    if (currentToken && data?.data?.user) {
                        dispatch(
                            setCredentials({
                                user: data.data.user,
                                token: currentToken,
                            }),
                        );
                    }
                } catch {
                    dispatch(clearAuth());
                }
            },
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(_, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    dispatch(clearAuth());
                } catch {
                    // Errors are handled in the consuming UI.
                }
            },
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useGetMeQuery,
    useLazyGetMeQuery,
    useLogoutMutation,
} = authApi;
