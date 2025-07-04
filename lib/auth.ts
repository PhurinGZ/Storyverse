import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { clientPromise } from "./mongodb"; // <<< ใหม่ ใช้ mongodb.ts
import { connectToDatabase } from "./db";
import User from "@/models/User";
import { compare } from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase();

        const user = await User.findOne({ email: credentials?.email });
        if (!user) throw new Error("ไม่พบผู้ใช้งาน");

        const isPasswordCorrect = await compare(
          credentials!.password,
          user.password
        );
        if (!isPasswordCorrect) throw new Error("รหัสผ่านไม่ถูกต้อง");

        return { id: user._id, email: user.email, name: user.username };
      },
    }),
  ],
  adapter: MongoDBAdapter(clientPromise), // <<< แก้ตรงนี้
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
};
