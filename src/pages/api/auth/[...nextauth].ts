import NextAuth, { NextAuthOptions } from "next-auth";
import { SanityAdapter, SanityCredentials } from "next-auth-sanity";
import GitHub from "next-auth/providers/github";
import sanityClient from "~/lib/sanity/sanityClient";

const options: NextAuthOptions = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
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

export default NextAuth(options);
