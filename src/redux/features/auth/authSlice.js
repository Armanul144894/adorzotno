import { createSlice } from "@reduxjs/toolkit";

const AUTH_STORAGE_KEY = "adorzotno_auth";
const AUTH_COOKIE_KEY = "adorzotno_token";

export const getStoredAuth = () => {
    if (typeof window === "undefined") {
        return {
            token: null,
            user: null,
        };
    }

    try {
        const storedValue = window.localStorage.getItem(AUTH_STORAGE_KEY);
        if (!storedValue) {
            return {
                token: null,
                user: null,
            };
        }

        const parsedValue = JSON.parse(storedValue);

        return {
            token: parsedValue?.token || null,
            user: parsedValue?.user || null,
        };
    } catch {
        return {
            token: null,
            user: null,
        };
    }
};

const persistAuth = (authState) => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authState));

    if (authState?.token) {
        document.cookie = `${AUTH_COOKIE_KEY}=${encodeURIComponent(authState.token)}; path=/; max-age=${60 * 60 * 24 * 7}; samesite=lax`;
    }
};

const clearStoredAuth = () => {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    document.cookie = `${AUTH_COOKIE_KEY}=; path=/; max-age=0; samesite=lax`;
};

const initialState = {
    token: null,
    user: null,
    isAuthenticated: false,
    isHydrated: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        hydrateAuth: (state, action) => {
            state.token = action.payload?.token || null;
            state.user = action.payload?.user || null;
            state.isAuthenticated = Boolean(action.payload?.token);
            state.isHydrated = true;
        },
        setCredentials: (state, action) => {
            state.token = action.payload?.token || null;
            state.user = action.payload?.user || null;
            state.isAuthenticated = Boolean(action.payload?.token);
            state.isHydrated = true;

            persistAuth({
                token: state.token,
                user: state.user,
            });
        },
        clearAuth: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
            state.isHydrated = true;

            clearStoredAuth();
        },
    },
});

export const { hydrateAuth, setCredentials, clearAuth } = authSlice.actions;
export default authSlice.reducer;
