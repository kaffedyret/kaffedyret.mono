import { withAuth } from "next-auth/middleware";
// eslint-disable-next-line @next/next/no-server-import-in-page
import { NextRequest, NextResponse } from "next/server";
import { verifyUser } from "~/lib/admin/google";
import { userQuery } from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import { User } from "~/models/schema.sanity";

export default withAuth(
  async function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith("/bestilling")) {
      const session_id = req.nextUrl.searchParams.get("session_id");

      if (!session_id) {
        return NextResponse.redirect("/feil");
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: async ({ token }) => {
        if (!token) return false;

        // Verify if session data corresponds with Google data based on accessToken
        const verified = await verifyUser(
          token.accessToken as string | undefined,
          token.email as string | undefined
        );
        if (!verified) {
          return false;
        }

        // Check if user is admin
        const user = await sanityClient.fetch<User>(userQuery, {
          email: token.email,
        });
        if (!user.admin) {
          return false;
        }

        return true;
      },
    },
  }
);

export const config = { matcher: ["/admin", "/api/admin"] };
