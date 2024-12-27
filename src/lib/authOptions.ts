import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs"; 
import Admin from "@/DataSchema/UserSchema"; 
import connectToDb from "../lib/db";

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
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
   
        await connectToDb();


        const user = await Admin.findOne({ email: credentials?.email });
        console.log(credentials?.email)
        console.log(credentials?.password)


        if (user && credentials?.password) {
          
          const isValid = await bcrypt.compare(credentials.password, user.password);


          if (isValid) {
            return { id: user._id, email: user.email };  
          }
        }

        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", 
  },
  pages: {
    signIn: "/auth/signin", 
  },
};

export default authOptions;
