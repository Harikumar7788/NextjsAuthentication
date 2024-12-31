import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectToDatabase } from "./mongoose";
import { User } from "../models/User";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();
        const user = await User.findOne({ email: credentials?.email });
        if (user && bcrypt.compareSync(credentials!.password, user.password)) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      await connectToDatabase();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create(user);
      }
      return true;
    },
    async session({ session }) {
      const dbUser = await User.findOne({ email: session.user?.email });
      session.user.role = dbUser?.role;
      return session;
    },
  },
};
