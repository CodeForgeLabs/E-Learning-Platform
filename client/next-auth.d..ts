// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    token?: string;
  }

  interface User {
    token?: string;
  }
}
