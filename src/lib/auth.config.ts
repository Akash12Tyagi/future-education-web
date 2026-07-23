import type { NextAuthConfig } from "next-auth";

// Edge-safe subset of the NextAuth config (no Credentials provider / Prisma /
// bcrypt here) so this can be imported directly by middleware.ts. The full
// config with providers lives in auth.ts and extends this.
export const authConfig = {
  pages: { signIn: "/admin/login" },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isAdminRoute =
        request.nextUrl.pathname.startsWith("/admin") && !request.nextUrl.pathname.startsWith("/admin/login");
      return isAdminRoute ? isLoggedIn : true;
    },
  },
} satisfies NextAuthConfig;
