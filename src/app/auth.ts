// app/auth.ts
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import type { NextAuthConfig } from "next-auth";

// Extend the session interface
declare module "next-auth" {
  interface Session {
    user: {
      id?: string; // GitHub numeric user ID
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

export const config = {
  providers: [
    GitHub({
      clientId: process.env.GITHUB_APP_CLIENT_ID!,
      clientSecret: process.env.GITHUB_APP_CLIENT_ACCESS_TOKEN!,
    }),
  ],
  callbacks: {
    async jwt({ token, user, profile }) {
      // Save the GitHub numeric ID from the profile to the token
      if (profile && profile.id) {
        token.githubId = profile.id; // Store GitHub numeric ID explicitly
      }
      if (user) {
        token.user = user;
      }
      console.log("JWT Token:", token);
      return token;
    },
    async session({ session, token }) {
      // Attach the GitHub numeric ID to the session user object
      session.user = {
        ...session.user,
        id: token.githubId as string, // Explicitly pass the GitHub ID
      };
      console.log("Session Object:", session);
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      }

      return true;
    },
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
} satisfies NextAuthConfig;

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);

// Client-side auth function wrappers
import { signOut as signOutClient } from "next-auth/react";

export const handleSignOut = () => {
  return signOutClient({
    callbackUrl: "/",
    redirect: true,
  });
};
