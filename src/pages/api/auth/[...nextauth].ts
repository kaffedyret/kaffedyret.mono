import NextAuth, { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import sanityClient from "~/lib/sanity/sanityClient";

export const authOptions: NextAuthOptions = {
  providers: [
    // @ts-ignore
    SanityCredentials(sanityClient),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET || "AUTH_SECRET",
  // @ts-ignore
  adapter: SanityAdapter(sanityClient),
};

export default NextAuth(authOptions);
