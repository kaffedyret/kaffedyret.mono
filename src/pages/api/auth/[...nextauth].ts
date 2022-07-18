import NextAuth, { NextAuthOptions } from "next-auth";
import { SanityAdapter } from "next-auth-sanity";
import GoogleProvider from "next-auth/providers/google";
import sanityClient from "~/lib/sanity/sanityClient";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  // @ts-ignore
  adapter: SanityAdapter(sanityClient),
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
  theme: {
    brandColor: "#3b82f6",
    colorScheme: "light",
    logo: "/kaffedyret_icon_rounded.svg",
  },
};

export default NextAuth(authOptions);
