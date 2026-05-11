import { NextResponse } from "next/server";

export function middleware(request) {
    const authToken = request.cookies.get("adorzotno_token")?.value?.trim();

    if (!authToken) {
        const homeUrl = new URL("/", request.url);
        homeUrl.searchParams.set("signin", "1");
        homeUrl.searchParams.set("redirect", request.nextUrl.pathname);

        return NextResponse.redirect(homeUrl);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/profile/:path*"],
};
