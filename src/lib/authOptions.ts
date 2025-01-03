// src/app/api/auth/[...nextauth]/route.ts

import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "../lib/mongoose";
import { User } from "../lib/models/user";
import crypto from "crypto";

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}


declare module "next-auth" {
  interface Session {
    user: {
      id: string;  
      email: string;  
    };
  }

  interface JWT {
    id: string;  
    email: string;  
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials || {};

        if (!email || !password) {
          throw new Error("Please enter both email and password.");
        }

        await connectToDatabase();

        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("No user found with this email.");
        }

        const hashedPassword = hashPassword(password);
        if (user.password !== hashedPassword) {
          throw new Error("Invalid password.");
        }


        return { id: user._id.toString(), email: user.email };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
      };
      return session;
    },
  },
  pages: {
    signIn: "/login", 
  },
  secret: process.env.NEXTAUTH_SECRET, 
};

export default authOptions;
