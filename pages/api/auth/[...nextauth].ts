import CredentialsProvider from "next-auth/providers/credentials"
// import mongoose from "mongoose";
import { AuthOptions } from "next-auth";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
// import User from "@/models/user";
import bcrypt from "bcrypt"
import prisma from "@/lib/prisma";

export const authConfig: AuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,

    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),

        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                },
                password: {
                    label: "password",
                    type: "password",
                }
            },

            async authorize(credentials) {
                if (!credentials || !credentials.email || !credentials.password) {
                    throw new Error("Invalid email or password");
                }

                // mongoose.connect(process.env.MONGO_URL as string);
                // const dbUser = await User.findOne({email: credentials.email})

                const dbUser = await prisma.user.findUnique({
                    where: { email: credentials.email }
                })

                if (!dbUser || !dbUser?.hashedPassword) {
                    throw new Error("Invalid email or password");
                  }
    
                  const isCorrectPassword = await bcrypt.compare(
                    credentials.password,
                    dbUser.hashedPassword
                  );
          
                  if (!isCorrectPassword) {
                    throw new Error("Invalid email or password");
                  }

                return dbUser;

            },
        }),
    ],

    pages: {
        signIn: "/",
    },
    debug: process.env.NODE_ENV === "development",

    session: {
        strategy: "jwt",
    },
    
}

export default NextAuth(authConfig);