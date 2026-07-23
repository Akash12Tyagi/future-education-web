import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";

// Edge-safe re-declaration of NextAuth using only the Edge-compatible config
// (see auth.config.ts) — defense in depth alongside the auth() check already
// performed in admin/(dashboard)/layout.tsx.
const { auth } = NextAuth(authConfig);

export { auth as proxy };

export const config = {
  matcher: ["/admin/:path*"],
};
