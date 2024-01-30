import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { redirect } from "next/dist/server/api-utils";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: ["/", "/api/webhook"],
    afterAuth(auth, req) {

        // Handle users who aren't authenticated
        if (!auth.userId && !auth.isPublicRoute) {
            return redirectToSignIn({ returnBackUrl: req.url });
        }
        // If the user is logged in and trying to access a public route (landing page)
        if (auth.userId && auth.isPublicRoute) {
            let path = "/select-org";

            // If user had choosen organization
            if (auth.orgId) {
                path = `/organization/${auth.orgId}`;
            }

            const orgSelection = new URL(path, req.url);
            return NextResponse.redirect(orgSelection);
        }


        if(auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org"){
            const orgSelection = new URL('/select-org', req.url)

            return NextResponse.redirect(orgSelection)
        }
    },
});

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
