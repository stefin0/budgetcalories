import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import prisma from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const BASE_PATH = "/api/auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/logo.png"
  },
  adapter: PrismaAdapter(prisma),
  callbacks: {
    async session({session, user}) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    }
  },
  providers: [Google],
  basePath: BASE_PATH,
  secret: process.env.AUTH_SECRET,
});
