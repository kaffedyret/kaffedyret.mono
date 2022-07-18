import { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { verifyUser } from "~/lib/admin/google";
import { userQuery } from "~/lib/sanity/queries";
import sanityClient from "~/lib/sanity/sanityClient";
import { User } from "~/models/schema.sanity";
import { authOptions } from "../auth/[...nextauth]";

export const middleware = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if we have a login session
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    return new Response("Missing session", { status: 401 });
  }

  // Verify if session data corresponds with Google data based on accessToken
  const verified = await verifyUser(session);
  if (!verified) {
    return new Response("User not verified", { status: 401 });
  }

  // Check if user is admin
  const user = await sanityClient.fetch<User>(userQuery, {
    email: session.user?.email,
  });
  if (!user.admin) {
    return new Response("You do not have administrative rights", { status: 401 });
  }

  return NextResponse.next();
};
