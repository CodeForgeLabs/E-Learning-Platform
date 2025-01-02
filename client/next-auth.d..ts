import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    token?: string;
    username?: string;
    profilePicture?: string;
    questions_asked?: number;
    reputation?: number;
    shared_ideas?: number;
    expires: string;
  }

  interface User {
    token?: string;
  }
}